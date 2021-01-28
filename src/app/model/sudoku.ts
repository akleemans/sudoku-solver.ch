import * as _ from 'lodash';
import {Cell} from './cell';
import {Constraint} from './constraint';
import {ConstraintType} from './constraint-type';
import {SumUnit} from './sum-unit';
import {Util} from './util';
import {GlobalOptions} from './sudoku-options';
import {ProductUnit} from './product-unit';
import {CellConnection} from './cell-connection';

export class Sudoku {
  public cells: Cell[] = [];
  public units: Cell[][] = [];
  public sumUnits: SumUnit[] = [];
  public productUnits: ProductUnit[] = [];

  public constructor(cells: string[], constraints: Constraint[] = [], globalOptions: GlobalOptions = {useBlockUnits: true}) {
    // Prepare odd/even cells
    const oddEvenCellMap = [];
    constraints
      .filter(c => c.type === ConstraintType.SINGLE_CELL_ODD_EVEN)
      .forEach(c => {
        c.cellIds.forEach(cellId => oddEvenCellMap[cellId] = c.isEven);
      });
    for (const i of _.range(81)) {
      this.cells.push(new Cell(i, cells[i], oddEvenCellMap[i]));
    }

    // Build peers list
    for (let i = 0; i < 81; i++) {
      const cell = this.cells[i];

      // row
      let idx = i - i % 9;
      const row = [];
      for (let j = 0; j < 9; j++) {
        if (i !== idx + j) {
          row.push(this.cells[idx + j]);
        }
      }

      // column
      const baseIdx = i % 9;
      const col = [];
      for (const j of _.range(9)) {
        idx = j * 9 + baseIdx;
        if (idx !== i) {
          col.push(this.cells[idx]);
        }
      }

      // 3x3 block
      const block = [];
      if (globalOptions.useBlockUnits) {
        for (const j of this.getBlockIds(i)) {
          if (j !== i) {
            block.push(this.cells[j]);
          }
        }
      }

      // Set peers on cell
      cell.peers = _.union(row, col, block);
    }

    // Build units
    for (const idx of _.range(9)) {
      const unit = [];
      for (const i of _.range(9)) {
        unit.push(this.cells[idx * 9 + i]);
      }
      this.units.push(unit);
    }

    for (const rIdx of _.range(9)) {
      const unit = [];
      for (const cIdx of _.range(9)) {
        unit.push(this.cells[rIdx + cIdx * 9]);
      }
      this.units.push(unit);
    }

    if (globalOptions.useBlockUnits) {
      for (const i of [0, 3, 6, 27, 30, 33, 54, 57, 60]) {
        const block = [];
        for (const idx of this.getBlockIds(i)) {
          block.push(this.cells[idx]);
        }
        this.units.push(block);
      }
    }

    // Add units from constraints
    const unitConstraints = constraints.filter(c => c.type === ConstraintType.MULTI_CELL_UNIT);
    for (const constraint of unitConstraints) {
      const unit = [];
      for (const idx of constraint.cellIds) {
        unit.push(this.cells[idx]);
      }
      console.log('Adding unit: ' + unit);
      this.units.push(unit);
    }

    // Add sum units from constraints
    const sumConstraints = constraints.filter(c => c.type === ConstraintType.MULTI_CELL_SUM);
    for (const sumConstraint of sumConstraints) {
      const sumCells: Cell[] = sumConstraint.cellIds.map(c => this.cells[c]);
      this.sumUnits.push(new SumUnit(sumCells, sumConstraint.sum, sumConstraint.noDuplicates));
    }


    // Add product units from constraints
    const productConstraints = constraints.filter(c => c.type === ConstraintType.MULTI_CELL_PRODUCT);
    for (const productConstraint of productConstraints) {
      const productCells: Cell[] = productConstraint.cellIds.map(c => this.cells[c]);
      this.productUnits.push(new ProductUnit(productCells, productConstraint.product));
    }

    // Add difference constraints to cell
    const differenceConstraints = constraints.filter(c => c.type === ConstraintType.TWO_CELLS_EXACT_DIFFERENCE);
    for (const differenceConstraint of differenceConstraints) {
      const cellA = this.cells[differenceConstraint.cellIds[0]];
      const cellB = this.cells[differenceConstraint.cellIds[1]];
      cellA.addCellConnection(CellConnection.difference(cellB, differenceConstraint.difference, differenceConstraint.unknownOrder));
      cellB.addCellConnection(CellConnection.difference(cellA, -differenceConstraint.difference, differenceConstraint.unknownOrder));
    }

    // Add factor constraints to cell
    const factorConstraints = constraints.filter(c => c.type === ConstraintType.TWO_CELLS_EXACT_FACTOR);
    for (const factorConstraint of factorConstraints) {
      const cellA = this.cells[factorConstraint.cellIds[0]];
      const cellB = this.cells[factorConstraint.cellIds[1]];
      cellA.addCellConnection(CellConnection.factor(cellB, factorConstraint.factor, factorConstraint.unknownOrder));
      cellB.addCellConnection(CellConnection.factor(cellA, 1 / factorConstraint.factor, factorConstraint.unknownOrder));
    }

    // Add bigger/smaller constraints to cell
    const biggerSmallerConstraints = constraints.filter(c => c.type === ConstraintType.TWO_CELLS_BIGGER_THAN);
    for (const biggerSmallerConstraint of biggerSmallerConstraints) {
      const cellA = this.cells[biggerSmallerConstraint.cellIds[0]];
      const cellB = this.cells[biggerSmallerConstraint.cellIds[1]];
      cellA.addCellConnection(CellConnection.biggerSmaller(cellB, true));
      cellB.addCellConnection(CellConnection.biggerSmaller(cellA, false));
    }
  }

  public serialize(): string[] {
    const l = [];
    for (const cell of this.cells) {
      l.push(cell.getCandidates());
    }
    return l;
  }

  public getTotalCandidates(): number {
    return _.sum(this.cells.map(c => c.getCandidates().length));
  }

  /**
   * Sets the state from a list of candidates.
   */
  public setState(candidateList: string[]): void {
    for (let i = 0; i < 81; i++) {
      this.cells[i].setCandidates(candidateList[i]);
    }
  }

  public getBlockIds(idx: number): number[] {
    const blockIdx = [];
    const blockY = (idx % 9) - idx % 3;
    const lineStart = _.toInteger((idx - idx % 9) / 9);
    const blockX = lineStart - lineStart % 3;
    for (const x of _.range(3)) {
      for (const y of _.range(3)) {
        const blockId = (blockX + x) * 9 + blockY + y;
        blockIdx.push(blockId);
      }
    }
    return blockIdx;
  }

  /**
   * Returns the Sudoku as a "standard" string representation, eg.
   * 1..2.45..7.8.. etc.
   */
  public toString(): string {
    let s = '';
    for (const cell of this.cells) {
      s += cell.toString();
    }
    return Util.replaceAll(s, ' ', '.');
  }

  /**
   * Check whether the Sudoku is solved.
   */
  public isSolved(): boolean {
    // Check cells
    for (const cell of this.cells) {
      if (!cell.isSolved()) {
        // console.log('isSolved(): Cell not solved');
        return false;
      }
    }

    // Check units
    for (const unit of this.units) {
      const values = _.map(unit, 'candidates').join('');
      if (values.length !== 9) {
        // console.log('isSolved(): Not yet all cells filled in', unit);
        return false;
      }
      for (const v of '123456789') {
        if (!values.includes(v)) {
          // console.log('isSolved(): Not yet all numbers in', unit);
          return false;
        }
      }
    }

    // Check sum units
    if (!_.every(this.sumUnits, sumUnit => sumUnit.isSolved())) {
      return false;
    }

    // Check product units
    if (!_.every(this.productUnits, productUnit => productUnit.isSolved())) {
      return false;
    }

    return true;
  }

  /**
   * Checks if Sudoku still solvable.
   */
  public isValid(): boolean {
    // Check that all cells are still valid
    if (!_.every(this.cells.map(c => c.isValid()))) {
      return false;
    }

    // Check if units can still contain all numbers
    for (const unit of this.units) {
      const allCandidates = _.map(unit, 'candidates').join('');
      for (const v of '123456789') {
        if (!allCandidates.includes(v)) {
          return false;
        }
      }
    }

    // Check if units contain numbers only once
    for (const unit of this.units) {
      const allValues = unit.map(c => c.getCandidates())
        .filter(candidates => candidates.length === 1)
        .join('');
      for (const v of '123456789') {
        if (Util.count(allValues, v.toString()) > 1) {
          // console.log('isValid(): Unit', unit, 'does contain value twice:', v);
          return false;
        }
      }
    }

    // Check that all sum units are still valid
    if (!_.every(this.sumUnits.map(sumUnit => sumUnit.isValid()))) {
      return false;
    }

    // Check that all product units are still valid
    if (!_.every(this.productUnits.map(productUnit => productUnit.isValid()))) {
      return false;
    }

    return true;
  }

  /**
   * Propagate constraints: Standard + sums
   */
  public propagate(): void {
    let totalCandidates = 81 * 9;

    while (this.isValid() && this.getTotalCandidates() < totalCandidates) {
      totalCandidates = this.getTotalCandidates();

      // Propagate (1)
      this.cells.forEach(cell => cell.propagateToPeers());

      // Propagate (2)
      for (const unit of this.units) {
        const allCandidates = _.map(unit, 'candidates').join('');
        for (const v of '123456789') {
          if (Util.count(allCandidates, v) === 1) {
            const cell = unit.find(c => c.getCandidates().includes(v));
            if (cell.getCandidates().length > 1) {
              // Found a cell which can only hold value
              cell.removeAllExcept(v);
              break;
            }
          }
        }
      }

      // Propagate (3): Sum units
      this.sumUnits.forEach(sumUnit => sumUnit.propagate());

      // Propagate (4): Product units
      this.productUnits.forEach(productUnit => productUnit.propagate());
    }
  }
}
