import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ItemWieseReportComponent } from './item-wiese-report.component';
const routes: Routes = [
  {
      path: '', component: ItemWieseReportComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ItemWieseReportRoutingModule {
}
