import { Component, OnInit, Injectable } from '@angular/core';
import { RestApiService } from 'src/app/shared/services/rest-api.service';
import * as moment from 'moment';
import { NgbDateParserFormatter, NgbDateStruct, NgbDateAdapter, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';





@Component({
  selector: 'app-collection-report',
  templateUrl: './collection-report.component.html',

  styleUrls: ['./collection-report.component.scss']
})
export class CollectionReportComponent implements OnInit {
  model;
  fromDateCollectionReport: string;
  toDateCollectionReport: string;
  collectionData: any[] = [];
  maxDate;

  constructor(public restApiService: RestApiService, private ngbCalendar: NgbCalendar, private dateAdapter: NgbDateAdapter<string>,
    private datePipe: DatePipe) {

    const now = new Date();

this.fromDateCollectionReport = this.today();
this.toDateCollectionReport = this.today();
this.maxDate=  {year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate()};
this.reportDateChange();


    // this.fromDateCollectionReport = moment(new Date(), 'DD/MM/YYYY');
    // this.toDateCollectionReport = moment(new Date(), 'DD/MM/YYYY');
   // this.getCollectionData();
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

this.getCollectionData(fromDate, toDate);

  }

  netTotalCalculation(eligibleAmount, taxAmount, disCountAmount) {

    let total = 0;
    total = (parseInt(eligibleAmount, 10) + parseInt(taxAmount, 10)) - parseInt(disCountAmount, 10);
    return total;

  }

  getCollectionData(fromDate, toDate) {
  this.restApiService.getCollectionReport(fromDate, toDate).subscribe(data => {
    this.collectionData = data;

  });
}

}
