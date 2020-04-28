import { DepartmentGroupModule } from './department-group/department-group.module';
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe, JsonPipe } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NgbDropdownModule, NgbTypeahead, NgbTypeaheadModule, NgbCalendar, NgbDateStruct, NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { DepartmentModule } from './department/department.module';
import { FormsModule } from '@angular/forms';
import { InvoiceGeneratorComponent } from './invoice-generator/invoice-generator.component';
import { ReportDashboardComponent } from './report-dashboard/report-dashboard.component';
import { StatModule } from '../shared/modules/stat/stat.module';
import { CollectionReportComponent } from './collection-report/collection-report.component';
import { PosHomeComponent } from './pos-home/pos-home.component';
import { PosTableComponent } from './pos-table/pos-table.component';
import { PosSalesComponent } from './pos-sales/pos-sales.component';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import { PageHeaderModule } from '../shared/modules/page-header/page-header.module';
import { DigitOnlyModule } from '@uiowa/digit-only';
import { KitchenDisplayComponent } from './kitchen-display/kitchen-display.component';
import { ItemWieseReportComponent } from './item-wiese-report/item-wiese-report.component';
import { BillCancelComponent } from './bill-cancel/bill-cancel.component';
import { CloseDayComponent } from './close-day/close-day.component';
import { DayCloseComponent } from './day-close/day-close.component';
import { SuperMasterComponent } from './super-master/super-master.component';




@NgModule({
    imports: [
        CommonModule,
        LayoutRoutingModule,
        TranslateModule,
        NgbDropdownModule,
        DepartmentModule,
        DepartmentGroupModule,
        FormsModule,
        StatModule,
        AutocompleteLibModule,
        NgbTypeaheadModule,
        PageHeaderModule,
        DigitOnlyModule,
        NgbModule,
    ],
    entryComponents: [CloseDayComponent],
    providers: [DatePipe, JsonPipe],
    declarations: [LayoutComponent, SidebarComponent, HeaderComponent,
         InvoiceGeneratorComponent, ReportDashboardComponent, CollectionReportComponent,
          PosHomeComponent, PosTableComponent, PosSalesComponent, KitchenDisplayComponent, CloseDayComponent, DayCloseComponent, SuperMasterComponent ]
})
export class LayoutModule {}
