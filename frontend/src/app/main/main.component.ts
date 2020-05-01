import {randomColor} from 'randomcolor';
import {Component, OnInit} from '@angular/core';

enum ViewMode {
  numbers,
  constraints
}

enum ConstraintType {
  SINGLE_ODD_EVEN,
  TWO_BIGGER_SMALLER,
  TWO_
}


/*
* Single cell constraints:
	* Cell is odd/even
* 2-cell value constraints:
	* Cell A is bigger than B
	* Cell A is [exactly X (1-9)] bigger than B
	* Cell A is factor 2/3/4 as big as B
* 2+ cell constraints:
 * Cells form a complete 1-9 unit
 * Cells form sum of X
 * Cells form product of X
 */

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  public ViewMode: typeof ViewMode = ViewMode;
  public viewMode: ViewMode = ViewMode.numbers;

  public cellNumbers: number[];
  public cells: string[] = [];

  public selectionColor: string;
  public selectedCells: number[] = [];

  public constructor() {
  }

  public ngOnInit(): void {
    this.cellNumbers = Array(81).fill(1).map((x, i) => i);
    this.selectionColor = this.getRandomColor();
  }

  public setViewMode(viewMode: ViewMode): void {
    this.viewMode = viewMode;
  }

  public toggleSelection(id: number) {
    if (this.selectedCells.includes(id)) {
      this.selectedCells = this.selectedCells.filter(c => c != id);
    } else {
      this.selectedCells.push(id);
    }
  }

  public addConstraint(): void {
    console.log('ok');
  }

  public solve(): void {
    // const sudoku = new Sudoku(this.cells);
    // Solver.solve(sudoku);

    // Create a new worker
    const worker = new Worker('./main.worker', {type: 'module'});
    worker.onmessage = ({data}) => {
      console.log(`Page got message: ${data}!`);
    };
    console.log('Posting hello to worker...');
    worker.postMessage('hello');
  }

  private getRandomColor(): string {
    return randomColor();
  }
}
