import {Cell} from './cell';
import {ProductUnit} from './product-unit';

fdescribe('Product unit', () => {
  describe('isValid', () => {
    it('should recognize valid product unit', () => {
      const productUnit = new ProductUnit([
        new Cell(0, '5'),
        new Cell(0, '789')
      ], 5);

      expect(productUnit.isValid()).toBeTrue();
    });

    it('should recognize invalid sum unit', () => {
      const productUnit = new ProductUnit([
        new Cell(0, '5'),
        new Cell(0, '6'),
        new Cell(0, '789')
      ], 29);

      expect(productUnit.isValid()).toBeFalse();
    });
  });

  describe('isSolved', () => {
    it('should recognize unsolved sum unit', () => {
      const productUnit = new ProductUnit([
        new Cell(0, '5'),
        new Cell(0, '789')
      ], 14);

      expect(productUnit.isSolved()).toBeFalse();
    });

    it('should recognize solved sum unit', () => {
      const productUnit = new ProductUnit([
        new Cell(0, '5'),
        new Cell(0, '9')
      ], 45);

      expect(productUnit.isSolved()).toBeTrue();
    });
  });
});
