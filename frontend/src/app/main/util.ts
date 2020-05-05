import * as _ from 'lodash';
import {randomColor} from 'randomcolor';
import {Constraint} from "../model/constraint";
import {ConstraintType} from "../model/constraint-type";
import {Cell} from "../model/cell";

export class Util {
  /**
   * Returns number of occurences of value in string.
   */
  public static count(str: string, value: string) {
    const regExp = new RegExp(value, 'gi');
    return (str.match(regExp) || []).length;
  }

  /**
   * Replace all string occurences of oldVal with newVal in str.
   */
  public static replaceAll(str: string, oldVal: string, newVal: string) {
    return str.replace(new RegExp(oldVal, 'g'), newVal);
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

  /**
   * Calculate the sum of the already known number of a cell array.
   */
  public static getValueSum(cells: Cell[]): number {
    return _.sum(cells.filter(c => c.candidates.length === 1)
      .map(c => +c.candidates));
  }
}
