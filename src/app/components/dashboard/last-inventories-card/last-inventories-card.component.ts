import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Work } from 'src/app/class/Work';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-last-inventories-card',
  templateUrl: './last-inventories-card.component.html',
  styleUrls: ['./last-inventories-card.component.scss']
})
export class LastInventoriesCardComponent implements OnInit {

  constructor(private dataService:DataService) { }

  ngOnInit(): void {
  }

  get lastWorks (): Array<Work> {
    const data = this.dataService.getData();
    let last = data[0].works;
    last = last.concat(data[1].works);
  
    return last.slice(0, 5);
  }

  public getShortDate(date: Date): string {
    let momentDate = moment(date);

    return momentDate.format('DD-MM-YYYY HH:mm')
  }

  public prettyPrice (val: number): string {
    return parseInt(val.toString()).toLocaleString().replace(',', '.')
  }

}
