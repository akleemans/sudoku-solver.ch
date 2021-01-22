import {ConstraintType} from './constraint-type';
import {Util} from './util';

export class Constraint {
  public type: ConstraintType;
  public cellIds: number[] = [];
  public color: string;

  // Used for SINGLE_CELL_ODD_EVEN
  public isEven: boolean = true;

  // Used for MULTI_CELL_SUM
  public sum: number;

  // Used for TWO_CELLS_EXACT_DIFFERENCE
  public difference: number;

  // Used for TWO_CELLS_EXACT_FACTOR
  public factor: number;

  // Used for TWO_CELLS_EXACT_DIFFERENCE, TWO_CELLS_EXACT_FACTOR
  // TODO maybe not used, so remove first?
  public unknownOrder: boolean;

  // Used for MULTI_CELL_PRODUCT
  public product;

  // Used for MULTI_CELL_SUM (Killer Sudoku)
  public noDuplicates: boolean = false;

  public constructor() {
    this.color = Util.getRandomColor();
  }

  public toString(): string {
    const cellStr = this.cellIds.map(c => c.toString()).join(', ');
    let desc = '';
    switch (this.type) {
      case ConstraintType.SINGLE_CELL_ODD_EVEN:
        desc = 'Cells ' + cellStr;
        if (this.isEven) {
          desc += ' must be even';
        } else {
          desc += ' must be odd';
        }
        break;

      case ConstraintType.MULTI_CELL_SUM:
        desc = 'Cells ' + cellStr + ' must add up to ' + this.sum;
        break;

      case ConstraintType.MULTI_CELL_UNIT:
        desc = 'Cells ' + cellStr + ' form a unit';
        break;
      case ConstraintType.MULTI_CELL_PRODUCT:
        desc = 'Cells ' + cellStr + ' must multiply to ' + this.product;
        break;
      case ConstraintType.TWO_CELLS_BIGGER_THAN:
        desc = 'First cell of ' + cellStr + ' is bigger than second';
        break;
      case ConstraintType.TWO_CELLS_EXACT_DIFFERENCE:
        desc = 'Cells ' + cellStr + ' have difference of ' + this.difference;
        break;
      case ConstraintType.TWO_CELLS_EXACT_FACTOR:
        desc = 'Cells ' + cellStr + ' have factor of ' + this.factor;
        break;
    }
    return desc;
  }
}
