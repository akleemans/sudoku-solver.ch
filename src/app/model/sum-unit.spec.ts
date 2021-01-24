import {Cell} from './cell';
import {SumUnit} from './sum-unit';

describe('Sum unit', () => {
  describe('isValid', () => {
    it('should recognize valid sum unit', () => {
      const sumUnit = new SumUnit([
        new Cell(0, '5'),
        new Cell(1, '789')
      ], 14, false);

      expect(sumUnit.isValid()).toBeTrue();
    });

    it('should recognize invalid sum unit', () => {
      const sumUnit = new SumUnit([
        new Cell(0, '5'),
        new Cell(1, '789')
      ], 15, false);

      expect(sumUnit.isValid()).toBeFalse();
    });
  });

  describe('isSolved', () => {
    it('should recognize unsolved sum unit', () => {
      const sumUnit = new SumUnit([
        new Cell(0, '5'),
        new Cell(1, '789')
      ], 14, false);

      expect(sumUnit.isSolved()).toBeFalse();
    });

    it('should recognize solved sum unit', () => {
      const sumUnit = new SumUnit([
        new Cell(0, '5'),
        new Cell(1, '9')
      ], 14, false);

      expect(sumUnit.isSolved()).toBeTrue();
    });

    it('should recognize unsolved sum unit, because of duplicate constraint', () => {
      const sumUnit = new SumUnit([
        new Cell(0, '5'),
        new Cell(1, '5')
      ], 10, true);

      expect(sumUnit.isSolved()).toBeFalse();
    });
  });
});
