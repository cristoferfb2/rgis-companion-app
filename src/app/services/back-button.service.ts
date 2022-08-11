import { Injectable } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root'
})
export class BackButtonService {
  public modal: NgbModalRef;

  constructor() { }
}
