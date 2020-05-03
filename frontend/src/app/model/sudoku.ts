import * as _ from 'lodash';

import {Cell} from "./cell";
import {Util} from "../main/util";
import {Constraint} from "./constraint";
import {ConstraintType} from "./constraint-type";

export class Sudoku {
  public cells: Cell[] = [];
  public units: Cell[][] = [];
  public sumUnits: [Cell[], number][] = [];
  public cellsPerSumUnit: { [key: number]: number } = {};

  public constructor(cells: string[], constraints?: Constraint[]) {
    for (let i of _.range(81)) {
      this.cells.push(new Cell(i, cells[i]));
    }

    // Build peers list
    for (let i = 0; i < 81; i++) {
      const cell = this.cells[i];

      // row
      let idx = i - i % 9
      let row = [];
      for (let j = 0; j < 9; j++) {
        if (i !== idx + j) {
          row.push(this.cells[idx + j])
        }
      }

      // column
      let baseIdx = i % 9
      let col = []
      for (let j of _.range(9)) {
        idx = j * 9 + baseIdx
        if (idx !== i) {
          col.push(this.cells[idx])
        }
      }

      // 3x3 block
      let block = [];
      for (let j of this.getBlockIds(i)) {
        if (j !== i) {
          block.push(this.cells[j]);
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

    for (let i of [0, 3, 6, 27, 30, 33, 54, 57, 60]) {
      let block = [];
      for (let idx of this.getBlockIds(i)) {
        block.push(this.cells[idx]);
      }
      this.units.push(block)
    }

    // TODO Add units from constraints
    // let unitConstraints = constraints.filter(c => c.type === ConstraintType.MULTI_CELL_UNIT);

    // Add sum units from constraints
    let sumConstraints = constraints?.filter(c => c.type === ConstraintType.MULTI_CELL_SUM);
    if (sumConstraints?.length > 0) {
      console.log('Sudoku got', sumConstraints.length, 'sum constraints:', sumConstraints);
      for (let sumConstraint of sumConstraints) {
        let sumCells: Cell[] = sumConstraint.cellIds.map(c => this.cells[c]);
        this.sumUnits.push([sumCells, sumConstraint.sum])

        for (let cell of sumCells) {
          // TODO consider case where a cell is in multiple sum units
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
    const blockY = (idx % 9) - idx % 3
    const lineStart = _.toInteger((idx - idx % 9) / 9);
    const blockX = lineStart - lineStart % 3
    for (let x of _.range(3)) {
      for (let y of _.range(3)) {
        let idx = (blockX + x) * 9 + blockY + y
        blockIdx.push(idx)
      }
    }
    return blockIdx;
  }

  public toString(): string {
    let s = '';
    for (let cell of this.cells) {
      s += cell.toString();
    }
    return s.replace(' ', '.');
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
    for (let sumUnit of this.sumUnits) {
      let cells = sumUnit[0];
      let totalSum = sumUnit[1];
      if (_.sum(cells.map(c => +c.candidates)) !== totalSum) {
        return false;
      }
    }

    return true;
  }

  /**
   * Checks if Sudoku still solvable.
   */
  public isValid(): boolean {
    for (let cell of this.cells) {
      if (!cell.isValid()) {
        // console.log('isValid(): Cell', cell.cellId, 'not valid:', cell.toString());
        return false;
      }
    }

    // Check if units can still contain all numbers
    for (let unit of this.units) {
      let allCandidates = _.map(unit, 'candidates').join('');
      for (let v of '123456789') {
        if (!allCandidates.includes(v)) {
          // console.log('isValid(): Unit', unit, 'candidates do not contain vale:', v);
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

    // Check if sums add up
    for (let sumUnit of this.sumUnits) {
      // Check if the sum adds up if all cells are filled
      let cells = sumUnit[0];
      let totalSum = sumUnit[1];
      let allCandidates = cells.map(c => c.candidates).join('');
      if (allCandidates.length === 9) {
        let unitSum = 0;
        for (let c of allCandidates) {
          unitSum += +c;
        }
        if (unitSum !== totalSum) {
          return false;
        }
      }

      // Check if sum can still be fulfilled
      let currentSum = _.sum(cells.filter(c => c.candidates.length === 1).map(c => +c.candidates));
      let missingSum = totalSum - currentSum
      let unfilledCells = cells.filter(c => c.candidates.length > 1).length;
      if (missingSum < unfilledCells || missingSum > 9 * unfilledCells) {
        return false;
      }
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
      for (let cell of this.cells) {
        cell.propagateToPeers();
      }

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

      // Propagate sums
      for (let sumUnit of this.sumUnits) {
        let cells = sumUnit[0];
        let totalSum = sumUnit[1];
        let unfilledCells = cells.filter(c => c.candidates.length > 1);
        if (unfilledCells.length === 1) {
          let cell = unfilledCells[0];
          let value = totalSum - _.sum(cells
            .filter(c => c.candidates.length === 1)
            .map(c => +c.candidates));
          if (1 <= value || value <= 9) {
            cell.candidates = value.toString();
          }
        }
      }
    }
  }
}
