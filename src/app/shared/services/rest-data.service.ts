

import { Injectable } from '@angular/core';
import {RestApiService } from './rest-api.service';

@Injectable({
  providedIn: 'root'
})
export class RestDataService {

  public deparmentData: any = [];
  public groupData: any = [];

  constructor(public api: RestApiService) { }


  async saveDepartmentData(deparmentDate) {
    this.api.saveDepartment(deparmentDate)
      .subscribe((res: any[]) => {
        if (res != null) {
       alert('Deparment is successfully saved');
        }
      }, err => {
        console.log(err);
      });
  }


  async getDepartmentDataList() {
    this.api.getDepartmentList()
      .subscribe((res: any[]) => {
        this.deparmentData = res;
      }, err => {
        console.log(err);
      });
  }



  async saveGroupData(groupDate) {
    this.api.saveGroup(groupDate)
      .subscribe((res: any[]) => {
        if (res != null) {
       alert('Group is successfully saved');
        }
      }, err => {
        console.log(err);
      });
  }


  async getGroupDataList() {
    this.api.getGroupList()
      .subscribe((res: any[]) => {
        this.groupData = res;
      }, err => {
        console.log(err);
      });
  }

}
