export class Cell {
  private candidates: string;
  public peers: Cell[];
  public cellId: number;
  private allCandidates: string = '123456789';

  public constructor(cellId: number, c: string, isEven?: boolean) {
    this.cellId = cellId;
    if (isEven !== undefined) {
      this.allCandidates = isEven ? '2468' : '13579';
    }
    // Reset candidates if cell was not yet set definitively
    this.candidates = (c.length === 1 ? c : this.allCandidates);
  }

  public propagateToPeers(): void {
    if (this.candidates.length === 1) {
      for (const peer of this.peers) {
        peer.removeCandidates(this.candidates);
      }

      // TODO do propagation of greater/less than (exact or not)
      // we can also remove bigger / smaller numbers
    }
  }

  public getCandidates(): string {
    return this.candidates;
  }

  /**
   * Sets candidates directly.
   * This should only be used on (1) guessing and (2) resetting state,
   * for all regular actions use removeCandidates / removeAllExcept!
   */
  public setCandidates(candidates: string): void {
    this.candidates = candidates;
  }

  /**
   * Remove all candidates except for given value.
   */
  public removeAllExcept(value: string): void {
    this.removeCandidates('123456789'.replace(value, ''));
  }

  /**
   * Remove one or more candidates.
   */
  public removeCandidates(values: string): void {
    for (let i = 0; i < values.length; i++) {
      this.candidates = this.candidates.replace(values[i], '');
    }
  }

  public toString(): string {
    return this.candidates.length === 1 ? this.candidates : ' ';
  }

  public isValid(): boolean {
    return this.candidates.length >= 1;
  }

  public isSolved(): boolean {
    return this.candidates.length === 1;
  }
}


