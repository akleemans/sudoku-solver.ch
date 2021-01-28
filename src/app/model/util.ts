import * as _ from 'lodash';
import {randomColor} from 'randomcolor';
import {Cell} from './cell';

export class Util {
  public static ALL_NUMBERS = '123456789';

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
    const cells = [];
    for (const i of _.range(81)) {
      cells.push(sudokuStr[i] === '.' ? '123456789' : sudokuStr[i]);
    }
    return cells;
  }

  /**
   * Calculate the sum of the already known number of a cell array.
   */
  public static getValueSum(cells: Cell[]): number {
    return _.sum(
      cells.filter(c => c.getCandidates().length === 1)
        .map(c => +c.getCandidates()));
  }

  /**
   * Calculate the product of the already known number of a cell array.
   */
  public static getValueProduct(cells: Cell[]): number {
    const filledCells = cells.filter(c => c.getCandidates().length === 1)
      .map(c => +c.getCandidates());
    if (filledCells.length === 0) {
      return 0;
    } else {
      return filledCells.reduce((a, b) => a * b, 1);
    }
  }

  /**
   * Checks if all cells of an array are filled with one value.
   */
  public static allFilled(cells: Cell[]): boolean {
    return _.every(cells.map(c => c.isSolved()));
  }

  /**
   * Checks if there are duplicates in a cell array.
   * Empty cells are not considered. Cells with multiple candidates are not considered.
   */
  public static containsDuplicates(cells: Cell[]): boolean {
    // Remove empty values
    const filledCellValues = cells
      .filter(c => c.getCandidates().length === 1)
      .map(c => c.getCandidates());
    return _.uniq(filledCellValues).length !== filledCellValues.length;
  }
}
