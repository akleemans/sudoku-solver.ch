import * as _ from 'lodash';
import {Component, OnInit} from '@angular/core';
import {Sudoku} from "../model/sudoku";
import {Solver} from "../model/solver";
import {Constraint} from "../model/constraint";
import {ConstraintType} from "../model/constraint-type";

enum ViewMode {
  numbers,
  constraints
}

class GridCell {
  public cellId: number;
  public bgColor: string = 'white';
  public value: string = '';
  public calculated: boolean

  public constructor(cellId: number) {
    this.cellId = cellId;
  }
}

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
  public currentConstraint: Constraint = new Constraint();
  public constraints: Constraint[] = [];

  public constructor() {
  }

  public ngOnInit(): void {
    this.cells = _.range(81).map(i => new GridCell(i));
  }

  public setViewMode(viewMode: ViewMode): void {
    this.viewMode = viewMode;
  }

  public toggleSelection(cell: GridCell) {
    if (this.currentConstraint.cellIds.includes(cell.cellId)) {
      this.currentConstraint.cellIds = this.currentConstraint.cellIds.filter(c => c !== cell.cellId);
      cell.bgColor = 'white';
    } else {
      this.currentConstraint.cellIds.push(cell.cellId);
      cell.bgColor = this.currentConstraint.color;
    }
  }

  public addConstraint(): void {
    console.log('Adding constraint:', this.currentConstraint);
    this.constraints.push(this.currentConstraint);
    let savedType = this.currentConstraint.type;
    this.currentConstraint = new Constraint();
    this.currentConstraint.type = savedType;
    // TODO show constraint on cell differently (little color dot?)
    // this.resetSelection();
  }

  public deleteConstraint(constraint: Constraint): void {
    this.constraints = this.constraints.filter(c => c != constraint);
  }

  public clear(): void {
    this.cells.forEach(cell => cell.value = '');
  }

  public resetSelection(): void {
    this.cells.forEach(cell => cell.bgColor = 'white');
  }

  public solve(): void {
    this.resetSelection();
    const sudoku = new Sudoku(this.cells.map(c => c.value), this.constraints);
    const solvedSudoku = Solver.solve(sudoku);

    // TODO only adapt if Sudoku solved - if other status, update status message
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
