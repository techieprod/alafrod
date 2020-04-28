import { TableDto } from './../../shared/model/table-dto';
import { RestApiService } from './../../shared/services/rest-api.service';
import { Component, OnInit } from '@angular/core';
import { PosMaster } from 'src/app/shared/model/pos-master';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pos-table',
  templateUrl: './pos-table.component.html',
  styleUrls: ['./pos-table.component.scss']
})
export class PosTableComponent implements OnInit {

  tableList:  TableDto[];
  posList: PosMaster[];
  posModel ;

  constructor( private restApiService: RestApiService, private router: Router ) {

    this.getPosList();



   }

   goToPosSales(tableData: TableDto) {
    this.router.navigate(['/posSales/' + tableData.posCode + '/' + tableData.unqNo + '/' + tableData.waiterNo]);

   }

  ngOnInit() {
  }

  changePos(posData: PosMaster) {
    this.posModel = posData.posName;
    this.getTableList(posData.posCode);

  }

  async getPosList() {
    this.restApiService.getPosList()
      .subscribe((res: PosMaster[]) => {
        if (res != null) {
      this.posList = res;
      this.posModel = this.posList[0];
    this.getTableList(0);
        }
      }, err => {
        console.log(err);
      });
  }


  async getTableList(posCode) {
    this.restApiService.getTableListByPosId(posCode)
      .subscribe((res: TableDto[]) => {
        if (res != null) {
      this.tableList = res;
        }
      }, err => {
        console.log(err);
      });
  }
}
