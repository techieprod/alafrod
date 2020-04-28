import { RestDataService } from './../../../shared/services/rest-data.service';
import { Component, OnInit } from '@angular/core';
import { routerTransition } from 'src/app/router.animations';

@Component({
  selector: 'app-department-group-form',
  templateUrl: './department-group-form.component.html',
  styleUrls: ['./department-group-form.component.scss']
})
export class DepartmentGroupFormComponent implements OnInit {

  groupData = {
    groupName: '',
    departmentId: '',
    comments: '',
    inCharge: '',
  };

constructor(public restDataService: RestDataService) { }

ngOnInit() {
  this.restDataService.getDepartmentDataList();
}

saveGroupEvent() {

this.restDataService.saveGroupData(this.groupData);
}

}
