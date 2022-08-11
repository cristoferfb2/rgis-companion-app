import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit, OnDestroy {
  private dataSub!: Subscription;

  constructor(private dataService: DataService, private router: Router) { }


  ngOnInit(): void {
    if (this.dataService.hasData) {

      return
    }

    this.dataSub = this.dataService.getUserData().subscribe(data=> {
      this.dataService.setData(data);
      this.router.navigateByUrl('');
    });
  }

  ngOnDestroy(): void {
    if (this.dataSub)
      this.dataSub.unsubscribe();
  }
}
