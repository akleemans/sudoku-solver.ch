import {Solver} from './solver';
import {Sudoku} from './sudoku';
import {Constraint} from './constraint';
import {ConstraintType} from './constraint-type';
import {Util} from './util';
import {TestUtil} from './test-util';

describe('Solver', () => {
  describe('Standard Sudoku', () => {
    it('should solve easy Sudoku', () => {
      const sudokuStr = '.7.8.2.4.....7.....6..512.7.32.6.59..1.....2.....4......1.96.5.3...1......97.5.8.';
      const expectedSolution = '175832649923674815864951237432167598716589423598243176281396754357418962649725381';
      const cells = Util.getCellsFromString(sudokuStr);
      const solution = Solver.solve(new Sudoku(cells));
      expect(solution.toString()).toBe(expectedSolution);
    });

    it('should solve medium Sudoku', () => {
      const sudokuStr = '..2....9.1.8.3.5.4.34..5.....7.9.....8.7.1.3.....2.7.....2..15.7.5.4.3.9.6....4..';
      const expectedSolution = '652417893178932564934865271217398645486751932593624718849273156725146389361589427';
      const cells = Util.getCellsFromString(sudokuStr);
      const solution = Solver.solve(new Sudoku(cells));
      expect(solution.toString()).toBe(expectedSolution);
    });

    it('should solve hard Sudoku', () => {
      const sudokuStr = '.1......86....57..3....6.4.8...4.27.........5.74.6.....3.....9...79.....2...1..5.';
      const expectedSolution = '715294638642835719398176542856349271923781465174562983531627894487953126269418357';
      const cells = Util.getCellsFromString(sudokuStr);
      const solution = Solver.solve(new Sudoku(cells));
      expect(solution.toString()).toBe(expectedSolution);
    });

    it('should solve hardest Sudoku', () => {
      const sudokuStr = '4.....8.5.3..........7......2.....6.....8.4......1.......6.3.7.5..2.....1.4......';
      const expectedSolution = '417369825632158947958724316825437169791586432346912758289643571573291684164875293';
      const cells = Util.getCellsFromString(sudokuStr);
      const solution = Solver.solve(new Sudoku(cells));
      expect(solution.toString()).toBe(expectedSolution);
    });
  });

  describe('Killer Sudoku', () => {
    // Solvable, takes about 15s
    xit('should solve Geocaching puzzle A', async () => {
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
      const constraints = TestUtil.getKillerConstraints(sumCells);
      const solution = await solveAsync(new Sudoku(cells, constraints));
      expect(solution.toString()).toBe(expectedSolution);
    });

    // Can't be solved for now, not sure why
    xit('should solve Geocaching puzzle K', async () => {
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
      const constraints = TestUtil.getKillerConstraints(sumCells);
      const solution = await solveAsync(new Sudoku(cells, constraints));
      expect(solution.toString()).toBe(expectedSolution);
    });

    // Can be solved in 5s
    it('should solve Daily No. 5512', async () => {
      // From https://www.killersudokuonline.com/puzzles/2021/puzzle-D343knm5499.gif
      const sudokuStr = '.................................................................................';
      const expectedSolution = '263584179851379264497612583615823497984756321732491658549167832378245916126938745';
      const cells = Util.getCellsFromString(sudokuStr);
      const sumCells: [number[], number][] = [
        [[0, 1, 9], 16],
        [[2, 3, 11], 9],
        [[4, 13, 22], 16],
        [[5, 6, 15], 7],
        [[7, 8, 17], 20],
        [[10, 19, 28], 15],
        [[12, 21], 9],
        [[14, 23], 11],
        [[16, 25, 34], 23],
        [[18, 27], 10],
        [[20, 29, 38], 16],
        [[24, 33, 42], 12],
        [[26, 35], 10],
        [[30, 31, 32, 40, 49], 27],
        [[36, 45], 16],
        [[37, 46], 11],
        [[39, 48, 57], 12],
        [[41, 50, 59], 14],
        [[43, 52], 7],
        [[44, 53], 9],
        [[47, 54, 55, 56], 20],
        [[51, 60, 61, 62], 19],
        [[58, 66, 67, 68], 17],
        [[63, 72], 4],
        [[64, 65], 15],
        [[69, 70], 10],
        [[71, 80], 11],
        [[73, 74, 75, 76, 77, 78, 79], 39],
      ];
      const constraints = TestUtil.getKillerConstraints(sumCells);
      const solution = await solveAsync(new Sudoku(cells, constraints));
      expect(solution.toString()).toBe(expectedSolution);
    });
  });

  describe('Sum Sudoku', () => {
    it('should solve Geocaching puzzle R', () => {
      const sudokuStr = '.6....8..1..7........1.....7......2.3....7.......429....8..5......2...3..5..7.6..';
      const expectedSolution = '567329814182754369439186257794813526325967148816542973248635791671298435953471682';
      const cells = Util.getCellsFromString(sudokuStr);
      const sumCells: [number[], number][] = [
        [[7, 8], 5],
        [[16, 17], 15],
        [[39, 40], 15],
        [[42, 43], 5],
        [[46, 55], 5],
        [[63, 72], 15],
      ];
      const constraints = TestUtil.getSumConstraints(sumCells);
      const sudoku = new Sudoku(cells, constraints);
      const solution = Solver.solve(sudoku);
      expect(solution.toString()).toBe(expectedSolution);
    });
  });

  describe('Odd-Even Sudoku', () => {
    it('should solve even Sudoku', () => {
      const sudokuStr = '...2.1...............465...9.3...7.1..8...2..5.7...9.4...143...............8.2...';
      const expectedSolution = '389271645654389172172465893963524781418937256527618934896143527235796418741852369';
      const cells = Util.getCellsFromString(sudokuStr);
      const constraint = new Constraint();
      constraint.cellIds = [1, 7, 9, 17, 63, 71, 73, 79];
      constraint.type = ConstraintType.SINGLE_CELL_ODD_EVEN;
      constraint.isEven = true;
      const constraints = [constraint];
      const sudoku = new Sudoku(cells, constraints);
      const solution = Solver.solve(sudoku);
      expect(solution.toString()).toBe(expectedSolution);
    });

    it('should solve odd Sudoku, Geocaching puzzle J', () => {
      const sudokuStr = '..2...9....8...1..35.....62...3.7.......4.......9.5...67.....39..4...6....5...8..';
      const expectedSolution = '142736985768529143359418762296387514587241396413965278671852439824193657935674821';
      const cells = Util.getCellsFromString(sudokuStr);
      const constraint = new Constraint();
      constraint.cellIds = [12, 14, 28, 30, 32, 34, 46, 48, 50, 52, 66, 68];
      constraint.type = ConstraintType.SINGLE_CELL_ODD_EVEN;
      constraint.isEven = false;
      const constraints = [constraint];
      const sudoku = new Sudoku(cells, constraints);
      const solution = Solver.solve(sudoku);
      expect(solution.toString()).toBe(expectedSolution);
    });
  });

  describe('Hyper Sudoku', () => {
    it('should solve Hyper Sudoku', () => {
      const sudokuStr = '......31.4.3............9.7..8..3.6......8....5276...8......2...19..5..46.7..4...';
      const expectedSolution = '795846312423917856861532947978423165346158729152769438584691273219375684637284591';
      const cells = Util.getCellsFromString(sudokuStr);
      const constraints = TestUtil.getHyperConstraints();
      const sudoku = new Sudoku(cells, constraints);
      const solution = Solver.solve(sudoku);
      expect(solution.toString()).toBe(expectedSolution);
    });

    it('should solve Hyper Sudoku 2', () => {
      // From http://www.sudoku-space.com/hyper-sudoku/
      const sudokuStr = '..2........693.4.......5.3.5..1...92.....7.1.....9...5....72...2.74.8..6.6.......';
      const expectedSolution = '312784569756931428948265731573146892689527314421893675895672143237418956164359287';
      const cells = Util.getCellsFromString(sudokuStr);
      const constraints = TestUtil.getHyperConstraints();
      const sudoku = new Sudoku(cells, constraints);
      const solution = Solver.solve(sudoku);
      expect(solution.toString()).toBe(expectedSolution);
    });
  });

  describe('Sudoku X', () => {
    it('should solve Sudoku X', () => {
      const sudokuStr = '6...........2...7..7..56.18..4.3..5.....25.6..5......3...1...94..5.7.6..3....2...';
      const expectedSolution = '681794325543281976279356418164839257837425169952617843728163594415978632396542781';
      const cells = Util.getCellsFromString(sudokuStr);
      const constraints = TestUtil.getSudokuXConstraints();
      const sudoku = new Sudoku(cells, constraints);
      const solution = Solver.solve(sudoku);
      expect(solution.toString()).toBe(expectedSolution);
    });

    it('should solve Geocaching puzzle F', () => {
      const sudokuStr = '..95.71.....4.6...4.......812..6..37...7.4...76..2..942.......9...6.9.....62.53..';
      const expectedSolution = '639587142582416973417392658124968537398754216765123894253871469841639725976245381';
      const cells = Util.getCellsFromString(sudokuStr);
      const constraints = TestUtil.getSudokuXConstraints();
      const sudoku = new Sudoku(cells, constraints);
      const solution = Solver.solve(sudoku);
      expect(solution.toString()).toBe(expectedSolution);
    });

    it('should solve Geocaching puzzle Q', () => {
      const sudokuStr = '2.......6..........6..5......89.1.....6...84....4.7.......7........2....5.......8';
      const expectedSolution = '294318756357649182861752934438961527716235849925487613682573491179824365543196278';
      const cells = Util.getCellsFromString(sudokuStr);
      const constraints = TestUtil.getSudokuXConstraints();
      const sudoku = new Sudoku(cells, constraints);
      const solution = Solver.solve(sudoku);
      expect(solution.toString()).toBe(expectedSolution);
    });
  });

  describe('Nonomino', () => {
    it('should solve Wikipedia Nonomino', () => {
      // From https://de.m.wikipedia.org/wiki/Datei:A_nonomino_sudoku.svg
      const sudokuStr = '3.......4..2.6.1...1.9.8.2...5...6...2.....1...9...8...8.3.4.6...4.1.9..5.......7';
      const expectedSolution = '358196274492567138613978425175842693826453719249731856987324561734615982561289347';
      const cells = Util.getCellsFromString(sudokuStr);
      const constraints = TestUtil.getNonominoConstraints([
        [0, 1, 2, 9, 10, 11, 18, 27, 28], // red
        [3, 12, 13, 14, 23, 24, 25, 34, 35], // orange
        [4, 5, 6, 7, 8, 15, 16, 17, 26], // yellow
        [19, 20, 21, 22, 29, 36, 37, 38, 39], // green
        [30, 31, 32, 33, 40, 47, 48, 49, 50], // turquoise
        [41, 42, 43, 44, 51, 58, 59, 60, 61], // blue
        [45, 46, 55, 56, 57, 66, 67, 68, 77], // light purple
        [52, 53, 62, 69, 70, 71, 78, 79, 80], // bordeaux
        [54, 63, 64, 65, 72, 73, 74, 75, 76], // dark purple
      ]);
      const sudoku = new Sudoku(cells, constraints, {useBlockUnits: false});
      const solution = Solver.solve(sudoku);
      expect(solution.toString()).toBe(expectedSolution);
    });
  });

  /*
    describe('Difference / factor (Geocache Sudoku B)', () => {
      it('should solve black / white dots Sudoku', () => {
        const sudokuStr = '.................................................................................';

        // TODO
        const expectedSolution = 'TODO';
        const cells = Util.getCellsFromString(sudokuStr);
        // TODO
        const constraints = [
          new Constraint()
        ];
        const sudoku = new Sudoku(cells, constraints)
        const solution = Solver.solve(sudoku);
        expect(solution.toString()).toBe(expectedSolution);
      });
    });*/

});


const solveAsync = async (sudoku: Sudoku): Promise<Sudoku> => Promise.resolve(Solver.solve(sudoku));
