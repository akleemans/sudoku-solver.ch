import * as _ from 'lodash';
import {Sudoku} from "./sudoku";
import {Cell} from "./cell";

export class Solver {

  public static solve(sudoku: Sudoku): Sudoku {
    // Initial propagation - if already solved or unsolvable, return
    sudoku.propagate()

    if (sudoku.isSolved()) {
      console.log('Solved without backtracking.')
      return sudoku;
    } else if (!sudoku.isValid()) {
      throw Error('Unsolvable Sudoku!')
    }

    // Add current state to stack:
    // 1. Current Sudoku as list of candidates
    // 2. The last guess, for example (41, '9'): "At index 41, try value '9'". None if not yet guessed.
    const stack: [string[], [number, string] | null][] = [[sudoku.serialize(), null]];

    // Work on stack with Depth-First-Search (DFS)
    let iterations = 0
    while (stack.length > 0) {
      if (iterations % 10 == 0) {
        console.log('>> Iteration ', iterations, 'stack size:', stack.length, 'stack:', stack.map(i => i[1]?.toString()));
      }
      /*
      if (iterations >= 10000) {
        console.log('Something not right, stopping at 10k iterations.');
        break;
      }
      */
      iterations += 1

      // 1. Pop state and calculate next guess
      let item = stack.pop();
      let candidates = item[0];
      let lastGuess = item[1];
      sudoku.setState(candidates);

      let possibleGuesses = Solver.calculateGuesses(sudoku)

      let nextGuess;
      if (lastGuess === null) {
        console.log('Starting to guess on layer.')
        nextGuess = possibleGuesses[0]
      } else {
        let lastGuessIdx = _.findIndex(possibleGuesses, g => g[0] === lastGuess[0] && g[1] === lastGuess[1])
        if (lastGuessIdx + 1 === possibleGuesses.length) {
          console.log('No more guesses possible, go up.')
          continue;
        }
        nextGuess = possibleGuesses[lastGuessIdx + 1]

        // Important part: If one cell can't hold ANY number, don't try any others.
        // It means that this branch can not be the solution!
        if (lastGuess[0] !== nextGuess[0]) {
          console.log('All numbers tried for one cell, branch can not be satisfied.')
          continue;
        }
      }

      // 2. Do the guess & add to stack
      const idx = nextGuess[0];
      const value = nextGuess[1];
      sudoku.cells[idx].candidates = value;
      sudoku.propagate();

      // 3. Decide how to proceed
      if (sudoku.isSolved()) {
        console.log('Solved succesfully in', iterations, 'iterations');
        return sudoku;
      }

      // Add current guess to stack
      stack.push([candidates, nextGuess])

      if (sudoku.isValid()) {
        console.log('Sudoku valid but not solved, going to next layer.')
        stack.push([sudoku.serialize(), null])
      }
    }

    // If not successful, return original Sudoku
    return sudoku;
  }

  /**
   * Calculate a list of guesses based on a partially filled Sudoku.
   * This should be stable, as we depend on the order to check how far we're already with guessing.
   * The order of guesses is optimized for small candidate lists first (minimum remaining values).
   *
   * @param sudoku The Sudoku in the state where guesses should be calculated
   */
  public static calculateGuesses(sudoku: Sudoku): [number, string][] {
    let guesses: [number, string, number][] = [];
    for (let cell of sudoku.cells) {
      // If no single candidate on cell, we can guess
      if (cell.candidates.length > 1) {
        for (let c of cell.candidates) {
          guesses.push([cell.cellId, c, Solver.getCellScore(cell, sudoku)])
        }
      }
    }

    let sortedGuesses: [number, string][] = guesses
      .sort((c1, c2) => c1[2] - c2[2])
      .map(c => [c[0], c[1]]);
    return sortedGuesses;
  }

  /*
   * Heuristic which cell to try first. The lower the number, the sooner the cell will up for a guess.
   */
  public static getCellScore(cell: Cell, sudoku: Sudoku): number {
    let nr = cell.candidates.length * 10;

    // Check if in sum units
    let cellsInSumUnit = sudoku.cellsPerSumUnit[nr];
    if (cellsInSumUnit !== undefined) {
      nr = nr - 10 + cellsInSumUnit
    }

    // TODO later: add other constraints into calculation
    return nr;
  }
}
