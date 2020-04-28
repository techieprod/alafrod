import { RestApiService } from './../../../shared/services/rest-api.service';
import { RestDataService } from './../../../shared/services/rest-data.service';
import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { routerTransition } from 'src/app/router.animations';


@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  animations: [routerTransition()],
  styleUrls: ['./department-list.component.scss']
})
export class DepartmentListComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  departments: any[] = [];

  constructor(public restDataService: RestDataService, public restApiService: RestApiService, public router: Router) { }



  ngOnInit() {
    this.restDataService.getDepartmentDataList();

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,

    };

    // lengthMenu: [5, 100, 150, 200]

    this.restApiService.getDepartmentList().subscribe(data => {
      this.departments = data;
      this.dtTrigger.next();
    });

  }


  goDepartmentForm() {
    this.router.navigate(['/departmentForm']);
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

}
