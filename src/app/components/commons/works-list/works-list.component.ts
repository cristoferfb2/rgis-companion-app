import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Work } from 'src/app/class/Work';

@Component({
  selector: 'app-works-list',
  templateUrl: './works-list.component.html',
  styleUrls: ['./works-list.component.scss'],
})
export class WorksListComponent implements OnInit {
  @Input() works:  Array<Work>;
  
  constructor() { }

  ngOnInit() {}

  public getShortDate(date: Date): string {
    let momentDate = moment(date);

    return momentDate.format('DD-MM-YYYY HH:mm')
  }

  public prettyPrice (val: number): string {
    return parseInt(val.toString()).toLocaleString().replace(',', '.')
  }


}
