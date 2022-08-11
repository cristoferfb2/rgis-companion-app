import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
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
  
  constructor(private route: ActivatedRoute, private dataService: DataService) { }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(data => this.loadData(moment(data.date, 'DD-MM-YYYY').toDate()));
  }

  loadData (date: Date) {
    this.date = date;
    this.dataService.getMonth(date.getMonth()+1, date.getFullYear())
      .then(monthData=>{
        this.monthData = monthData;
      }).catch(err=>console.log(err))
  }

  formatDate (date: Date) {
    return moment(date).format('DD/MM/YY');
  }

  formatMoney (val: number, header: boolean = false): string {
    let prefix= '';
    if (!header) prefix += '$'
    return prefix + parseInt(val.toString()).toLocaleString().replace(',', '.');
  }

  onRowClick (row: any) {
    console.log(row);
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
