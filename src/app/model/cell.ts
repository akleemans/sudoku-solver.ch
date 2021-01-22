export class Cell {
  public candidates: string;
  public peers: Cell[];
  public cellId: number;
  private allCandidates: string = '123456789';

  public constructor(cellId: number, c: string, isEven?: boolean) {
    this.cellId = cellId;
    if (isEven !== undefined) {
      this.allCandidates = isEven ? '2468' : '13579';
    }
    this.candidates = (c.length === 1 ? c : this.allCandidates);
  }

  public propagateToPeers(): void {
    if (this.candidates.length === 1) {
      for (const peer of this.peers) {
        peer.removeCandidate(this.candidates);
      }

      // TODO do propagation of greater/less than (exact or not)
      // we can also remove bigger / smaller numbers
    }
  }

  public removeCandidate(value: string): void {
    this.candidates = this.candidates.replace(value, '');
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


