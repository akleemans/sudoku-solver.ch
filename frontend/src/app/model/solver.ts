import * as _ from 'lodash';
import {Sudoku} from "./sudoku";

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
      if (iterations % 1000 == 0) {
        console.log('>> Iteration ', iterations, 'stack size:', stack.length, 'stack:', stack);
      }
      console.log('>> Iteration ', iterations, 'stack size:', stack.length, 'stack:', JSON.stringify(stack));
      if (iterations >= 100) {
        console.log('Something not right, stopping at 10k iterations.');
        break;
      }
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
        // possibleGuesses.indexOf(lastGuess)
        let lastGuessIdx = _.findIndex(possibleGuesses, g => g[0] === lastGuess[0] && g[1] === lastGuess[1])
        console.log('lastGuessIdx:', lastGuessIdx);
        if (lastGuessIdx + 1 === possibleGuesses.length) {
          console.log('No more guesses possible, go up.')
          continue;
        }
        nextGuess = possibleGuesses[lastGuessIdx + 1]
        console.log('lastGuess:', lastGuess.toString(), 'nextGuess:', nextGuess.toString(), 'possibleGuesses:', possibleGuesses);

        // Important part: If one cell can't hold ANY number, don't try any others.
        // It means that this branch can not be the solution!
        if (lastGuess[0] !== nextGuess[0]) {
          console.log('All numbers tried for one cell, branch can not be satisfied.')
          continue;
        }
      }

      console.log('Working with nextGuess:', nextGuess)

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
    /*
    const cellsInUnit = {};
    for (let sumUnit of sudoku.sumUnits) {
      let cellIds = sumUnit[0];
      let unitSize = cellIds.length;
      for (let cell of cellIds) {
        cellsInUnit[cell.cellId] = unitSize;
      }
    }
     */

    // TODO with more constraints, use a more general approach for heuristic
    // (function which weighs different aspects such as remaining candidates, sum_units, etc.
    let guesses: [number, string, number][] = [];
    for (let cell of sudoku.cells) {
      // If no single candidate on cell, we can guess
      if (cell.candidates.length > 1) {
        for (let c of cell.candidates) {
          guesses.push([cell.cellId, c, cell.candidates.length])
          // guesses.push([cell.cellId, c, cellsInUnit[cell.cellId]])
        }
      }
    }

    // sorted_guesses = sorted(guesses, key=lambda x: x[2])
    // return [(g[0], g[1]) for g of sorted_guesses]
    let sortedGuesses: [number, string][] = guesses
      .sort((c1, c2) => c1[2] - c2[2])
      .map(c => [c[0], c[1]]);
    // let sortedGuesses = _.sortBy(guesses, c => c[2])
    // sorted_guesses = guesses.sort((c1, c2) => c1[2] > c2[])
    // console.log('sorted guesses:', sortedGuesses);
    return sortedGuesses;
  }
}
