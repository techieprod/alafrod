import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ItemWieseReportRoutingModule } from './item-wiese-report-routing.module';
import { FormsModule } from '@angular/forms';
import { NgbTypeaheadModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PageHeaderModule } from 'src/app/shared';
import { ItemWieseReportComponent } from './item-wiese-report.component';

@NgModule({
  declarations: [ItemWieseReportComponent],
  imports: [
    CommonModule,
    ItemWieseReportRoutingModule,
    PageHeaderModule,
    FormsModule,
    NgbTypeaheadModule,
    NgbModule,
  ]
})
export class ItemWieseReportModule { }
