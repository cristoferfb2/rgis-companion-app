import { AfterViewInit, Component, Host, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { MatCalendar, MatDatepicker } from '@angular/material/datepicker';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { BackButtonService } from 'src/app/services/back-button.service';
import { LogoutModalComponent } from './logout-modal/logout-modal.component';
import { SearchModalComponent } from './search-modal/search-modal.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  constructor(
    private modalService: NgbModal, 
    private router: Router, 
    private backButtonService: BackButtonService
  ) { }

  ngOnInit(): void {
  }

  isSearch () {
    return this.router.url.includes('search');
  }

  search (): void {
    const modalRef = this.modalService.open(SearchModalComponent);
    this.backButtonService.modal = modalRef;
    modalRef.closed
      .subscribe(month => {
        this.router.navigate(['/search'], { 
          queryParams: {
            date:  moment(month).format('DD-MM-YYYY')
          }
        })
        this.backButtonService.modal = undefined;
      });
  }

  back () {
    this.router.navigate(['/']);
  }

  signout(): void {
    const modalRef = this.modalService.open(LogoutModalComponent);
    modalRef.closed.subscribe(response=> {
      if (response) {
        localStorage.clear();
        this.router.navigate(['/login'])
      }
    });
  }

}
