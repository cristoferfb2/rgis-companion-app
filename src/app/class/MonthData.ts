import { Work } from "./Work";

export class MonthData {
    month: number = 0;
    year : number = 0;
    hours: number = 0;
    total: number = 0;
    works: Array<Work> = new Array();
  }