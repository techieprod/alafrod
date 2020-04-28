import { BillHeadModel } from 'src/app/shared/model/bill-head-model';
import { Component, OnInit } from '@angular/core';
import { PosMaster } from 'src/app/shared/model/pos-master';
import { RestApiService } from 'src/app/shared/services/rest-api.service';
import { Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, catchError } from 'rxjs/operators';
import { NgbTypeaheadSelectItemEvent, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppSettingService } from 'src/app/shared/services/app-setting.service';
import { BillHeadDto } from 'src/app/shared/model/bill-head-dto';
import { JsonPipe } from '@angular/common';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2';
import {CustomModelService} from './../../shared/services/custom-model.service';
import { SuperMasterModel } from './../../shared/model/super-master-model';

@Component({
  selector: 'app-super-master',
  templateUrl: './super-master.component.html',
  styleUrls: ['./super-master.component.css']
})
export class SuperMasterComponent implements OnInit {
    loading;
    kitchenList: SuperMasterModel[];
    itemCategoryList: SuperMasterModel[];

    constructor(public restApiService: RestApiService, public appSettingService: AppSettingService,
               public customModelService: CustomModelService) { }

    ngOnInit() {
      this.getKitchenList();
      this.getItemCategoryList();
    }



    async getKitchenList() {
      this.loading = true;
      this.restApiService.getKitchenList()
        .subscribe((res: SuperMasterModel[]) => {
          if (res != null) {
            this.kitchenList = res;
            this.loading = false;
          }
        }, err => {
          this.loading = false;
          console.log(err);
        });
    }




    async getItemCategoryList() {
        this.loading = true;
        this.restApiService.getItemCategoryList()
          .subscribe((res: SuperMasterModel[]) => {
            if (res != null) {
              this.itemCategoryList = res;
              this.loading = false;
            }
          }, err => {
            this.loading = false;
            console.log(err);
          });
      }

  }

