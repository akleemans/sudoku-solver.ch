import {Cell} from './cell';
import {CellConnection} from './cell-connection';
import {ConstraintType} from './constraint-type';

describe('Cell-Connection', () => {
  describe('difference', () => {
    it('should initialize', () => {
      const cell = new Cell(0, '');
      const cellConnection = CellConnection.difference(cell, 2, false);
      expect(cellConnection.otherCell).toEqual(cell);
      expect(cellConnection.difference).toEqual(2);
      expect(cellConnection.unknownOrder).toEqual(false);
      expect(cellConnection.type).toEqual(ConstraintType.TWO_CELLS_EXACT_DIFFERENCE);
    });

    describe('getPossibleValuesForOtherCell', () => {
      it('should calculate possibilities for known order', () => {
        const cellB = new Cell(0, '');
        const cellConnection = new CellConnection();
        cellConnection.type = ConstraintType.TWO_CELLS_EXACT_DIFFERENCE;
        cellConnection.difference = 2;
        cellConnection.otherCell = cellB;

        const otherValues = cellConnection.getPossibleValuesForOtherCell(5);
        expect(otherValues).toEqual('7');
      });

      it('should calculate possibilities for unknown order', () => {
        const cellB = new Cell(0, '');
        const cellConnection = new CellConnection();
        cellConnection.type = ConstraintType.TWO_CELLS_EXACT_DIFFERENCE;
        cellConnection.difference = 2;
        cellConnection.otherCell = cellB;
        cellConnection.unknownOrder = true;

        const otherValues = cellConnection.getPossibleValuesForOtherCell(5);
        expect(otherValues.length).toBe(2);
        expect(otherValues).toContain('3');
        expect(otherValues).toContain('7');
      });

      it('should calculate possibilities overflow', () => {
        const cellB = new Cell(0, '');
        const cellConnection = new CellConnection();
        cellConnection.type = ConstraintType.TWO_CELLS_EXACT_DIFFERENCE;
        cellConnection.difference = 5;
        cellConnection.otherCell = cellB;

        const otherValues = cellConnection.getPossibleValuesForOtherCell(5);
        expect(otherValues).toEqual('');
      });

      it('should calculate possibilities for unknown order, inverse', () => {
        const cellB = new Cell(0, '');
        const cellConnection = new CellConnection();
        cellConnection.type = ConstraintType.TWO_CELLS_EXACT_DIFFERENCE;
        cellConnection.difference = -2;
        cellConnection.otherCell = cellB;
        cellConnection.unknownOrder = true;

        const otherValues = cellConnection.getPossibleValuesForOtherCell(5);
        expect(otherValues.length).toBe(2);
        expect(otherValues).toContain('3');
        expect(otherValues).toContain('7');
      });
    });

    describe('isUnsatisfiableFor', () => {
      it('should show non-matching diff as unsatisfiable', () => {
        const cellB = new Cell(0, '4');
        const cellConnection = new CellConnection();
        cellConnection.type = ConstraintType.TWO_CELLS_EXACT_DIFFERENCE;
        cellConnection.difference = 2;
        cellConnection.otherCell = cellB;

        expect(cellConnection.isUnsatisfiableFor(2)).toBeFalse();
        expect(cellConnection.isUnsatisfiableFor(3)).toBeTrue();
        expect(cellConnection.isUnsatisfiableFor(4)).toBeTrue();
      });

      it('should show always satisfiable for non-solved otherCell', () => {
        const cellB = new Cell(0, '23');
        const cellConnection = new CellConnection();
        cellConnection.type = ConstraintType.TWO_CELLS_EXACT_DIFFERENCE;
        cellConnection.difference = 2;
        cellConnection.otherCell = cellB;

        expect(cellConnection.isUnsatisfiableFor(2)).toBeFalse();
        expect(cellConnection.isUnsatisfiableFor(3)).toBeFalse();
        expect(cellConnection.isUnsatisfiableFor(4)).toBeFalse();
      });
    });
  });

  describe('factor', () => {
    it('should initialize', () => {
      const cell = new Cell(0, '');
      const cellConnection = CellConnection.factor(cell, 3, true);
      expect(cellConnection.otherCell).toEqual(cell);
      expect(cellConnection.factor).toEqual(3);
      expect(cellConnection.unknownOrder).toEqual(true);
      expect(cellConnection.type).toEqual(ConstraintType.TWO_CELLS_EXACT_FACTOR);
    });

    describe('getPossibleValuesForOtherCell', () => {
      it('should calculate possibilities for known order', () => {
        const cellB = new Cell(0, '');
        const cellConnection = new CellConnection();
        cellConnection.type = ConstraintType.TWO_CELLS_EXACT_FACTOR;
        cellConnection.factor = 3;
        cellConnection.otherCell = cellB;

        const otherValues = cellConnection.getPossibleValuesForOtherCell(3);
        expect(otherValues).toEqual('9');
      });

      it('should calculate possibilities for unknown order', () => {
        const cellB = new Cell(0, '');
        const cellConnection = new CellConnection();
        cellConnection.type = ConstraintType.TWO_CELLS_EXACT_FACTOR;
        cellConnection.factor = 2;
        cellConnection.otherCell = cellB;
        cellConnection.unknownOrder = true;

        const otherValues = cellConnection.getPossibleValuesForOtherCell(8);
        expect(otherValues.length).toBe(1);
        expect(otherValues).toContain('4');

        expect(cellConnection.getPossibleValuesForOtherCell(4)).toContain('8');
      });

      it('should calculate possibilities for overflow', () => {
        const cellB = new Cell(0, '');
        const cellConnection = new CellConnection();
        cellConnection.type = ConstraintType.TWO_CELLS_EXACT_FACTOR;
        cellConnection.factor = 4;
        cellConnection.otherCell = cellB;
        cellConnection.unknownOrder = true;

        const otherValues = cellConnection.getPossibleValuesForOtherCell(4);
        expect(otherValues).toEqual('1');
      });

      it('should calculate possibilities for reverse cell', () => {
        const cellB = new Cell(0, '');
        const cellConnection = new CellConnection();
        cellConnection.type = ConstraintType.TWO_CELLS_EXACT_FACTOR;
        cellConnection.factor = 1 / 2;
        cellConnection.otherCell = cellB;
        cellConnection.unknownOrder = true;

        expect(cellConnection.getPossibleValuesForOtherCell(8)).toContain('4');
        expect(cellConnection.getPossibleValuesForOtherCell(4)).toContain('8');
      });
    });

    describe('isUnsatisfiableFor', () => {
      it('should show non-matching factor as unsatisfiable', () => {
        const cellB = new Cell(0, '6');
        const cellConnection = new CellConnection();
        cellConnection.type = ConstraintType.TWO_CELLS_EXACT_FACTOR;
        cellConnection.factor = 3;
        cellConnection.otherCell = cellB;

        expect(cellConnection.isUnsatisfiableFor(2)).toBeFalse();
        expect(cellConnection.isUnsatisfiableFor(3)).toBeTrue();
      });

      it('should show always satisfiable for non-solved otherCell', () => {
        const cellB = new Cell(0, '56');
        const cellConnection = new CellConnection();
        cellConnection.type = ConstraintType.TWO_CELLS_EXACT_FACTOR;
        cellConnection.factor = 3;
        cellConnection.otherCell = cellB;

        expect(cellConnection.isUnsatisfiableFor(2)).toBeFalse();
        expect(cellConnection.isUnsatisfiableFor(3)).toBeFalse();
      });
    });
  });

  describe('bigger/smaller', () => {
    it('should initialize', () => {
      const cell = new Cell(0, '');
      const cellConnection = CellConnection.biggerSmaller(cell, true);
      expect(cellConnection.otherCell).toEqual(cell);
      expect(cellConnection.bigger).toEqual(true);
      expect(cellConnection.type).toEqual(ConstraintType.TWO_CELLS_BIGGER_THAN);
    });

    describe('getPossibleValuesForOtherCell', () => {
      it('should calculate possibilities for known order', () => {
        const cellB = new Cell(0, '');
        const cellConnection = new CellConnection();
        cellConnection.type = ConstraintType.TWO_CELLS_BIGGER_THAN;
        cellConnection.bigger = true;
        cellConnection.otherCell = cellB;

        const otherValues = cellConnection.getPossibleValuesForOtherCell(5);
        expect(otherValues).toEqual('6789');
      });

      it('should calculate possibilities overflow', () => {
        const cellB = new Cell(0, '');
        const cellConnection = new CellConnection();
        cellConnection.type = ConstraintType.TWO_CELLS_BIGGER_THAN;
        cellConnection.bigger = false;
        cellConnection.otherCell = cellB;

        const otherValues = cellConnection.getPossibleValuesForOtherCell(1);
        expect(otherValues).toEqual('');
      });
    });

    describe('isUnsatisfiableFor', () => {
      it('should show unsatisfiable connection', () => {
        const cellB = new Cell(0, '4');
        const cellConnection = new CellConnection();
        cellConnection.type = ConstraintType.TWO_CELLS_BIGGER_THAN;
        cellConnection.bigger = false;
        cellConnection.otherCell = cellB;

        expect(cellConnection.isUnsatisfiableFor(3)).toBeTrue();
        expect(cellConnection.isUnsatisfiableFor(4)).toBeTrue();
        expect(cellConnection.isUnsatisfiableFor(5)).toBeFalse();
      });

      it('should show always satisfiable for non-solved otherCell', () => {
        const cellB = new Cell(0, '34');
        const cellConnection = new CellConnection();
        cellConnection.type = ConstraintType.TWO_CELLS_BIGGER_THAN;
        cellConnection.bigger = false;
        cellConnection.otherCell = cellB;

        expect(cellConnection.isUnsatisfiableFor(3)).toBeFalse();
        expect(cellConnection.isUnsatisfiableFor(4)).toBeFalse();
        expect(cellConnection.isUnsatisfiableFor(5)).toBeFalse();
      });
    });
  });
});
