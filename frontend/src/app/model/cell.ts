export class Cell {
  public candidates: string;
  public peers: Cell[];
  public cellId: number;

  public constructor(cellId: number, c: string) {
    this.cellId = cellId;
    this.candidates = c.length === 1 ? c : '123456789';
  }

  public propagateToPeers(): void {
    if (this.candidates.length === 1) {
      for (let peer of this.peers) {
        peer.removeCandidate(this.candidates);
      }
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


