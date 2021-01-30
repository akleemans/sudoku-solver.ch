import * as _ from 'lodash';
import {Component, OnInit} from '@angular/core';
import {Constraint} from '../model/constraint';
import {ConstraintType} from '../model/constraint-type';
import {WorkerMessage, WorkerStatus} from '../model/worker-message';
import {SudokuOptions} from '../model/sudoku-options';
import {HttpClient} from '@angular/common/http';

enum ViewMode {
  numbers,
  constraints,
  solving
}

class GridCell {
  public cellId: number;
  public value: string = '';
  public calculated: boolean;
  public bgColor: string = 'white';
  public colors: string[] = [];

  public constructor(cellId: number) {
    this.cellId = cellId;
  }
}

interface VisitorResponse {
  visitorsMonth: number
  visitorsTotal: number
}

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  public viewModeEnum: typeof ViewMode = ViewMode;
  public constraintTypeEnum: typeof ConstraintType = ConstraintType;

  public viewMode: ViewMode = ViewMode.numbers;
  public cells: GridCell[] = [];
  public currentConstraint: Constraint = new Constraint();
  public constraints: Constraint[] = [];
  public useBlockUnits = true;

  public status: string = '';
  public solvingInProgress = false;

  public visitors: VisitorResponse;

  public constructor(private readonly http: HttpClient) {
  }

  public ngOnInit(): void {
    this.cells = _.range(81).map(i => new GridCell(i));

    const sudokuStr = '.1......86....57..3....6.4.8...4.27.........5.74.6.....3.....9...79.....2...1..5.';
    for (const i of _.range(81)) {
      this.cells[i].value = (sudokuStr[i] === '.' ? '' : sudokuStr[i]);
    }

    this.fetchVisitorCount();
  }

  public setViewMode(viewMode: ViewMode): void {
    if (this.viewMode === ViewMode.solving) {
      this.clearAll();
    }
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
    const savedType = this.currentConstraint.type;
    // On every marked cell, add color dot
    this.cells.filter(c => this.currentConstraint.cellIds.includes(c.cellId))
      .forEach(c => c.colors.push(this.currentConstraint.color));

    this.currentConstraint = new Constraint();
    this.currentConstraint.type = savedType;
    this.resetSelection();
  }

  public deleteConstraint(constraint: Constraint): void {
    this.constraints = this.constraints.filter(c => c !== constraint);
    this.cells.forEach(c => c.colors = c.colors.filter(col => col !== constraint.color));
  }

  public clearCells(): void {
    this.cells.forEach(cell => {
      cell.value = '';
      cell.colors = [];
    });
    this.viewMode = ViewMode.numbers;
  }

  public clearConstraints(): void {
    this.constraints = [];
  }

  public clearAll(): void {
    this.clearCells();
    this.clearConstraints();
  }

  public resetSelection(): void {
    this.cells.forEach(cell => cell.bgColor = 'white');
  }

  public solve(): void {
    this.resetSelection();
    this.setViewMode(ViewMode.solving);
    this.status = 'Solving...';
    this.solvingInProgress = true;
    // Create a new worker
    const worker = new Worker('./main.worker', {type: 'module'});
    worker.onmessage = event => {
      console.log(`MainComponent got worker message: ${event.data}!`);
      const message: WorkerMessage = event.data;
      switch (message.status) {
        case WorkerStatus.SOLVED:
          this.adaptSolution(message.content);
          this.status = $localize`Solved!`;
          this.solvingInProgress = false;
          worker.terminate();
          break;
        case WorkerStatus.SOLVING:
          this.status = $localize`Solving: ` + message.content;
          break;
        case WorkerStatus.INVALID:
        case WorkerStatus.UNSOLVABLE:
          worker.terminate();
          this.solvingInProgress = false;
          this.status = $localize`Sudoku not solvable!`;
          break;
      }
    };
    const sudokuOptions: SudokuOptions = {
      cells: this.cells.map(c => c.value),
      constraints: this.constraints,
      globalOptions: {
        useBlockUnits: true
      }
    };
    worker.postMessage(sudokuOptions);
  }

  private adaptSolution(sudokuStr: string): void {
    // Set values on cells
    for (const i of _.range(81)) {
      const cell = this.cells[i];
      if (cell.value === '') {
        cell.calculated = true;
        cell.value = sudokuStr[i];
      }
    }
  }

  private fetchVisitorCount(): void {
    this.http.get('https://akleemans.pythonanywhere.com/api/visitors')
      .subscribe((visitorResponse: VisitorResponse) => this.visitors = visitorResponse);
  }
}
