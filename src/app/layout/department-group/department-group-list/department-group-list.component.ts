import { RestApiService } from './../../../shared/services/rest-api.service';
import { RestDataService } from './../../../shared/services/rest-data.service';
import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { routerTransition } from 'src/app/router.animations';

@Component({
  selector: 'app-department-group-list',
  templateUrl: './department-group-list.component.html',
  animations: [routerTransition()],
  styleUrls: ['./department-group-list.component.scss']
})
export class DepartmentGroupListComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  groups: any[] = [];

  constructor(public restDataService: RestDataService, public restApiService: RestApiService, public router: Router) { }



  ngOnInit() {
    this.restDataService.getGroupDataList();

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,

    };

    // lengthMenu: [5, 100, 150, 200]

    this.restApiService.getGroupList().subscribe(data => {
      this.groups = data;
      this.dtTrigger.next();
    });

  }


  goDepartmentGroupForm() {
    this.router.navigate(['/departmentGroupForm']);
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }


}
