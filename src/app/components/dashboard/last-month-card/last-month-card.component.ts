import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-last-month-card',
  templateUrl: './last-month-card.component.html',
  styleUrls: ['./last-month-card.component.scss']
})
export class LastMonthCardComponent implements OnInit {

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
  }

  get incomeLastMonth (): string {
    const today = new Date();
    let lastMonth = today.getMonth() - 1;
    let year = today.getFullYear();
    if (lastMonth < 1) {
      lastMonth = 12;
      year--;
    }
    const data = this.dataService.getData();
    let lastMonthData = data.filter(el => el.month == lastMonth && el.year == year)[0];

    if (!lastMonth) return '0';
    else return lastMonthData.total.toLocaleString().replace(',', '.')
  }

}
