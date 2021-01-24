import {Cell} from './cell';
import {ProductUnit} from './product-unit';

describe('Product unit', () => {
  describe('isValid', () => {
    it('should recognize valid product unit', () => {
      const productUnit = new ProductUnit([
        new Cell(0, '5'),
        new Cell(1, '139')
      ], 5);

      expect(productUnit.isValid()).toBeTrue();
    });

    it('should recognize invalid product unit', () => {
      const productUnit = new ProductUnit([
        new Cell(0, '5'),
        new Cell(1, '6'),
        new Cell(2, '789')
      ], 29);

      expect(productUnit.isValid()).toBeFalse();
    });

    it('should recognize unsolvable (=invalid) product unit, product too big', () => {
      const productUnit = new ProductUnit([
        new Cell(0, '1'),
        new Cell(1, '123456789'),
      ], 24);

      expect(productUnit.isValid()).toBeFalse();
    });

    it('should recognize unsolvable (=invalid) product unit, no whole number', () => {
      const productUnit = new ProductUnit([
        new Cell(0, '5'),
        new Cell(1, '123456789'),
      ], 14);

      expect(productUnit.isValid()).toBeFalse();
    });

    it('should recognize unsolvable (=invalid) product unit', () => {
      const productUnit = new ProductUnit([
        new Cell(0, '9'),
        new Cell(1, '123456789'),
      ], 3);

      expect(productUnit.isValid()).toBeFalse();
    });

    it('should recognize solvable/valid product unit', () => {
      const productUnit = new ProductUnit([
        new Cell(0, '5'),
        new Cell(1, '123'),
      ], 15);
      productUnit.cells[1].setCandidates('123');

      expect(productUnit.isValid()).toBeTrue();
    });

    it('should recognize solvable/valid product unit, missing candidates', () => {
      const productUnit = new ProductUnit([
        new Cell(0, '5'),
        new Cell(1, '12'),
      ], 15);
      productUnit.cells[1].setCandidates('12');

      expect(productUnit.isValid()).toBeFalse();
    });
  });

  describe('isSolved', () => {
    it('should recognize unsolved product unit', () => {
      const productUnit = new ProductUnit([
        new Cell(0, '5'),
        new Cell(1, '123456789')
      ], 14);

      expect(productUnit.isSolved()).toBeFalse();
    });

    it('should recognize solved product unit', () => {
      const productUnit = new ProductUnit([
        new Cell(0, '5'),
        new Cell(1, '9')
      ], 45);

      expect(productUnit.isSolved()).toBeTrue();
    });
  });

  describe('propagate', () => {
    it('should solve missing number via propagation', () => {
      const productUnit = new ProductUnit([
        new Cell(0, '5'),
        new Cell(1, '123456789')
      ], 15);

      productUnit.propagate();

      expect(productUnit.isSolved()).toBeTrue();
    });

    it('should not draw false conclusion via propagate', () => {
      const productUnit = new ProductUnit([
        new Cell(0, '5'),
        new Cell(1, '123456789')
      ], 14);

      productUnit.propagate();

      expect(productUnit.isSolved()).toBeFalse();
    });
  });
});
