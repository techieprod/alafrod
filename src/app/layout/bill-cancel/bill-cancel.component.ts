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


@Component({
  selector: 'app-bill-cancel',
  templateUrl: './bill-cancel.component.html',
  styleUrls: ['./bill-cancel.component.scss']
})
export class BillCancelComponent implements OnInit {
  posList: PosMaster[];
  public loading: boolean;
  posModel;
  billReasonModel;
  billNumberModel;
  billNo;
  itemCodeModel;
  billHaCancel: BillHeadDto;
  errorMessage;

  constructor(public restApiService: RestApiService, public appSettingService: AppSettingService,
             public customModelService: CustomModelService) { }

  ngOnInit() {
    this.posModel = '-1';
    this.getPosList();
  }



  async getPosList() {
    this.loading = true;
    this.restApiService.getPosList()
      .subscribe((res: PosMaster[]) => {
        if (res != null) {
          this.posList = res;
          this.loading = false;
        }
      }, err => {
        this.loading = false;
        console.log(err);
      });
  }

  itemCodeSearch = (text$: Observable<number>) => {
    return text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      // switchMap allows returning an observable rather than maps array
      switchMap((searchText) => this.restApiService.getBillByPosCodeAndBillNo(this.posModel, searchText, this.appSettingService.globelBillDate)),
      catchError(_ => of('no more requests!!!')
      )
    );
  }
  itemCodeSelected(e: NgbTypeaheadSelectItemEvent) {
    // this.itemNameModel = e.item;
    // this.selectedModel = e.item;
    // this.rateModel = e.item.rate;
    // this.qtyModel = 1;
    // if (this.itemNameModel) {
    //   this.isDown = false;
    //   this.isQty = false;
    // }
    // console.log('$e.item..' + this.itemNameModel);
    this.billNo = e.item.billNo;
  }

  formatter = (x: { billNo: string, itemName: string }) => x.billNo;

  itemCodeformatterDisplay = (x: { billNo: string }) => x.billNo;
  changePos() {
    this.billNumberModel = '';
  }


  billReset() {
    this.errorMessage = '';
    this.posModel = '-1';
    this.billNumberModel = '';
    this.billReasonModel = '';
  }

  updateBillCancel() {
    this.errorMessage = '';
    if (this.posModel === '-1') {
this.errorMessage = 'Please Choose Area Name';
    } else if (!this.billNumberModel) {
      this.errorMessage = 'Please Select Bill No';
    } else if (!this.billReasonModel) {
      this.errorMessage = 'Please Enter The Reason';
    } else {
      this.billHaCancel = {
        billNo: this.billNo, posCode: this.posModel,
        billReason: this.billReasonModel,
      };
      this.restApiService.updateBillCancel(this.billHaCancel)
        .subscribe((res: BillHeadModel[]) => {
          if (res != null) {
            Swal.fire(
                'Confirmation!',
                'Bill No is ' + this.billNo + ' Successfully Canceled',
                'success'
              );

              this.billReset();

            // Swal.fire(
            //   'Bill No is' + this.billNo + 'Successfully Canceled',
            //   'success'
            // );
          }
        }, err => {
          this.loading = false;
          console.log(err);
        });
    }
  }

  save() {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this imaginary file!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          'Deleted!',
          'Your imaginary file has been deleted.',
          'success'
        );

      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your imaginary file is safe :)',
          'error'
        );
      }
    });
  }

  closeBillCancel() {
    // this.modalService.close(BillCancelComponent, {
    //    centered: true

    // });
  }

}
