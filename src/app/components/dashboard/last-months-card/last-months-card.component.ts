import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import * as moment from 'moment';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-last-months-card',
  templateUrl: './last-months-card.component.html',
  styleUrls: ['./last-months-card.component.scss']
})
export class LastMonthsCardComponent implements OnInit {
  public  chartImage: undefined | string;

  public chartOptions: any = {
    plugins: {
      legend: {
        display: false
      },
      datalabels: {
        color: 'white'
      }
    },
    scales: {
      y: {
        display: false
      }
    },
    animation: {
      onComplete: ()=> this.chartToImg()
    },
    events: []
  };

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
  }

  get historyIncome (): any {
    const data = this.dataService.getData();
    var history: number[] = [];
    for (let i=5-1; i>=0; i--)
      history.push(data[i].total);

    var labels: string[] = [];
    for (let i=5; i>0; i--)
      labels.push(moment().add(-i, 'months').format('MMMM'));

    return {
      labels,
      datasets: [{
        label: 'Ingresos',
        data: history,
        backgroundColor: '#990033'
      }],
      skipNull: true
    };
  }

  private chartToImg () {
    let chart = document.getElementsByTagName('canvas')[0];
    this.chartImage = chart.toDataURL();
  }

}
