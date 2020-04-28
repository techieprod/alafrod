import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-report-dashboard',
  templateUrl: './report-dashboard.component.html',
  styleUrls: ['./report-dashboard.component.scss']
})
export class ReportDashboardComponent implements OnInit {

  constructor( private router: Router) { }

  ngOnInit() {
  }

  goToReport(reportName) {
    if (reportName === 'collection') {
      this.router.navigate(['collectionReport']);
    }
  }

}
