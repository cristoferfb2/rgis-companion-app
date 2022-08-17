import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-last-month-card',
  templateUrl: './last-month-card.component.html',
  styleUrls: ['./last-month-card.component.scss']
})
export class LastMonthCardComponent implements OnInit {
  public delta: number = -10;
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

  get deltaLastMonth(): string {
    let lastMonth = parseInt(this.incomeLastMonth.replace('.', ''));

    const today = new Date();
    let previusTolastMonth = today.getMonth() - 1;
    let year = today.getFullYear();
    if (previusTolastMonth < 1) {
      previusTolastMonth = 12;
      year--;
    }
    const data = this.dataService.getData();
    let previusTolastMonthData = data.filter(el => el.month == previusTolastMonth && el.year == year)[0];

    if (!previusTolastMonthData) return '0';

    let previusToLastMonthTotal = previusTolastMonthData.total;

    if (previusToLastMonthTotal == 0) return '100';
    let delta = lastMonth * 100 / previusToLastMonthTotal - 100;

    return delta.toFixed(0);
  }
}
