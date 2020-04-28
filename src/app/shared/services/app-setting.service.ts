import { ControlModel } from './../model/control-model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppSettingService {
 public  controlModel: ControlModel;
 public globelBillDate;

  constructor() { }
}
