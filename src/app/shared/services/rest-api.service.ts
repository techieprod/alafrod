import { BillHeadDto } from './../model/bill-head-dto';
import { BillHeadModel } from './../model/bill-head-model';
import { ControlModel } from './../model/control-model';
import { KotDetails } from './../model/kot-details';
import { TableDto } from './../model/table-dto';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';
import { PosMaster } from '../model/pos-master';
import { ItemModel } from '../model/item-model';
import { TableCustomModal } from '../model/table-custom-modal';
import { EnvConfigService } from './env-config.service';
import { ItemWiseReportCustomModel } from '../item-wise-report-custom-model';
import { WaiterMaster } from '../model/waiter-master';
import { SuperMasterModel } from './../model/super-master-model';

@Injectable({
  providedIn: 'root'
})
export class RestApiService {


  constructor(private http: HttpClient,  public envConfigService: EnvConfigService) {

    const headers = new HttpHeaders({ Authorization: 'Basic ' +
    btoa(this.envConfigService.appConfig.userName + ':' + this.envConfigService.appConfig.password) });
  }


handleError(error) {
  let errorMessage = '';
  if (error.error instanceof ErrorEvent) {

    errorMessage = error.error.message;

  } else {
    errorMessage = 'Error Code:' + error.status + '\nMessage:' + error.message;
  }

  return throwError(errorMessage);
}


getDepartmentList(): Observable<any[]> {

  return this.http.get<any[]>(this.envConfigService.appConfig.apiUrl + 'departmentList', { }).pipe(retry(1), catchError(this.handleError));
}


saveDepartment(deparmentData): Observable<any> {
  return this.http.post<any>(this.envConfigService.appConfig.apiUrl + 'saveDepartment', deparmentData).pipe(retry(1), catchError(this.handleError));
}

getDepartmentDetails(deparmentId): Observable<any> {
  return this.http.get<any>(this.envConfigService.appConfig.apiUrl + 'departmentDetailsById/' + deparmentId).pipe(retry(1), catchError(this.handleError));
}

/// Group Start

getGroupList(): Observable<any[]> {
  return this.http.get<any[]>(this.envConfigService.appConfig.apiUrl + 'departmentGroupList').pipe(retry(1), catchError(this.handleError));
}


saveGroup(groupData): Observable<any> {
  return this.http.post<any>(this.envConfigService.appConfig.apiUrl + 'saveDepartmentGroup', groupData).pipe(retry(1), catchError(this.handleError));
}

getGroupDetails(groupId): Observable<any> {
  return this.http.get<any>(this.envConfigService.appConfig.apiUrl + 'departmentGroupDetailsById/' + groupId).pipe(retry(1), catchError(this.handleError));
}


getCollectionReport(fromDate, toDate): Observable<any> {
  return this.http.get<any>(this.envConfigService.appConfig.restroApiUrl + 'getCollectionReportByDateRange/' + fromDate + '/' + toDate)
  .pipe(retry(1), catchError(this.handleError));
}


getTableListByPosId(posId): Observable<TableDto[]> {
  return this.http.get<TableDto[]>(this.envConfigService.appConfig.restroPosApiUrl + 'tableWithWaiterList/' + posId).pipe(retry(1), catchError(this.handleError));
}


getPosList(): Observable<PosMaster[]> {
  return this.http.get<PosMaster[]>(this.envConfigService.appConfig.restroPosApiUrl + 'posMasterList/').pipe(retry(1), catchError(this.handleError));
}

getKotDetailListByTable(tableId): Observable<KotDetails[]> {
  return this.http.get<KotDetails[]>(this.envConfigService.appConfig.restroPosApiUrl + 'kotDetailListByTable/' + tableId).pipe(retry(1), catchError(this.handleError));
}


getItemWithRateListByItemCode(posId, itemCode): Observable<ItemModel[]> {

  console.log('itemCode..' + itemCode);
  if (itemCode === '') {
    itemCode = 0;
  }

  return this.http.get<ItemModel[]>(this.envConfigService.appConfig.restroPosApiUrl + 'itemWithRateListByItemCode/'
  + posId + '/' + itemCode).pipe(retry(1), catchError(this.handleError));
}


getItemWithRateListByItemName(posId, itemName): Observable<ItemModel[]> {

  console.log('itemCode..' + itemName);
  if (itemName === '') {
    itemName = '0';
  }

  return this.http.get<ItemModel[]>(this.envConfigService.appConfig.restroPosApiUrl + 'itemWithRateList/'
  + posId + '/' + itemName).pipe(retry(1), catchError(this.handleError));
}


saveKot(unqNo, posName, tableName, waiterName, KotList: KotDetails[]): Observable<KotDetails[]> {



  return this.http.put<KotDetails[]>(this.envConfigService.appConfig.restroPosApiUrl + 'updateKotDetails/'
  + unqNo + '/' + posName + '/' + tableName + '/' + waiterName, KotList).pipe(retry(1), catchError(this.handleError));
}

updateTable(tableId, tableData: TableCustomModal): Observable<TableCustomModal> {
  return this.http.put<TableCustomModal>(this.envConfigService.appConfig.restroPosApiUrl + 'updateTableStatus/'
  + tableId , tableData).pipe(retry(1), catchError(this.handleError));
}

saveBill(billHa): Observable<KotDetails[]> {
  return this.http.post<KotDetails[]>(this.envConfigService.appConfig.restroPosApiUrl + 'saveBill',  billHa).pipe(retry(1),
   catchError(this.handleError));
}

getKotList(): Observable<KotDetails[]> {
  return this.http.get<KotDetails[]>(this.envConfigService.appConfig.restroPosApiUrl + 'kotList').pipe(retry(1),
   catchError(this.handleError));
}

getControllData(): Observable<ControlModel> {
  return this.http.get<ControlModel>(this.envConfigService.appConfig.restroPosMasterApiUrl + 'connectionCheck').pipe(retry(1),
   catchError(this.handleError));
}


getBillByPosCodeAndBillNo(posCode, billNo, billDate): Observable<BillHeadDto[]> {

  console.log('itemCode..' + billNo);
  if (billNo === '') {
    billNo = 0;
  }

  return this.http.get<BillHeadDto[]>(this.envConfigService.appConfig.restroPosApiUrl + 'getBillByPosCodeAndBillNo/'
  + posCode + '/' + billNo + '/' + billDate).pipe(retry(1), catchError(this.handleError));
}


getItemWiseReport(fromDate, toDate): Observable<ItemWiseReportCustomModel[]> {
  return this.http.get<any>(this.envConfigService.appConfig.restroApiUrl + 'getItemWiseByDateRange/' + fromDate + '/' + toDate)
  .pipe(retry(1), catchError(this.handleError));
}


getWaiterMasterList(): Observable<WaiterMaster[]> {
  return this.http.get<WaiterMaster[]>(this.envConfigService.appConfig.restroPosApiUrl + 'waiterMasterList/')
  .pipe(retry(1), catchError(this.handleError));
}

// updateBillCancel(billha): Observable<BillHeadDto[]> {
//   return this.http.post<BillHeadDto[]>(this.envConfigService.appConfig.restroPosApiUrl + 'updateBillCancel', billha)
//   .pipe(retry(1), catchError(this.handleError));
// }

updateBillCancel(billHa: BillHeadDto): Observable<BillHeadModel[]> {
  return this.http.post<BillHeadModel[]>(this.envConfigService.appConfig.restroPosApiUrl + 'updateBillCancel',  billHa).pipe(retry(1),
   catchError(this.handleError));
}


updateBillDate(billDate): Observable<ControlModel> {
    return this.http.get<ControlModel>(this.envConfigService.appConfig.restroPosMasterApiUrl + 'updatedayClose/' + billDate ).pipe(retry(1),
     catchError(this.handleError));
  }

  getKotDetailList(): Observable<KotDetails[]> {
    return this.http.get<KotDetails[]>(this.envConfigService.appConfig.restroPosApiUrl + 'kotDetailList' ).
    pipe(retry(1), catchError(this.handleError));
  }


  getKitchenList(): Observable<SuperMasterModel[]> {
    return this.http.get<SuperMasterModel[]>(this.envConfigService.appConfig.restroPosMasterApiUrl + 'getKitchenList').pipe(retry(1),
     catchError(this.handleError));
  }
  getItemCategoryList(): Observable<SuperMasterModel[]> {
    return this.http.get<SuperMasterModel[]>(this.envConfigService.appConfig.restroPosMasterApiUrl + 'getItemCategoryList').pipe(retry(1),
     catchError(this.handleError));
  }

}
