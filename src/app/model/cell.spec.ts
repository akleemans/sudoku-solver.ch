import {Cell} from './cell';

describe('Cell', () => {
  describe('initialisation', () => {
    it('should init with single candidate', () => {
      const knownCell = new Cell(0, '1');
      expect(knownCell.getCandidates()).toBe('1');
    });

    it('should set all candidates if not single value', () => {
      const allValues = '123456789';
      let unknownCell = new Cell(0, '12');
      expect(unknownCell.getCandidates()).toBe(allValues);

      unknownCell = new Cell(0, '');
      expect(unknownCell.getCandidates()).toBe(allValues);
    });
  });

  describe('isValid', () => {
    it('should recognize valid cell', () => {
      let knownCell = new Cell(0, '1');
      expect(knownCell.isValid()).toBeTrue();

      knownCell.setCandidates('12');
      expect(knownCell.isValid()).toBeTrue();

      knownCell = new Cell(0, '');
      expect(knownCell.isValid()).toBeTrue();
    });

    it('should recognize invalid cell', () => {
      const knownCell = new Cell(0, '1');
      knownCell.setCandidates('');
      expect(knownCell.isValid()).toBeFalse();
    });
  });

  describe('isSolved', () => {
    it('should recognize solved cell', () => {
      const knownCell = new Cell(0, '1');
      expect(knownCell.isSolved()).toBeTrue();

      knownCell.setCandidates('9');
      expect(knownCell.isSolved()).toBeTrue();
    });

    it('should recognize unsolved cell', () => {
      let knownCell = new Cell(0, '1');
      knownCell.setCandidates('');
      expect(knownCell.isSolved()).toBeFalse();

      knownCell.setCandidates('12');
      expect(knownCell.isSolved()).toBeFalse();

      knownCell = new Cell(0, '');
      expect(knownCell.isSolved()).toBeFalse();
    });
  });

  describe('removeCandidate', () => {
    it('should remove existing candidate', () => {
      const knownCell = new Cell(0, '1');
      knownCell.removeCandidates('1');
      expect(knownCell.getCandidates()).toBe('');

      knownCell.setCandidates('789');
      knownCell.removeCandidates('8');
      expect(knownCell.getCandidates()).toBe('79');

      knownCell.removeCandidates('8');
      expect(knownCell.getCandidates()).toBe('79');
    });

    it('should not do anything if not existing candidate', () => {
      const knownCell = new Cell(0, '1');
      knownCell.removeCandidates('2');
      expect(knownCell.getCandidates()).toBe('1');
    });
  });

  describe('toString', () => {
    it('should render normal number', () => {
      const knownCell = new Cell(0, '1');
      expect(knownCell.toString()).toBe('1');

      knownCell.setCandidates('7');
      expect(knownCell.toString()).toBe('7');
    });

    it('should render empty cell', () => {
      const knownCell = new Cell(0, '');
      knownCell.setCandidates('789');

      expect(knownCell.toString()).toBe(' ');
    });
  });

  describe('propagateToPeers', () => {
    it('should render normal number', () => {
      const knownCell = new Cell(0, '1');
      const otherCell = new Cell(1, '');
      knownCell.peers = [otherCell];
      otherCell.setCandidates('12');

      knownCell.propagateToPeers();
      expect(otherCell.getCandidates()).toBe('2');
    });
  });
});
