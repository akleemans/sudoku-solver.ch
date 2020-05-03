import {Util} from "../main/util";
import {Solver} from "./solver";
import {Sudoku} from "./sudoku";

describe('Solver', () => {
  describe('Standard Sudoku', () => {
    it('should solve easy Sudoku', () => {
      let sudokuStr = '.7.8.2.4.....7.....6..512.7.32.6.59..1.....2.....4......1.96.5.3...1......97.5.8.';
      let expectedSolution = '175832649923674815864951237432167598716589423598243176281396754357418962649725381';
      let cells = Util.getCellsFromString(sudokuStr);
      let solution = Solver.solve(new Sudoku(cells));
      expect(solution.toString()).toBe(expectedSolution);
    });

    it('should solve medium Sudoku', () => {
      let sudokuStr = '..2....9.1.8.3.5.4.34..5.....7.9.....8.7.1.3.....2.7.....2..15.7.5.4.3.9.6....4..';
      let expectedSolution = '652417893178932564934865271217398645486751932593624718849273156725146389361589427';
      let cells = Util.getCellsFromString(sudokuStr);
      let solution = Solver.solve(new Sudoku(cells));
      expect(solution.toString()).toBe(expectedSolution);
    });

    it('should solve hard Sudoku', () => {
      let sudokuStr = '.1......86....57..3....6.4.8...4.27.........5.74.6.....3.....9...79.....2...1..5.';
      let expectedSolution = '715294638642835719398176542856349271923781465174562983531627894487953126269418357';
      let cells = Util.getCellsFromString(sudokuStr);
      let solution = Solver.solve(new Sudoku(cells));
      expect(solution.toString()).toBe(expectedSolution);
    });

    it('should solve hardest Sudoku', () => {
      let sudokuStr = '4.....8.5.3..........7......2.....6.....8.4......1.......6.3.7.5..2.....1.4......';
      let expectedSolution = '417369825632158947958724316825437169791586432346912758289643571573291684164875293';
      let cells = Util.getCellsFromString(sudokuStr);
      let solution = Solver.solve(new Sudoku(cells));
      expect(solution.toString()).toBe(expectedSolution);
    });
  });

  describe('Killer / Sum Sudoku', () => {
    fit('should custom sum Sudoku Nr. 1', () => {
      const sudokuStr = '.................................................................................';
      const expectedSolution = '592176483416938275378254196167395824934862751825741369289513647741629538653487912';
      const cells = Util.getCellsFromString(sudokuStr);
      const sumCells: [number[], number][] = [
        [[0, 1], 14],
        [[2, 3], 3],
        [[4, 13, 14, 15, 22, 23, 24], 30],
        [[5, 6], 10],
        [[7, 16], 15],
        [[8, 17], 8],
        [[9, 10], 5],
        [[11, 12], 15],
        [[18, 19, 27, 28], 17],
        [[20, 21], 10],
        [[25, 26], 15],
        [[29, 30, 38, 39, 40, 41, 47], 35],
        [[31, 32, 33, 34], 24],
        [[35, 44], 5],
        [[36, 45], 17],
        [[37, 46, 48, 49, 55, 56, 57, 58], 39],
        [[42, 43], 12],
        [[50, 51], 4],
        [[52, 61, 70, 71], 21],
        [[53, 62], 16],
        [[54, 63, 64, 65, 74], 17],
        [[59, 68], 12],
        [[60, 69, 77, 78], 27],
        [[66, 75], 10],
        [[67, 76], 10],
        [[72, 73], 11],
        [[79, 80], 3],
      ];
      const constraints = Util.getSumConstraints(sumCells);
      let solution = Solver.solve(new Sudoku(cells, constraints));
      expect(solution.toString()).toBe(expectedSolution);
    });

    it('should custom sum Sudoku Nr. 2', () => {
      const sudokuStr = '.................................................................................';
      const expectedSolution = '825749613194863752637512498769231584483975261512684937358497126276158349941326875';
      const cells = Util.getCellsFromString(sudokuStr);
      const sumCells: [number[], number][] = [
        [[0, 1, 9, 18, 27, 36, 45, 54], 36],
        [[2, 3, 10, 11, 12, 13], 39],
        [[4, 5], 13],
        [[6, 7, 8, 15, 16, 17, 24, 25, 26], 45],
        [[14, 21, 22, 23], 11],
        [[19, 20, 28, 29], 25],
        [[30, 31], 5],
        [[32, 41], 6],
        [[33, 42], 7],
        [[34, 35], 12],
        [[37, 38], 11],
        [[39, 40], 16],
        [[43, 44, 53], 14],
        [[46, 47, 48, 55, 56, 57], 26],
        [[49, 58], 17],
        [[50, 51], 13],
        [[52, 61], 5],
        [[59, 60], 8],
        [[62, 71], 15],
        [[63, 64], 9],
        [[65, 74], 7],
        [[66, 75], 4],
        [[67, 68], 13],
        [[69, 70], 7],
        [[72, 73], 13],
        [[76, 77, 78], 16],
        [[79, 80], 12],
      ];
      const constraints = Util.getSumConstraints(sumCells);
      let solution = Solver.solve(new Sudoku(cells, constraints));
      expect(solution.toString()).toBe(expectedSolution);
    });
  });
});
