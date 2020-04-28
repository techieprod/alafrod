import { RestDataService } from './../../../shared/services/rest-data.service';
import { Component, OnInit } from '@angular/core';
import { routerTransition } from 'src/app/router.animations';

@Component({
  selector: 'app-department-form',
  templateUrl: './department-form.component.html',
  animations: [routerTransition()],
  styleUrls: ['./department-form.component.scss']
})
export class DepartmentFormComponent implements OnInit {
  deparmentData = {
                    departmentName: '',
                    comments: '',
                    inCharge: '',
                  };

  constructor(private restDataService: RestDataService) { }

  ngOnInit() {
  }

  saveDeparmentEvent() {

    this.restDataService.saveDepartmentData(this.deparmentData);
  }

}
