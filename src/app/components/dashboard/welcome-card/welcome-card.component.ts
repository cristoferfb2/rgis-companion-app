import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-welcome-card',
  templateUrl: './welcome-card.component.html',
  styleUrls: ['./welcome-card.component.scss']
})
export class WelcomeCardComponent implements OnInit {

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
  }

  get userName () {
    const regex = new RegExp(/, (.*)/, 'g');
    const completeName = this.dataService.getUserName();
    const name = regex.exec(completeName)
    if (name && name[0])
      return name[1];
    return completeName;
  }

}
