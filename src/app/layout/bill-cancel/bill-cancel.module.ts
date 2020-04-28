import { BillCancelComponent } from './bill-cancel.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeaderModule } from './../../shared';

import { BillCancelRoutingModule } from './bill-cancel-routing.module';
import { FormsModule } from '@angular/forms';
import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

@NgModule({
  declarations: [BillCancelComponent],
  imports: [
    CommonModule,
    BillCancelRoutingModule,
    PageHeaderModule,
    FormsModule,
    NgbTypeaheadModule,
    SweetAlert2Module,

  ]
})
export class BillCancelModule { }
