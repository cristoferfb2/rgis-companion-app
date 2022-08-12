import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { SearchService } from 'src/app/services/search.service';
import { MonthData } from '../../class/MonthData';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  public monthData!: MonthData;
  public date!: Date;
  public displayedColumns = ['customer', 'dateIn', 'total', 'actions'];
  
  constructor(private searchService: SearchService) { }

  ngOnInit(): void {
    this.monthData = this.searchService.data;
    this.date = this.searchService.date;
    this.searchService.clean();
  }

  formatDate (date: Date) {
    return moment(date).format('DD/MM/YY');
  }

  formatMoney (val: number, header: boolean = false): string {
    let prefix= '';
    if (!header) prefix += '$'
    return prefix + parseInt(val.toString()).toLocaleString().replace(',', '.');
  }

  get dateMonth () {
      if (!this.date) return ''
      let result = moment(this.date).format('MMMM [de]');
      return result[0].toUpperCase() + result.slice(1);;
  }

  get dateYear () {
    if (!this.date) return ''
    return this.date.getFullYear();
}
}
