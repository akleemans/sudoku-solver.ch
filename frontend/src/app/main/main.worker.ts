/// <reference lib="webworker" />

import {Solver} from '../model/solver';
import {Sudoku} from '../model/sudoku';
import {WorkerMessage, WorkerStatus} from '../model/worker-message';
import {SudokuOptions} from '../model/sudoku-options';

addEventListener('message', (event) => {
  let sudokuOptions: SudokuOptions = event.data;
  let sudoku = new Sudoku(sudokuOptions.cells, sudokuOptions.constraints, sudokuOptions.globalOptions);
  console.log('Worker got sudoku:', sudoku);
  const solvedSudoku = Solver.solve(sudoku);

  let status = WorkerStatus.SOLVED;
  if (!solvedSudoku.isValid()) {
    status = WorkerStatus.INVALID;
  } else if (!solvedSudoku.isSolved()) {
    status = WorkerStatus.UNSOLVABLE;
  }
  postMessage(new WorkerMessage(status, solvedSudoku.toString()));
});
