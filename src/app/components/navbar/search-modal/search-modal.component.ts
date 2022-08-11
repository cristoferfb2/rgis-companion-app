import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import { MatCalendar, MatCalendarView } from '@angular/material/datepicker';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-search-modal',
  templateUrl: './search-modal.component.html',
  styleUrls: ['./search-modal.component.scss']
})
export class SearchModalComponent implements OnInit, AfterViewInit {
  @ViewChild(MatCalendar) calendar!: MatCalendar<any>;

  constructor(private activeModal: NgbActiveModal, private dateAdapter: DateAdapter<Date>) { }

  ngOnInit(): void {
    this.dateAdapter.setLocale('es');
  }

  ngAfterViewInit(): void {
    this.calendar.currentView = 'year';
  }

  onViewChanged (view: MatCalendarView) {
    if (view == 'month')
      this.calendar.currentView = 'multi-year';
  }

  onMonthSelected(month: Date) {
    this.activeModal.close(month);
  }
}
