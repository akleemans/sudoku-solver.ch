export class Cell {
  public candidates: string;
  public peers: Cell[];
  public cellId: number;

  public constructor(cellId: number) {
    this.cellId = cellId;
  }

  public propagateToPeers(): void {
    if (this.candidates.length === 1) {
      for (let peer of this.peers) {
        peer.removeCandidate(this.candidates);
      }
    }
  }

  public removeCandidate(value: string): void {
    this.candidates.replace(value, '');
  }

  public toString(): string {
    return this.candidates.length === 1 ? this.candidates : ' ';
  }

  public valid(): boolean {
    return this.candidates.length >= 1;
  }

  public solved(): boolean {
    return this.candidates.length === 1;
  }
}


