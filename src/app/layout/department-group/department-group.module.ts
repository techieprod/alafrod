import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeaderModule } from './../../shared';
import { DataTablesModule } from 'angular-datatables';
import { DepartmentGroupListComponent } from './department-group-list/department-group-list.component';
import { DepartmentGroupFormComponent } from './department-group-form/department-group-form.component';
import { DepartmentGroupDetailsComponent } from './department-group-details/department-group-details.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [DepartmentGroupListComponent, DepartmentGroupFormComponent, DepartmentGroupDetailsComponent],
  imports: [
    CommonModule,
    PageHeaderModule,
    DataTablesModule,
    FormsModule,
    RouterModule
  ]
})
export class DepartmentGroupModule { }
