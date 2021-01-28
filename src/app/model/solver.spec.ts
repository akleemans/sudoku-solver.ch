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
    it('should solve Geocaching puzzle A', async () => {
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

    it('should solve Geocaching puzzle K', async () => {
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

    // Solved in 5s
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

    it('should solve Geocaching puzzle N', () => {
      const sudokuStr = '........................................9.......7.....7.......6.3.....4...9...1..';
      const expectedSolution = '578361924462975831913482657687134295345296718291758463724519386136827549859643172';
      const cells = Util.getCellsFromString(sudokuStr);
      const sumCells: [number[], number][] = [
        [[2, 11], 10],
        [[5, 6], 10],
        [[7, 16], 5],
        [[8, 17], 5],
        [[9, 10], 10],
        [[11, 20], 5],
        [[18, 19], 10],
        [[20, 29], 10],
        [[21, 30], 5],
        [[22, 31], 11],
        [[22, 23], 10],
        [[32, 41], 10],
        [[34, 43], 10],
        [[36, 45], 5],
        [[46, 47], 10],
        [[51, 52], 10],
        [[55, 64], 5],
        [[56, 65], 10],
        [[58, 59], 10],
        [[66, 67], 10],
        [[68, 77], 10],
        [[75, 76], 10],
      ];
      const constraints = TestUtil.getSumConstraints(sumCells);
      const sudoku = new Sudoku(cells, constraints);
      const solution = Solver.solve(sudoku);
      expect(solution.toString()).toBe(expectedSolution);
    });
  });

  describe('Product Sudoku', () => {
    it('should solve Geocaching puzzle U', () => {
      const sudokuStr = '.................................................................................';
      const expectedSolution = '348265179167934582952817346794152863835679421216483795483526917679341258521798634';
      const cells = Util.getCellsFromString(sudokuStr);
      const productCells: [number[], number][] = [
        [[1, 10], 24],
        [[3, 12], 18],
        [[5, 14], 20],
        [[10, 19], 30],
        [[12, 21], 72],
        [[13, 22], 3],
        [[15, 24], 15],
        [[16, 25], 32],
        [[27, 36], 56],
        [[31, 40], 35],
        [[35, 44], 3],
        [[36, 45], 16],
        [[39, 48], 24],
        [[43, 52], 18],
        [[44, 53], 5],
        [[48, 57], 20],
        [[58, 67], 8],
        [[61, 70], 5],
        [[64, 73], 14],
      ];
      const constraints = TestUtil.getProductConstraints(productCells);
      const sudoku = new Sudoku(cells, constraints);
      const solution = Solver.solve(sudoku);
      expect(solution.toString()).toBe(expectedSolution);
    });

    it('should solve Geocaching puzzle I', () => {
      const sudokuStr = '.................................................................................';
      const expectedSolution = '384671529716952348259834167975416283863297415421583796692745831538129674147368952';
      const cells = Util.getCellsFromString(sudokuStr);
      const productCells: [number[], number][] = [
        [[1, 9], 56],
        [[0, 2, 10], 12],
        [[3, 5, 13], 30],
        [[7, 17], 16],
        [[10, 18, 20, 28], 126],
        [[33, 35, 25, 43], 36],
        [[36, 38, 28, 46], 336],
        [[42, 44, 34, 52], 1440],
        [[36, 46, 54], 96],
        [[54, 46, 56, 64], 72],
        [[57, 59, 49, 67], 560],
        [[60, 62, 52, 70], 504],
        [[54, 64, 72], 18],
        [[64, 66, 56, 74], 42],
        [[72, 64, 74], 21],
        [[73, 75, 65], 96],
        [[76, 78, 68], 486],
        [[78, 80, 70], 126],
      ];
      const constraints = TestUtil.getProductConstraints(productCells);
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

  describe('Difference / factor', () => {
    it('should solve Geocaching puzzle S (black / white dots)', () => {
      const sudokuStr = '.................................................................................';
      const expectedSolution = '846153972572984361391267548287346195934521786615798423763819254128475639459632817';
      const cells = Util.getCellsFromString(sudokuStr);
      const constraints = TestUtil.getBlackDotConstraints([
        [0, 1],
        [8, 17],
        [11, 20],
        [13, 14],
        [15, 16],
        [20, 21],
        [25, 26],
        [31, 40],
        [40, 41],
        [44, 53],
        [50, 51],
        [51, 52],
        [51, 60],
        [55, 56],
        [57, 66],
        [63, 64],
        [65, 66],
        [69, 70],
        [75, 76],
      ]);
      TestUtil.getWhiteDotConstraints([
        [5, 14],
        [7, 16],
        [12, 13],
        [14, 15],
        [18, 27],
        [19, 28],
        [21, 30],
        [22, 23],
        [23, 32],
        [24, 25],
        [28, 29],
        [30, 31],
        [34, 43],
        [35, 44],
        [37, 38],
        [38, 39],
        [38, 47],
        [42, 43],
        [45, 54],
        [48, 57],
        [49, 50],
        [52, 53],
        [54, 55],
        [61, 62],
        [65, 74],
        [68, 69],
        [72, 73],
        [76, 77],
      ]).forEach(c => constraints.push(c));
      const solution = Solver.solve(new Sudoku(cells, constraints));
      expect(solution.toString()).toBe(expectedSolution);
    });

    it('should solve Geocaching puzzle B (black / white dots)', () => {
      const sudokuStr = '.................................................................................';
      const expectedSolution = '587136924624597813913248567891364752432715689756829431179653248368472195245981376';
      const cells = Util.getCellsFromString(sudokuStr);
      const constraints = TestUtil.getBlackDotConstraints([
        [4, 5],
        [7, 8],
        [7, 16],
        [10, 11],
        [10, 19],
        [21, 22],
        [22, 23],
        [23, 32],
        [27, 36],
        [29, 38],
        [30, 31],
        [40, 49],
        [51, 60],
        [60, 61],
        [61, 62],
        [60, 69],
        [63, 64],
        [65, 66],
        [68, 69],
        [68, 77],
        [72, 73],
      ]);
      TestUtil.getWhiteDotConstraints([
        [0, 9],
        [1, 2],
        [5, 14],
        [6, 15],
        [8, 17],
        [11, 12],
        [11, 20],
        [14, 15],
        [18, 27],
        [20, 21],
        [21, 30],
        [24, 25],
        [25, 26],
        [25, 34],
        [27, 28],
        [32, 41],
        [33, 42],
        [36, 37],
        [37, 38],
        [39, 48],
        [41, 42],
        [43, 44],
        [46, 47],
        [52, 61],
        [55, 64],
        [56, 65],
        [57, 58],
        [59, 60],
        [59, 68],
        [63, 72],
        [67, 76],
        [71, 80],
        [73, 74],
        [75, 76],
        [79, 80],

      ]).forEach(c => constraints.push(c));
      const solution = Solver.solve(new Sudoku(cells, constraints));
      expect(solution.toString()).toBe(expectedSolution);
    });

    it('should solve Geocaching puzzle X (black / white dots)', () => {
      const sudokuStr = '.................................................................................';
      const expectedSolution = '976354812485216973312987465259761348168432597734598621627845139543129786891673254';
      const cells = Util.getCellsFromString(sudokuStr);
      const constraints = TestUtil.getBlackDotConstraints([
        [2, 3],
        [5, 6],
        [7, 8],
        [9, 10],
        [12, 13],
        [19, 20],
        [27, 36],
        [31, 40],
        [32, 41],
        [34, 35],
        [37, 46],
        [38, 39],
        [38, 47],
        [52, 53],
        [55, 64],
        [57, 58],
        [58, 67],
        [66, 67],
      ]);
      TestUtil.getWhiteDotConstraints([
        [1, 2],
        [1, 10],
        [2, 11],
        [3, 12],
        [4, 5],
        [6, 15],
        [8, 17],
        [9, 18],
        [14, 23],
        [16, 25],
        [18, 27],
        [21, 22],
        [22, 23],
        [24, 33],
        [25, 26],
        [28, 37],
        [29, 38],
        [30, 31],
        [33, 34],
        [35, 44],
        [39, 40],
        [39, 48],
        [40, 41],
        [42, 51],
        [45, 54],
        [46, 47],
        [46, 55],
        [47, 48],
        [49, 50],
        [52, 61],
        [54, 63],
        [56, 57],
        [58, 59],
        [63, 64],
        [64, 65],
        [69, 70],
        [72, 73],
        [75, 76],
        [77, 78],
        [79, 80],
      ]).forEach(c => constraints.push(c));
      const solution = Solver.solve(new Sudoku(cells, constraints));
      expect(solution.toString()).toBe(expectedSolution);
    });
  });

  describe('Difference', () => {
    it('should solve Geocaching puzzle C (pen arrows)', () => {
      const sudokuStr = '.................................................................................';
      const expectedSolution = '563172984879534216421986735236845179785619342194723568942361857618257493357498621';
      const cells = Util.getCellsFromString(sudokuStr);
      const constraints = TestUtil.getPenArrowConstraints([
        [0, 1],
        [1, 10],
        [5, 13],
        [7, 6],
        [10, 9],
        [13, 14],
        [16, 15],
        [15, 25],
        [19, 28],
        [20, 19],
        [22, 21],
        [23, 24],
        [27, 28],
        [28, 18],
        [30, 21],
        [31, 32],
        [32, 23],
        [36, 37],
        [37, 46],
        [38, 29],
        [38, 39],
        [40, 49],
        [42, 43],
        [43, 51],
        [47, 38],
        [49, 50],
        [49, 57],
        [51, 52],
        [52, 62],
        [56, 57],
        [57, 47],
        [58, 48],
        [59, 49],
        [60, 70],
        [61, 52],
        [62, 53],
        [64, 56],
        [66, 57],
        [67, 58],
        [68, 60],
        [68, 77],
        [69, 61],
        [73, 63],
        [74, 65],
        [75, 67],
        [77, 76],
        [78, 68],
        [79, 71],
        [80, 79],
      ]);
      const solution = Solver.solve(new Sudoku(cells, constraints));
      expect(solution.toString()).toBe(expectedSolution);
    });

    it('should solve Geocaching puzzle P (pen arrows)', () => {
      const sudokuStr = '.................................................................................';
      const expectedSolution = '284679315165483279937215468596831742473562891812947653621798534348156927759324186';
      const cells = Util.getCellsFromString(sudokuStr);
      const constraints = TestUtil.getPenArrowConstraints([
        [2, 11],
        [10, 20],
        [11, 3],
        [11, 10],
        [12, 11],
        [16, 26],
        [20, 30],
        [25, 16],
        [25, 33],
        [26, 17],
        [29, 20],
        [29, 37],
        [33, 42],
        [37, 45],
        [39, 29],
        [39, 40],
        [40, 50],
        [42, 43],
        [44, 35],
        [49, 39],
        [50, 42],
        [50, 59],
        [51, 50],
        [52, 51],
        [53, 62],
        [56, 47],
        [59, 58],
        [59, 69],
        [60, 51],
        [61, 62],
        [62, 52],
        [64, 73],
        [70, 61],
        [71, 79],
        [78, 70],
        [80, 71],
      ]);
      const solution = Solver.solve(new Sudoku(cells, constraints));
      expect(solution.toString()).toBe(expectedSolution);
    });
  });

  describe('Bigger/smaller', () => {
    it('should solve Geocaching puzzle Z', () => {
      const sudokuStr = '.................................................................................';
      const expectedSolution = '587326941342791856961845723429673185753182694618459372876534219195267438234918567';
      const cells = Util.getCellsFromString(sudokuStr);
      const constraints = TestUtil.getSudokuXConstraints();
      TestUtil.getBiggerSmallerConstraints([
        [0, 1],
        [2, 1],
        [4, 3],
        [4, 5],
        [7, 6],
        [7, 16],
        [8, 7],
        [8, 17],
        [9, 0],
        [9, 18],
        [9, 10],
        [10, 1],
        [10, 19],
        [11, 2],
        [11, 10],
        [12, 13],
        [14, 13],
        [15, 6],
        [16, 15],
        [16, 17],
        [19, 18],
        [20, 19],
        [20, 11],
        [22, 21],
        [22, 23],
        [24, 15],
        [25, 16],
        [25, 24],
        [25, 26],
        [26, 17],
        [27, 36],
        [28, 37],
        [33, 42],
        [34, 43],
        [38, 29],
        [38, 47],
        [44, 35],
        [45, 36],
        [46, 37],
        [51, 42],
        [52, 43],
        [55, 54],
        [55, 64],
        [56, 55],
        [58, 57],
        [58, 59],
        [60, 69],
        [61, 60],
        [61, 70],
        [61, 62],
        [63, 54],
        [63, 64],
        [63, 72],
        [65, 56],
        [65, 64],
        [66, 67],
        [67, 68],
        [69, 78],
        [70, 69],
        [70, 71],
        [70, 79],
        [71, 62],
        [72, 73],
        [73, 64],
        [73, 74],
        [74, 65],
        [76, 75],
        [76, 77],
        [78, 79],
        [79, 80],
        [80, 71],
      ]).forEach(c => constraints.push(c));
      const solution = Solver.solve(new Sudoku(cells, constraints));
      expect(solution.toString()).toBe(expectedSolution);
    });
  });

  describe('countCellOccurence', () => {
    it('should', () => {
      const sudokuStr = '........................................9.......7.....7.......6.3.....4...9...1..';
      const cells = Util.getCellsFromString(sudokuStr);
      const sumCells: [number[], number][] = [
        [[2, 11], 10],
        [[5, 6], 10],
        [[7, 16], 5],
        [[8, 17], 5],
        [[9, 10], 10],
        [[11, 20], 5],
        [[18, 19], 10],
        [[20, 29], 10],
        [[21, 30], 5],
        [[22, 23], 10],
        [[32, 41], 10],
        [[34, 43], 10],
        [[36, 45], 5],
        [[46, 47], 10],
        [[51, 52], 10],
        [[55, 64], 5],
        [[56, 65], 10],
        [[58, 59], 10],
        [[66, 67], 10],
        [[68, 77], 10],
        [[75, 76], 10],
      ];
      const constraints = TestUtil.getSumConstraints(sumCells);
      const sudoku = new Sudoku(cells, constraints);

      expect(Solver.countCellOccurence(sudoku.cells[0], sudoku)).toBe(0);
      expect(Solver.countCellOccurence(sudoku.cells[2], sudoku)).toBe(1);
      expect(Solver.countCellOccurence(sudoku.cells[11], sudoku)).toBe(2);
    });
  });
});


const solveAsync = async (sudoku: Sudoku): Promise<Sudoku> => Promise.resolve(Solver.solve(sudoku));
