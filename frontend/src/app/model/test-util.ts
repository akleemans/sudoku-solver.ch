import {Constraint} from "../model/constraint";
import {ConstraintType} from "../model/constraint-type";

export class TestUtil {
  /**
   * Build sum constraints from a simplified list version.
   */
  public static getSumConstraints(list: [number[], number][]): Constraint[] {
    const constraints = [];
    for (let item of list) {
      let constraint = new Constraint();
      constraint.type = ConstraintType.MULTI_CELL_SUM;
      constraint.cellIds = item[0];
      constraint.sum = item[1];
      constraints.push(constraint);
    }
    return constraints;
  }

  /**
   * Build constraints for Hyper Sudoku.
   */
  public static getHyperConstraints(): Constraint[] {
    const constraints = [];
    const units = [
      [10, 11, 12, 19, 20, 21, 28, 29, 30],
      [14, 15, 16, 23, 24, 25, 32, 33, 34],
      [46, 47, 48, 55, 56, 57, 64, 65, 66],
      [50, 51, 52, 59, 60, 61, 68, 69, 70],
    ];
    for (let unit of units) {
      let constraint = new Constraint();
      constraint.type = ConstraintType.MULTI_CELL_UNIT;
      constraint.cellIds = unit;
      constraints.push(constraint);
    }
    return constraints;
  }

  /**
   * Build constraints for Sudoku X.
   */
  public static getSudokuXConstraints(): Constraint[] {
    const constraints = [];
    const units = [
      [0, 10, 20, 30, 40, 50, 60, 70, 80],
      [8, 16, 24, 32, 40, 48, 56, 64, 72],
    ];
    for (let unit of units) {
      let constraint = new Constraint();
      constraint.type = ConstraintType.MULTI_CELL_UNIT;
      constraint.cellIds = unit;
      constraints.push(constraint);
    }
    return constraints;
  }
}