import {Component, Inject, LOCALE_ID} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public constructor(@Inject(LOCALE_ID) public readonly locale: string) {
  }

  public changeLocale(newLocale: string): void {
    if (newLocale === 'en') {
      window.open('https://www.sudoku-solver.ch/', '_self');
    } else {
      window.open('https://www.sudoku-solver.ch/de/', '_self');
    }
  }
}
