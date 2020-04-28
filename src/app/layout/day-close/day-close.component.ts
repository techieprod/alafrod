import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RestApiService } from 'src/app/shared/services/rest-api.service';
import { AppSettingService } from 'src/app/shared/services/app-setting.service';
import { ControlModel } from './../../shared/model/control-model';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';
import { KotDetails } from 'src/app/shared/model/kot-details';
@Component({
  selector: 'app-day-close',
  templateUrl: './day-close.component.html',
  styleUrls: ['./day-close.component.css']
})
export class DayCloseComponent implements OnInit {
    billDate;
    kotDetailsList: KotDetails[];

  constructor(public modalService: NgbModal, public restApiService: RestApiService, public appSettingService: AppSettingService, private datePipe: DatePipe) {

    this.billDate = this.datePipe.transform(this.appSettingService.globelBillDate, 'dd/MM/yyyy');
   }



  ngOnInit(): void {
  }

  closeDayCloseModel() {
    this.modalService.dismissAll();

  }
updateBillDate() {





  this.restApiService.getKotDetailList()
  .subscribe((res: KotDetails[]) => {
    if (res != null ) {
        this.kotDetailsList = res;
        if (this.kotDetailsList.length > 0) {
            Swal.fire(
                'Active Table Are Found!',
                '',
                'error'
              );

        } else {
            this.updateDay();
        }
    }
  }, err => {
    console.log(err);
  });
}


updateDay() {
  this.restApiService.updateBillDate(this.appSettingService.globelBillDate)
  .subscribe((res: ControlModel) => {
    if (res != null) {
      Swal.fire(
          'Day is "' +  this.datePipe.transform(this.appSettingService.globelBillDate, 'dd/MM/yyyy') + '" Successfully Closed',
          '',
          'success'
        );
        this.appSettingService.controlModel = res;
        this.appSettingService.globelBillDate = moment(this.appSettingService.controlModel.lastClosedDate)
        .add(1, 'days').format('YYYY-MM-DD');
        this.billDate = this.datePipe.transform(this.appSettingService.globelBillDate, 'dd/MM/yyyy');

    }
  }, err => {
    console.log(err);
  });
}




}
