import * as _ from 'lodash';
import {Component, OnInit} from '@angular/core';
import {Cell} from "../model/cell";
import {Sudoku} from "../model/sudoku";
import {Solver} from "../model/solver";
import {Util} from "./util";

enum ViewMode {
  numbers,
  constraints
}

class GridCell {
  public bgColor: string = 'white';
  public value: string = '';
  public calculated: boolean
}

enum ConstraintType {
  SINGLE_CELL_ODD_EVEN,
  TWO_CELLS_BIGGER_THAN,
  TWO_CELLS_EXACT_DIFFERENCE,
  TWO_CELLS_EXACT_FACTOR,
  MULTI_CELL_UNIT,
  MULTI_CELL_SUM,
  MULTI_CELL_PRODUCT
}

class Constraint {
  public type: ConstraintType;
  public cells: Cell[];
  // Used for MULTI_CELL_SUM,
  public sum: number;

  // Used for TWO_CELLS_EXACT_DIFFERENCE
  public difference: number;

  // Used for TWO_CELLS_EXACT_FACTOR
  public factor;

  // Used for MULTI_CELL_PRODUCT
  public product;
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
  public ConstraintType: typeof ConstraintType = ConstraintType;

  public viewMode: ViewMode = ViewMode.numbers;

  public cells: GridCell[] = [];

  public selectionColor: string;
  public selectedCells: GridCell[] = [];
  public selectedType: ConstraintType;

  public constraints: Constraint[];

  public constructor() {
  }

  public ngOnInit(): void {
    this.cells = _.range(81).map(i => new GridCell());
    this.selectionColor = Util.getRandomColor();

    // init with sudoku
    let sudokuStr = '7.18.43.......2.....453..7.6.....7..1...9...5..8.....38...195....23........6.89.4';
    for (let i of _.range(81)) {
      this.cells[i].value = sudokuStr[i] === '.' ? '' : sudokuStr[i];
    }
  }

  public setViewMode(viewMode: ViewMode): void {
    this.viewMode = viewMode;
  }

  public toggleSelection(cell: GridCell) {
    if (this.selectedCells.includes(cell)) {
      this.selectedCells = this.selectedCells.filter(c => c !== cell);
      cell.bgColor = 'white';
    } else {
      this.selectedCells.push(cell);
      cell.bgColor = this.selectionColor;
    }
  }

  public addConstraint(): void {
    // TODO
    console.log('ok');
    this.constraints.push();

    this.resetSelection();
    this.selectionColor = Util.getRandomColor();
  }

  public clear(): void {
    this.cells.forEach(cell => cell.value = '');
  }

  public resetSelection(): void {
    this.cells.forEach(cell => cell.bgColor = 'white');
    this.selectedCells = [];
  }

  public solve(): void {
    this.resetSelection();

    const sudoku = new Sudoku(this.cells.map(c => c.value));
    const solvedSudoku = Solver.solve(sudoku);
    this.adaptSolution(solvedSudoku);

    // Create a new worker
    const worker = new Worker('./main.worker', {type: 'module'});
    worker.onmessage = ({data}) => {
      console.log(`Page got message: ${data}!`);
      worker.terminate();
    };
    console.log('Posting hello to worker...');
    worker.postMessage('hello');
  }

  private adaptSolution(sudoku: Sudoku): void {
    // Set values on cells
    for (let i of _.range(81)) {
      let cell = this.cells[i];
      if (cell.value === '') {
        cell.calculated = true;
        cell.value = sudoku.cells[i].candidates;
      }
    }
  }
}
