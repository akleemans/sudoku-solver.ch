import {Cell} from "./cell";
import {Util} from "./util";

export class SumUnit {
  public constructor(
    public cells: Cell[],
    public totalSum: number) {
  }

  public isSolved(): boolean {
    return Util.allFilled(this.cells) && Util.getValueSum(this.cells) === this.totalSum
  }

  public isValid(): boolean {
    if (Util.allFilled(this.cells)) {
      // If cells are filled, check that sum adds up
      let unitSum = Util.getValueSum(this.cells);
      if (unitSum !== this.totalSum) {
        return false;
      }
    } else {
      // If some cells are empty, check that sum can still be fulfilled
      let currentSum = Util.getValueSum(this.cells);
      let missingSum = this.totalSum - currentSum
      let unfilledCells = this.cells.filter(c => c.candidates.length > 1).length;
      if (missingSum < unfilledCells || missingSum > 9 * unfilledCells) {
        return false;
      }
    }

    return true;
  }

  public propagate(): void {
    let unfilledCells = this.cells.filter(c => c.candidates.length > 1);
    if (unfilledCells.length === 1) {
      let cell = unfilledCells[0];
      let value = this.totalSum - Util.getValueSum(this.cells);
      if (value >= 1 && value <= 9) {
        cell.candidates = value.toString();
      }
    }
  }
}


