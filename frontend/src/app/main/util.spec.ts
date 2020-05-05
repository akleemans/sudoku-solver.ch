import {Util} from "./util";

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

  describe('getRandomColor', () => {
    it('should correctly count string occurences', () => {
      let color = Util.getRandomColor();

      expect(color.length).toBe(7);
      expect(color.startsWith('#')).toBeTrue();
      expect(color).not.toBe(Util.getRandomColor());
    });
  });
});
