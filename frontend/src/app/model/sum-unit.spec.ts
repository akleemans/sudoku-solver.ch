import {Cell} from "./cell";
import {SumUnit} from "./sum-unit";

describe('Sum unit', () => {
  describe('isValid', () => {
    it('should recognize valid sum unit', () => {
      let sumUnit = new SumUnit([
        new Cell(0, '5'),
        new Cell(0, '789')
      ], 14);

      expect(sumUnit.isValid()).toBeTrue();
    });

    it('should recognize invalid sum unit', () => {
      let sumUnit = new SumUnit([
        new Cell(0, '5'),
        new Cell(0, '789')
      ], 15);

      expect(sumUnit.isValid()).toBeFalse();
    });
  });

  describe('isSolved', () => {
    it('should recognize unsolved sum unit', () => {
      let sumUnit = new SumUnit([
        new Cell(0, '5'),
        new Cell(0, '789')
      ], 14);

      expect(sumUnit.isSolved()).toBeFalse();
    });

    it('should recognize solved sum unit', () => {
      let sumUnit = new SumUnit([
        new Cell(0, '5'),
        new Cell(0, '9')
      ], 14);

      expect(sumUnit.isSolved()).toBeTrue();
    });
  });
});
