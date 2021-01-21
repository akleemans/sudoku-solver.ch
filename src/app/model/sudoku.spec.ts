import {Sudoku} from './sudoku';
import {Util} from "./util";
import {TestUtil} from "./test-util";

describe('Sudoku', () => {
  describe('isValid', () => {
    it('should recognize unsolved Sudoku as valid', () => {
      const sudokuStr = '.7.8.2.4.....7.....6..512.7.32.6.59..1.....2.....4......1.96.5.3...1......97.5.8.';
      const cells = Util.getCellsFromString(sudokuStr);
      const sudoku = new Sudoku(cells);
      expect(sudoku.isValid()).toBeTrue();
    });

    it('should recognize solved Sudoku as valid', () => {
      const sudokuStr = '175832649923674815864951237432167598716589423598243176281396754357418962649725381';
      const cells = Util.getCellsFromString(sudokuStr);
      const sudoku = new Sudoku(cells);
      expect(sudoku.isValid()).toBeTrue();
    });

    it('should recognize sum sudoku as valid', () => {
      const sudoku = getCustomSumSudoku();
      expect(sudoku.isValid()).toBeTrue();
    });

    it('should recognize invalid Sudoku because of unit', () => {
      const sudokuStr = '1..1.............................................................................';
      const cells = Util.getCellsFromString(sudokuStr);
      const sudoku = new Sudoku(cells);
      expect(sudoku.isValid()).toBeFalse();
    });

    it('should recognize invalid Sudoku because of impossible sum', () => {
      const sudoku = getCustomSumSudoku();
      const sudokuStr = '598..............................................................................';
      const cells = Util.getCellsFromString(sudokuStr);
      sudoku.setState(cells);
      expect(sudoku.isValid()).toBeFalse();
    });

    it('should recognize valid Sudoku with possible sum', () => {
      const sudoku = getCustomSumSudoku();
      const sudokuStr = '592..............................................................................';
      const cells = Util.getCellsFromString(sudokuStr);
      sudoku.setState(cells);
      expect(sudoku.isValid()).toBeTrue();
    });
  });

  describe('Killer / Sum Sudoku', () => {
    it('should recognize unsolved Sudoku', () => {
      const sudokuStr = '.7.8.2.4.....7.....6..512.7.32.6.59..1.....2.....4......1.96.5.3...1......97.5.8.';
      const cells = Util.getCellsFromString(sudokuStr);
      const sudoku = new Sudoku(cells);
      expect(sudoku.isSolved()).toBeFalse();
    });

    it('should recognize solved Sudoku', () => {
      const sudokuStr = '175832649923674815864951237432167598716589423598243176281396754357418962649725381';
      const cells = Util.getCellsFromString(sudokuStr);
      const sudoku = new Sudoku(cells);
      expect(sudoku.isSolved()).toBeTrue();
    });

    it('should recognize solved sum Sudoku as solved', () => {
      const sudoku = getCustomSumSudoku();
      expect(sudoku.isSolved()).toBeTrue();
    });
  });

  describe('toString', () => {
    it('should render normal Sudoku to string', () => {
      const sudokuStr = '.7.8.2.4.....7.....6..512.7.32.6.59..1.....2.....4......1.96.5.3...1......97.5.8.';
      const cells = Util.getCellsFromString(sudokuStr);
      const sudoku = new Sudoku(cells);
      expect(sudoku.toString()).toBe(sudokuStr);
    });

    it('should render solved Sudoku to string', () => {
      const sudokuStr = '175832649923674815864951237432167598716589423598243176281396754357418962649725381';
      const cells = Util.getCellsFromString(sudokuStr);
      const sudoku = new Sudoku(cells);
      expect(sudoku.toString()).toBe(sudokuStr);
    });

    it('should render empty Sudoku to string', () => {
      const sudokuStr = '.................................................................................';
      const cells = Util.getCellsFromString(sudokuStr);
      const sudoku = new Sudoku(cells);
      expect(sudoku.toString()).toBe(sudokuStr);
    });
  });
});

const getCustomSumSudoku = () => {
  const solvedSudoku = '592176483416938275378254196167395824934862751825741369289513647741629538653487912';
  const cells = Util.getCellsFromString(solvedSudoku);
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
  const constraints = TestUtil.getSumConstraints(sumCells);
  return new Sudoku(cells, constraints);
}
