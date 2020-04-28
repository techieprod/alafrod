import { Component, OnInit } from '@angular/core';
import { RestApiService } from 'src/app/shared/services/rest-api.service';
import { NgbCalendar, NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';
import { ItemWiseReportCustomModel } from 'src/app/shared/item-wise-report-custom-model';

@Component({
  selector: 'app-item-wiese-report',
  templateUrl: './item-wiese-report.component.html',
  styleUrls: ['./item-wiese-report.component.scss']
})
export class ItemWieseReportComponent implements OnInit {

  model;
  fromDateCollectionReport: string;
  toDateCollectionReport: string;
  itemWiseList: ItemWiseReportCustomModel[];
  maxDate;

  constructor(public restApiService: RestApiService, private ngbCalendar: NgbCalendar, private dateAdapter: NgbDateAdapter<string>,
    private datePipe: DatePipe) {

    const now = new Date();

this.fromDateCollectionReport = this.today();
this.toDateCollectionReport = this.today();
this.maxDate =  {year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate()};
this.reportDateChange();


    // this.fromDateCollectionReport = moment(new Date(), 'DD/MM/YYYY');
    // this.toDateCollectionReport = moment(new Date(), 'DD/MM/YYYY');
   // this.getItemData();
  }

  ngOnInit() {
  }


  today() {
    return this.dateAdapter.toModel(this.ngbCalendar.getToday())!;
  }

  reportDateChange() {



    console.log('fromDateCollectionReport..' + this.toDateCollectionReport);

    const ddate = this.dateAdapter.toModel(this.ngbCalendar.getToday());

    console.log('format..' +  moment(this.fromDateCollectionReport, 'yyyy-mm-dd'));

const fromDate =  this.fromDateCollectionReport;
const toDate = this.toDateCollectionReport;

this.getItemData(fromDate, toDate);

  }

  netTotalCalculation(eligibleAmount, taxAmount, disCountAmount) {

    let total = 0;
    total = (parseInt(eligibleAmount, 10) + parseInt(taxAmount, 10)) - parseInt(disCountAmount, 10);
    return total;

  }

  getItemData(fromDate, toDate) {
  this.restApiService.getItemWiseReport(fromDate, toDate).subscribe(data => {
    this.itemWiseList = data;

  });
}
}
