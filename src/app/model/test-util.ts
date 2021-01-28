import {Constraint} from './constraint';
import {ConstraintType} from './constraint-type';

export class TestUtil {

  /**
   * Build constraints for Killer / Sum Sudoku.
   * This is similar to sum units with an additional unique constraint
   * (no duplicate numbers in a group).
   */
  public static getKillerConstraints(list: [number[], number][]): Constraint[] {
    return TestUtil.getSumConstraints(list, true);
  }

  /**
   * Build sum constraints from a simplified list version.
   */
  public static getSumConstraints(list: [number[], number][], noDuplicates: boolean = false): Constraint[] {
    const constraints = [];
    for (const item of list) {
      const constraint = new Constraint();
      constraint.type = ConstraintType.MULTI_CELL_SUM;
      constraint.cellIds = item[0];
      constraint.sum = item[1];
      constraint.noDuplicates = noDuplicates;
      constraints.push(constraint);
    }
    return constraints;
  }

  /**
   * Build product constraints from a simplified list version.
   */
  public static getProductConstraints(list: [number[], number][]): Constraint[] {
    const constraints = [];
    for (const item of list) {
      const constraint = new Constraint();
      constraint.type = ConstraintType.MULTI_CELL_PRODUCT;
      constraint.cellIds = item[0];
      constraint.product = item[1];
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
    for (const unit of units) {
      const constraint = new Constraint();
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
    for (const unit of units) {
      const constraint = new Constraint();
      constraint.type = ConstraintType.MULTI_CELL_UNIT;
      constraint.cellIds = unit;
      constraints.push(constraint);
    }
    return constraints;
  }

  /**
   * Build Nonomino constraints from a list.
   */
  public static getNonominoConstraints(list: number[][]): Constraint[] {
    const constraints = [];
    for (const item of list) {
      const constraint = new Constraint();
      constraint.type = ConstraintType.MULTI_CELL_UNIT;
      constraint.cellIds = item;
      constraints.push(constraint);
    }
    return constraints;
  }

  /**
   * Build constraint list for "black dots" (factor = 2, unknownOrder)
   */
  public static getBlackDotConstraints(list: number[][]): Constraint[] {
    const constraints = [];
    for (const item of list) {
      const constraint = new Constraint();
      constraint.type = ConstraintType.TWO_CELLS_EXACT_FACTOR;
      constraint.cellIds = item;
      constraint.factor = 2;
      constraint.unknownOrder = true;
      constraints.push(constraint);
    }
    return constraints;
  }


  /**
   * Build constraint list for "white dots" (difference = 1, unknownOrder)
   */
  public static getWhiteDotConstraints(list: number[][]): Constraint[] {
    const constraints = [];
    for (const item of list) {
      const constraint = new Constraint();
      constraint.type = ConstraintType.TWO_CELLS_EXACT_DIFFERENCE;
      constraint.cellIds = item;
      constraint.difference = 1;
      constraint.unknownOrder = true;
      constraints.push(constraint);
    }
    return constraints;
  }

  /**
   * Build constraint list for "pen arrows" (difference = 1, known order)
   */
  public static getPenArrowConstraints(list: number[][]): Constraint[] {
    const constraints = [];
    for (const item of list) {
      const constraint = new Constraint();
      constraint.type = ConstraintType.TWO_CELLS_EXACT_DIFFERENCE;
      constraint.cellIds = item;
      constraint.difference = 1;
      constraint.unknownOrder = false;
      constraints.push(constraint);
    }
    return constraints;
  }

  /**
   * Build constraint list for bigger/smaller constraints.
   * Second cell is bigger than first cell.
   */
  public static getBiggerSmallerConstraints(list: number[][]): Constraint[] {
    const constraints = [];
    for (const item of list) {
      const constraint = new Constraint();
      constraint.type = ConstraintType.TWO_CELLS_BIGGER_THAN;
      constraint.cellIds = item;
      constraints.push(constraint);
    }
    return constraints;
  }
}
