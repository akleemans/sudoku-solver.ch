import {Util} from './util';
import {Cell} from './cell';

describe('Util', () => {
  describe('count', () => {
    it('should correctly count string occurences', () => {
      expect(Util.count('4555566556', '5')).toBe(6);
      expect(Util.count('4555566556', '4')).toBe(1);
      expect(Util.count('4555566556', '6')).toBe(3);
    });

    it('should correctly count zero occurence', () => {
      expect(Util.count('', '1')).toBe(0);
      expect(Util.count('23456789', '1')).toBe(0);
    });
  });

  describe('replaceAll', () => {
    it('should creplace standard chars', () => {
      expect(Util.replaceAll('4564', '4', '6')).toBe('6566');
      expect(Util.replaceAll('5', '6', '4')).toBe('5');
      expect(Util.replaceAll('', '6', '4')).toBe('');
    });

    it('should replace special chars', () => {
      expect(Util.replaceAll('   ', ' ', '.')).toBe('...');
    });
  });

  describe('getRandomColor', () => {
    it('should correctly count string occurences', () => {
      const color = Util.getRandomColor();

      expect(color.length).toBe(7);
      expect(color.startsWith('#')).toBeTrue();
      expect(color).not.toBe(Util.getRandomColor());
    });
  });

  describe('getValueSum', () => {
    it('should correctly sum up filled cells', () => {
      const cells = [
        new Cell(0, '1'),
        new Cell(1, '2'),
        new Cell(2, ''),
      ];
      expect(Util.getValueSum(cells)).toBe(3);

      cells[2].candidates = '7';
      expect(Util.getValueSum(cells)).toBe(10);
    });

    it('should return 0 of no filled cells', () => {
      const cells = [
        new Cell(0, ''),
      ];
      expect(Util.getValueSum(cells)).toBe(0);
    });
  });

  describe('allFilled', () => {
    it('should return true if all cells are filled', () => {
      const cells = [
        new Cell(0, '1'),
        new Cell(1, '2'),
        new Cell(2, '4'),
      ];
      expect(Util.allFilled(cells)).toBeTrue();
    });

    it('should return false if some cells are not filled', () => {
      const cells = [
        new Cell(0, '1'),
        new Cell(1, '2'),
        new Cell(2, ''),
      ];
      expect(Util.allFilled(cells)).toBeFalse();
    });
  });

  describe('containsDuplicates', () => {
    it('should return false on unique cells', () => {
      const cells = [
        new Cell(0, '1'),
        new Cell(1, '2'),
        new Cell(2, '4'),
      ];
      expect(Util.containsDuplicates(cells)).toBeFalse();
    });

    it('should return false on unique cells with empty values', () => {
      const cells = [
        new Cell(0, '1'),
        new Cell(1, ''),
        new Cell(2, ''),
      ];
      expect(Util.containsDuplicates(cells)).toBeFalse();
    });

    it('should return true on duplicates', () => {
      const cells = [
        new Cell(0, '1'),
        new Cell(1, '2'),
        new Cell(2, '1'),
      ];
      expect(Util.containsDuplicates(cells)).toBeTrue();
    });

    it('should return false on candidates', () => {
      const cells = [
        new Cell(0, '12'),
        new Cell(1, '12'),
      ];
      expect(Util.containsDuplicates(cells)).toBeFalse();
    });
  });
});
