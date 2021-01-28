import {CellConnection} from './cell-connection';

export class Cell {
  private candidates: string;
  public peers: Cell[];
  public cellId: number;
  private allCandidates: string = '123456789';
  private cellConnections: CellConnection[] = [];

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

      for (const cellConnection of this.cellConnections) {
        cellConnection.otherCell.removeAllExcept(cellConnection.getPossibleValuesForOtherCell(+this.candidates));
      }
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
   * Remove all candidates except for given values.
   */
  public removeAllExcept(value: string): void {
    let base = '123456789';
    for (const v of value) {
      base = base.replace(v, '');
    }
    this.removeCandidates(base);
  }

  /**
   * Remove one or more candidates.
   */
  public removeCandidates(values: string): void {
    for (let i = 0; i < values.length; i++) {
      this.candidates = this.candidates.replace(values[i], '');
    }
  }

  public getCellConnections(): CellConnection[] {
    return this.cellConnections;
  }

  public addCellConnection(cellConnection: CellConnection) {
    this.cellConnections.push(cellConnection);
  }

  public toString(): string {
    return this.candidates.length === 1 ? this.candidates : ' ';
  }

  public isValid(): boolean {
    if (this.candidates.length === 0) {
      return false;
    }

    // Check cellConnections
    if (this.isSolved()) {
      for (let cellConnection of this.cellConnections) {
        if (cellConnection.isUnsatisfiableFor(+this.candidates)) {
          return false;
        }
      }
    }

    return true;
  }

  public isSolved(): boolean {
    return this.candidates.length === 1;
  }
}


