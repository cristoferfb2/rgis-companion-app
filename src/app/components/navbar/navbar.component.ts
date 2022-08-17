import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { BackButtonService } from 'src/app/services/back-button.service';
import { LogoutModalComponent } from './logout-modal/logout-modal.component';
import { SearchModalComponent } from './search-modal/search-modal.component';
import { NativePageTransitions } from '@awesome-cordova-plugins/native-page-transitions/ngx';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  constructor(
    private modalService: NgbModal, 
    private router: Router, 
    private backButtonService: BackButtonService,
    private nativePageTransitions: NativePageTransitions,
    private dataService: DataService
  ) { }

  ngOnInit(): void {
  }

  public isSearch (): boolean {
    return this.router.url.includes('search');
  }

  public search (): void {
    const modalRef = this.modalService.open(SearchModalComponent);
    this.backButtonService.modal = modalRef;
    modalRef.closed
      .subscribe(month => {
        this.nativePageTransitions.slide({direction: 'left'});
        this.router.navigate(['/loading'], { 
          queryParams: {
            date:  moment(month).format('DD-MM-YYYY')
          }
        })
        this.backButtonService.modal = undefined;
      });
  }

  public back (): void {
    this.nativePageTransitions.slide({direction: 'right'});
    this.router.navigate(['/']);
  }

  public signout(): void {
    const modalRef = this.modalService.open(LogoutModalComponent);
    modalRef.closed.subscribe(response=> {
      if (response) {
        this.dataService.clear();
        this.nativePageTransitions.slide({direction: 'right'});
        this.router.navigate(['/login'])
      }
    });
  }
}
