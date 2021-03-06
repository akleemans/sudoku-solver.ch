import {Cell} from './cell';
import {Util} from './util';

export class ProductUnit {
  public constructor(
    public cells: Cell[],
    public totalProduct: number) {
  }

  public isSolved(): boolean {
    if (!Util.allFilled(this.cells)) {
      return false;
    } else if (Util.getValueProduct(this.cells) !== this.totalProduct) {
      return false;
    }
    return true;
  }

  public isValid(): boolean {
    if (Util.allFilled(this.cells)) {
      // If cells are filled, check that product is correct
      if (Util.getValueProduct(this.cells) !== this.totalProduct) {
        return false;
      }
    } else {
      // If product is already bigger, product can not be reached
      if (Util.getValueProduct(this.cells) > this.totalProduct) {
        return false;
      }

      // Check if still solvable
      const unfilledCells = this.cells.filter(c => c.getCandidates().length > 1);
      if (unfilledCells.length === 1) {
        const unfilledCell = unfilledCells[0];
        const productOfFilledCells = Util.getValueProduct(this.cells);
        const value = Math.round(this.totalProduct / productOfFilledCells);

        // Value 1) is not possible, 2) is not a whole number, or 3) is not possible by cell
        if (value < 1 || value > 9 || value * productOfFilledCells !== this.totalProduct
          || !unfilledCell.getCandidates().includes(value.toString())) {
          return false;
        }
      }
    }

    return true;
  }

  public propagate(): void {
    // If only one cell left, fill it
    const unfilledCells = this.cells.filter(c => c.getCandidates().length > 1);
    if (unfilledCells.length === 1) {
      const cell = unfilledCells[0];
      const productOfFilledCells = Util.getValueProduct(this.cells);
      const value = Math.round(this.totalProduct / productOfFilledCells);

      // Check if calculation is still correct
      if (value * productOfFilledCells === this.totalProduct && value >= 1 && value <= 9) {
        cell.removeAllExcept(value.toString());
      }
    }
  }
}


