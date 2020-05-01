import * as _ from 'lodash';

import {Cell} from "./cell";
import {Util} from "../main/util";

export class Sudoku {
  public cells: Cell[] = [];
  public units: Cell[][] = [];
  public sumUnits: [Cell[], number][] = [];

  public constructor(cells: string[]) {
    for (let i of _.range(81)) {
      // console.log('Adding cell i:', i);
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
    // this.units = [];
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

    // TODO build sum units
    /*
    if (sumUnits.length > 0) {
      for (let sumUnit of sumUnits)  {
    // Link cells
    let sumIds = sum_unit[0];
    let totalSum = sum_unit[1];
    let cells = [];
    for (let idx of sumIds) {
      cells.push(this.cells[idx]);
    {
    this.sumUnits.push([cells, total_sum])
    }
    */
  }

  public serialize(): string[] {
    const l = [];
    for (let cell of this.cells) {
      l.push(cell.candidates);
    }
    return l;
  }

  public getTotalCandidates(): number {
    // console.log('getTotalCandidates(): Cells:', this.cells);
    return _.sum(this.cells.map(c => c.candidates.length));
  }

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

    // TODO sum units
    /*
      // Check sums
      for (let sumUnit of this.sumUnits) {
          // Check if all cells are filled
          let cells = sumUnit[0];
          let total_sum = sumUnit[1]
          if not all([len(c.candidates) == 1 for c of cells]):
              return False
          // Check if sum adds up
          if sum([int(c.candidates) for c of cells]) != total_sum:
              return False
       }
     */

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
    /*
    for sum_unit of this.sum_units:
        // Check if all cells are filled, the sum adds up
        cells, total_sum = sum_unit
        if all([len(c.candidates) == 1 for c of cells]):
            if sum([int(c.candidates) for c of cells]) != total_sum:
                return False
        // Check if sum can still be fulfilled
        current_sum = sum([int(c.candidates) for c of cells if len(c.candidates) == 1])
        missing_sum = total_sum - current_sum
        unfilled_cells = len([c for c of cells if len(c.candidates) > 1])
        if missing_sum < unfilled_cells or missing_sum > 9 * unfilled_cells:
            return False
*/
    return true;
  }

  /**
   * Propagate constraints: Standard + sums
   */
  public propagate(): void {
    let totalCandidates = 81 * 9;

    while (this.isValid() && this.getTotalCandidates() < totalCandidates) {
      // console.log('Propagating with totalCandidates:', totalCandidates);
      totalCandidates = this.getTotalCandidates();

      // Propagate (1)
      for (let cell of this.cells) {
        cell.propagateToPeers();
      }
      // console.log('...after cell propagation::', this.getTotalCandidates());


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

      // TODO Propagate sums
      /*
            for sum_unit of this.sum_units:
                cells, total_sum = sum_unit
                unfilled_cells = [c for c of cells if len(c.candidates) > 1]
                if len(unfilled_cells) == 1:
                    cell = unfilled_cells[0]
                    value = total_sum - sum([int(c.candidates) for c of cells if len(c.candidates) == 1])
                    if 1 <= value <= 9:
                        cell.candidates = str(value)
             }
       */
    }
  }
}
