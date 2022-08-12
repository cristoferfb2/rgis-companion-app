import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { SearchService } from 'src/app/services/search.service';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit, OnDestroy {
  private dataSub!: Subscription;

  constructor(
    private dataService: DataService, 
    private router: Router, 
    private route: ActivatedRoute,
    private searchService: SearchService
  ) { }


  ngOnInit(): void {


    if (this.dataService.hasData) {
      this.route.queryParams
        .subscribe(data => 
          this.searchService.loadData(moment(data.date, 'DD-MM-YYYY').toDate())
            .then(()=>{
              this.router.navigateByUrl('search');
            })
            .catch(err=>console.log(err))
        );
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
