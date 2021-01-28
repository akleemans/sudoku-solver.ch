import {ConstraintType} from './constraint-type';
import {Cell} from './cell';
import {Util} from './util';

export class CellConnection {
  public type: ConstraintType.TWO_CELLS_BIGGER_THAN | ConstraintType.TWO_CELLS_EXACT_FACTOR | ConstraintType.TWO_CELLS_EXACT_DIFFERENCE;
  public otherCell: Cell;

  // Me + difference = Other cell
  public difference: number;

  // Me * factor = Other cell
  public factor: number;

  public unknownOrder: boolean;

  // If otherCell is bigger than this one
  public bigger: boolean;

  public static difference(cell: Cell, difference: number, unknownOrder: boolean) {
    const newCellConnection = new CellConnection();
    newCellConnection.type = ConstraintType.TWO_CELLS_EXACT_DIFFERENCE;
    newCellConnection.otherCell = cell;
    newCellConnection.difference = difference;
    newCellConnection.unknownOrder = unknownOrder;
    return newCellConnection;
  }

  public static factor(cell: Cell, factor: number, unknownOrder: boolean) {
    const newCellConnection = new CellConnection();
    newCellConnection.type = ConstraintType.TWO_CELLS_EXACT_FACTOR;
    newCellConnection.otherCell = cell;
    newCellConnection.factor = factor;
    newCellConnection.unknownOrder = unknownOrder;
    return newCellConnection;
  }

  public static biggerSmaller(cell: Cell, bigger: boolean) {
    const newCellConnection = new CellConnection();
    newCellConnection.type = ConstraintType.TWO_CELLS_BIGGER_THAN;
    newCellConnection.otherCell = cell;
    newCellConnection.bigger = bigger;
    return newCellConnection;
  }

  public getPossibleValuesForOtherCell(n: number): string {
    if (this.type === ConstraintType.TWO_CELLS_EXACT_DIFFERENCE) {
      if (this.difference === undefined) {
        return Util.ALL_NUMBERS;
      }

      const otherValues = [n + this.difference];
      if (this.unknownOrder === true) {
        otherValues.push(n - this.difference);
      }
      return otherValues.filter(v => v >= 1 && v <= 9).join('');
    } else if (this.type === ConstraintType.TWO_CELLS_EXACT_FACTOR) {
      if (this.factor === undefined) {
        return Util.ALL_NUMBERS;
      }

      const otherValues = [Math.round(n * this.factor)];
      if (this.unknownOrder === true) {
        otherValues.push(Math.round(n / this.factor));
      }
      return otherValues.filter(v => v >= 1 && v <= 9).join('');
    } else if (this.type === ConstraintType.TWO_CELLS_BIGGER_THAN) {
      let baseNumbers = Util.ALL_NUMBERS;
      if (this.bigger) {
        for (let i = n; i >= 1; i--) {
          baseNumbers = baseNumbers.replace(i.toString(), '');
        }
      } else {
        for (let i = n; i <= 9; i++) {
          baseNumbers = baseNumbers.replace(i.toString(), '');
        }
      }
      return baseNumbers;
    }
  }

  public isUnsatisfiableFor(baseValue: number): boolean {
    // If other cell is not yet solved, constraint can still be satisfied
    if (!this.otherCell.isSolved()) {
      return false;
    }
    const otherValue = +this.otherCell.getCandidates();

    if (this.type === ConstraintType.TWO_CELLS_EXACT_DIFFERENCE) {
      if (this.unknownOrder) {
        return !(baseValue + this.difference === otherValue || baseValue - this.difference === otherValue);
      } else {
        return baseValue + this.difference !== otherValue;
      }
    } else if (this.type === ConstraintType.TWO_CELLS_EXACT_FACTOR) {
      if (this.unknownOrder) {
        return !(Math.round(baseValue * this.factor) === otherValue || Math.round(baseValue / this.factor) === otherValue);
      } else {
        return Math.round(baseValue * this.factor) !== otherValue;
      }
    } else if (this.type === ConstraintType.TWO_CELLS_BIGGER_THAN) {
      if (this.bigger) {
        return +otherValue <= baseValue;
      } else {
        return +otherValue >= baseValue;
      }
    }
  }
}
