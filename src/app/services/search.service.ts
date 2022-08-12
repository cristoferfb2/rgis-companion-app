import { Injectable } from '@angular/core';
import { MonthData } from '../class/MonthData';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  public date: Date;
  public data: MonthData;

  constructor(private dataService: DataService) { }

  public loadData (date: Date): Promise<void> {
    this.date = date;

    return new Promise((resolve, reject) =>{
      this.dataService.getMonth(date.getMonth()+1, date.getFullYear())
        .then(monthData=>{
          this.data = monthData;
          resolve();
        })
        .catch(err=>reject(err));
    })
  }

  public clean(): void {
    this.data = undefined;
    this.date = undefined;
  }

  public hasData(): boolean {
    if (this.data && this.date) return true
    return false;
  }
}
