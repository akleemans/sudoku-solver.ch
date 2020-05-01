import {randomColor} from 'randomcolor';

export class Util {
  public static count(str: string, value: string) {
    const regExp = new RegExp(value, 'gi');
    return (str.match(regExp) || []).length;
  }

  public static getRandomColor(): string {
    return randomColor();
  }
}
