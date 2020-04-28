import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeaderModule } from './../../shared';
import { DataTablesModule } from 'angular-datatables';


import { DepartmentListComponent } from './department-list/department-list.component';
import { DepartmentFormComponent } from './department-form/department-form.component';
import { FormsModule } from '@angular/forms';
import { DepartmentDetailsComponent } from './department-details/department-details.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ DepartmentListComponent, DepartmentFormComponent, DepartmentDetailsComponent],
  imports: [
    CommonModule,
    PageHeaderModule,
    DataTablesModule,
    FormsModule,
    RouterModule
  ]
})
export class DepartmentModule { }
