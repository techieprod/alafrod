import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SuperMasterComponent } from './super-master.component';


const routes: Routes = [
    {
        path: '', component: SuperMasterComponent
    }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],

exports: [RouterModule]
})
export class SuperMasterRoutingModule { }
