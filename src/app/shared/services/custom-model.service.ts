import { DayCloseComponent } from './../../layout/day-close/day-close.component';
import { PosHomeComponent } from './../../layout/pos-home/pos-home.component';
import { CloseDayComponent } from './../../layout/close-day/close-day.component';
import { Injectable, Component } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BillCancelComponent } from './../../layout/bill-cancel/bill-cancel.component';

@Injectable({
  providedIn: 'root'
})
export class CustomModelService {
public customModelVariable;
public customCloseDayModelVariable;

  constructor(public modalService: NgbModal, public activeModal: NgbActiveModal) { }



openBillCancelModel() {
  this.modalService.open(BillCancelComponent, { centered: true });
    }

    public closeBillCancelModel() {  this.modalService.dismissAll(); }

    openDayCloseModel() {
        this.modalService.open(DayCloseComponent, { centered: true });
        }

        public closeDayCloseModel() { this.customCloseDayModelVariable.close(); }



}
