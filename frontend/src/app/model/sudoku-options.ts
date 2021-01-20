import {Constraint} from './constraint';

/**
 * Represents all options to create a Sudoku.
 * Used to send to web worker in serialized form, can not contain
 */
export interface SudokuOptions {
  cells: string[];
  constraints: Constraint[];
  globalOptions?: GlobalOptions;
}

export interface GlobalOptions {
  useBlockUnits: boolean;
}
