import * as _ from 'lodash';
import {Cell} from './cell';
import {Constraint} from './constraint';
import {ConstraintType} from './constraint-type';
import {SumUnit} from './sum-unit';
import {Util} from './util';
import {GlobalOptions} from './sudoku-options';

export class Sudoku {
  public cells: Cell[] = [];
  public units: Cell[][] = [];
  public sumUnits: SumUnit[] = [];
  // TODO add product units here
  public cellsPerSumUnit: { [key: number]: number } = {};

  public constructor(cells: string[], constraints: Constraint[] = [], globalOptions: GlobalOptions = {useBlockUnits: true}) {
    // Prepare odd/even cells
    let cellMap = [];
    constraints
      .filter(c => c.type === ConstraintType.SINGLE_CELL_ODD_EVEN)
      .forEach(c => {
        c.cellIds.forEach(cellId => cellMap[cellId] = c.isEven);
      });
    for (let i of _.range(81)) {
      this.cells.push(new Cell(i, cells[i], cellMap[i]));
    }

    // Build peers list
    for (let i = 0; i < 81; i++) {
      const cell = this.cells[i];

      // row
      let idx = i - i % 9;
      let row = [];
      for (let j = 0; j < 9; j++) {
        if (i !== idx + j) {
          row.push(this.cells[idx + j]);
        }
      }

      // column
      let baseIdx = i % 9;
      let col = [];
      for (let j of _.range(9)) {
        idx = j * 9 + baseIdx;
        if (idx !== i) {
          col.push(this.cells[idx]);
        }
      }

      // 3x3 block
      let block = [];
      if (globalOptions.useBlockUnits) {
        for (let j of this.getBlockIds(i)) {
          if (j !== i) {
            block.push(this.cells[j]);
          }
        }
      }

      // Set peers on cell
      cell.peers = _.union(row, col, block);
    }

    // Build units
    for (let idx of _.range(9)) {
      let unit = [];
      for (let i of _.range(9)) {
        unit.push(this.cells[idx * 9 + i]);
      }
      this.units.push(unit);
    }

    for (let rIdx of _.range(9)) {
      let unit = [];
      for (let cIdx of _.range(9)) {
        unit.push(this.cells[rIdx + cIdx * 9]);
      }
      this.units.push(unit);
    }

    if (globalOptions.useBlockUnits) {
      for (let i of [0, 3, 6, 27, 30, 33, 54, 57, 60]) {
        let block = [];
        for (let idx of this.getBlockIds(i)) {
          block.push(this.cells[idx]);
        }
        this.units.push(block);
      }
    }

    // Add units from constraints
    let unitConstraints = constraints.filter(c => c.type === ConstraintType.MULTI_CELL_UNIT);
    for (let constraint of unitConstraints) {
      let unit = [];
      for (let idx of constraint.cellIds) {
        unit.push(this.cells[idx]);
      }
      console.log('Adding unit: ' + unit);
      this.units.push(unit);
    }

    // Add sum units from constraints
    let sumConstraints = constraints.filter(c => c.type === ConstraintType.MULTI_CELL_SUM);
    if (sumConstraints.length > 0) {
      for (let sumConstraint of sumConstraints) {
        let sumCells: Cell[] = sumConstraint.cellIds.map(c => this.cells[c]);
        this.sumUnits.push(new SumUnit(sumCells, sumConstraint.sum, sumConstraint.noDuplicates));

        for (let cell of sumCells) {
          this.cellsPerSumUnit[cell.cellId] = sumCells.length;
        }
      }
    }
  }

  public serialize(): string[] {
    const l = [];
    for (let cell of this.cells) {
      l.push(cell.candidates);
    }
    return l;
  }

  public getTotalCandidates(): number {
    return _.sum(this.cells.map(c => c.candidates.length));
  }

  /**
   * Sets the state from a list of candidates.
   * Expects the
   */
  public setState(candidateList: string[]): void {
    for (let i = 0; i < 81; i++) {
      this.cells[i].candidates = candidateList[i];
    }
  }

  public getBlockIds(idx: number): number[] {
    const blockIdx = [];
    const blockY = (idx % 9) - idx % 3;
    const lineStart = _.toInteger((idx - idx % 9) / 9);
    const blockX = lineStart - lineStart % 3;
    for (let x of _.range(3)) {
      for (let y of _.range(3)) {
        let idx = (blockX + x) * 9 + blockY + y;
        blockIdx.push(idx);
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
    for (let cell of this.cells) {
      s += cell.toString();
    }
    return Util.replaceAll(s, ' ', '.');
  }

  /**
   * Check whether the Sudoku is solved.
   */
  public isSolved(): boolean {
    // Check cells
    for (let cell of this.cells) {
      if (!cell.isSolved()) {
        // console.log('isSolved(): Cell not solved');
        return false;
      }
    }

    // Check units
    for (let unit of this.units) {
      let values = _.map(unit, 'candidates').join('');
      if (values.length !== 9) {
        // console.log('isSolved(): Not yet all cells filled in', unit);
        return false;
      }
      for (let v of '123456789') {
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
    for (let unit of this.units) {
      let allCandidates = _.map(unit, 'candidates').join('');
      for (let v of '123456789') {
        if (!allCandidates.includes(v)) {
          return false;
        }
      }
    }

    // Check if units contain numbers only once
    for (let unit of this.units) {
      let allValues = unit.map(c => c.candidates)
        .filter(candidates => candidates.length === 1)
        .join('');
      for (let v of '123456789') {
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
      for (let unit of this.units) {
        let allCandidates = _.map(unit, 'candidates').join('');
        for (let v of '123456789') {
          if (Util.count(allCandidates, v) === 1) {
            let cell = unit.find(c => c.candidates.includes(v));
            if (cell.candidates.length > 1) {
              // Found a cell which can only hold value
              cell.candidates = v;
              break;
            }
          }
        }
      }

      // Propagate (3): Sum units
      this.sumUnits.forEach(sumUnit => sumUnit.propagate());
    }
  }
}
