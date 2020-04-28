import { ItemWieseReportModule } from './item-wiese-report/item-wiese-report.module';
import { KitchenDisplayComponent } from './kitchen-display/kitchen-display.component';
import { PosSalesComponent } from './pos-sales/pos-sales.component';
import { PosTableComponent } from './pos-table/pos-table.component';
import { PosHomeComponent } from './pos-home/pos-home.component';
import { CollectionReportComponent } from './collection-report/collection-report.component';
import { InvoiceGeneratorComponent } from './invoice-generator/invoice-generator.component';
import { DepartmentGroupDetailsComponent } from './department-group/department-group-details/department-group-details.component';
import { DepartmentGroupListComponent } from './department-group/department-group-list/department-group-list.component';
import { DepartmentGroupFormComponent } from './department-group/department-group-form/department-group-form.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { DepartmentListComponent } from './department/department-list/department-list.component';
import { DepartmentFormComponent } from './department/department-form/department-form.component';
import { DepartmentDetailsComponent } from './department/department-details/department-details.component';
import { ReportDashboardComponent } from './report-dashboard/report-dashboard.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'posTable', pathMatch: 'prefix' },
            { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
            { path: 'charts', loadChildren: () => import('./charts/charts.module').then(m => m.ChartsModule) },
            { path: 'tables', loadChildren: () => import('./tables/tables.module').then(m => m.TablesModule) },
            { path: 'forms', loadChildren: () => import('./form/form.module').then(m => m.FormModule) },
            { path: 'bs-element', loadChildren: () => import('./bs-element/bs-element.module').then(m => m.BsElementModule) },
            { path: 'grid', loadChildren: () => import('./grid/grid.module').then(m => m.GridModule) },
            { path: 'components', loadChildren: () => import('./bs-component/bs-component.module').then(m => m.BsComponentModule) },
            { path: 'blank-page', loadChildren: () => import('./blank-page/blank-page.module').then(m => m.BlankPageModule) },
            { path: 'department', loadChildren: () => import('./department/department.module').then(m => m.DepartmentModule) },
            { path: 'departmentList', component: DepartmentListComponent},
            { path: 'departmentForm', component: DepartmentFormComponent},
            { path: 'deparmentDetails/:id', component: DepartmentDetailsComponent },
            { path: 'departmentGroupList', component: DepartmentGroupListComponent},
            { path: 'departmentGroupForm', component: DepartmentGroupFormComponent},
            { path: 'deparmentGroupDetails/:id', component: DepartmentGroupDetailsComponent },
            { path: 'invoiceGenerator', component: InvoiceGeneratorComponent },
            { path: 'reportDashboard', component: ReportDashboardComponent },
            { path: 'salesSummary', component: CollectionReportComponent },
            { path: 'pos', component: PosHomeComponent },
            { path: 'posTable', component: PosTableComponent },
            { path: 'kitchenDisplay', component: KitchenDisplayComponent },
            { path: 'billCancel', loadChildren: () => import('./bill-cancel/bill-cancel.module').then(m => m.BillCancelModule) },
            { path: 'itemWiseReport', loadChildren: () => import('./item-wiese-report/item-wiese-report.module')
            .then(m => m.ItemWieseReportModule) },
            { path: 'posSales/:posCode/:unqNo/:waiterCode', component: PosSalesComponent },
            {path: 'superMaster', loadChildren: () => import('./super-master/super-master.module').then(m => m.SuperMasterModule)}

        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule {}
