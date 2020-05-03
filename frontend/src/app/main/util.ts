import * as _ from 'lodash';
import {randomColor} from 'randomcolor';
import {Constraint} from "../model/constraint";
import {ConstraintType} from "../model/constraint-type";

export class Util {
  /**
   * Returns number of occurences of value in string.
   */
  public static count(str: string, value: string) {
    const regExp = new RegExp(value, 'gi');
    return (str.match(regExp) || []).length;
  }

  /**
   * Returns a random "pretty" color.
   */
  public static getRandomColor(): string {
    return randomColor();
  }

  /**
   * Builds cells from a Sudoku string like 1..32.. (etc.)
   */
  public static getCellsFromString(sudokuStr: string): string[] {
    let cells = [];
    for (let i of _.range(81)) {
      cells.push(sudokuStr[i] === '.' ? '123456789' : sudokuStr[i]);
    }
    return cells;
  }

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
}
