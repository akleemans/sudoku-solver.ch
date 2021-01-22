import {Cell} from './cell';
import {Util} from './util';

export class SumUnit {
  public constructor(
    public cells: Cell[],
    public totalSum: number,
    public noDuplicates: boolean) {
    console.log('Creating sum unit with noDuplicates:', noDuplicates);
  }

  public isSolved(): boolean {
    if (!Util.allFilled(this.cells)) {
      return false;
    } else if (Util.getValueSum(this.cells) !== this.totalSum) {
      return false;
    } else if (this.noDuplicates && Util.containsDuplicates(this.cells)) {
      return false;
    }
    return true;
  }

  public isValid(): boolean {
    if (Util.allFilled(this.cells)) {
      // If cells are filled, check that sum adds up
      const unitSum = Util.getValueSum(this.cells);
      if (unitSum !== this.totalSum) {
        return false;
      }
    }

    // Check noDuplicates constraint
    if (this.noDuplicates && Util.containsDuplicates(this.cells)) {
      return false;
    }

    // If some cells are empty, check that sum can still be fulfilled
    const currentSum = Util.getValueSum(this.cells);
    const missingSum = this.totalSum - currentSum;
    const unfilledCells = this.cells.filter(c => c.candidates.length > 1).length;
    if (missingSum < unfilledCells || missingSum > 9 * unfilledCells) {
      return false;
    }

    return true;
  }

  public propagate(): void {
    // If only one cell left, fill it
    const unfilledCells = this.cells.filter(c => c.candidates.length > 1);
    if (unfilledCells.length === 1) {
      const cell = unfilledCells[0];
      const value = this.totalSum - Util.getValueSum(this.cells);
      if (value >= 1 && value <= 9) {
        cell.candidates = value.toString();
      }
    }

    // If noDuplicates option is on, propagate this
    if (this.noDuplicates) {
      const filledCells = this.cells.filter(c => c.candidates.length === 1);
      filledCells.forEach(filledCell => {
        for (const anyCell of this.cells) {
          if (filledCell.cellId !== anyCell.cellId) {
            anyCell.removeCandidate(filledCell.candidates);
          }
        }
      });
    }
  }
}


