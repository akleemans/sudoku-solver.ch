/// <reference lib="webworker" />

import {Solver} from '../model/solver';
import {Sudoku} from '../model/sudoku';
import {WorkerMessage, WorkerStatus} from '../model/worker-message';
import {SudokuOptions} from '../model/sudoku-options';

addEventListener('message', event => {
  const sudokuOptions: SudokuOptions = event.data;
  const sudoku = new Sudoku(sudokuOptions.cells, sudokuOptions.constraints, sudokuOptions.globalOptions);
  console.log('Worker got sudoku:', sudoku);
  const solvedSudoku = Solver.solve(sudoku);

  let status = WorkerStatus.SOLVED;
  if (!solvedSudoku.isValid()) {
    status = WorkerStatus.INVALID;
  } else if (!solvedSudoku.isSolved()) {
    status = WorkerStatus.UNSOLVABLE;
  }
  // @ts-ignore
  postMessage(new WorkerMessage(status, solvedSudoku.toString()));
});
