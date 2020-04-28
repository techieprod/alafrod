import { Component, OnInit } from '@angular/core';
import { RestApiService } from 'src/app/shared/services/rest-api.service';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { KotDetails } from 'src/app/shared/model/kot-details';

@Component({
  selector: 'app-kitchen-display',
  templateUrl: './kitchen-display.component.html',
  styleUrls: ['./kitchen-display.component.scss']
})
export class KitchenDisplayComponent implements OnInit {
  public loading: boolean;
  kotList: KotDetails[];
  posList: KotDetails[];
  tableList: KotDetails[];
  waiterList: KotDetails[];
  itemList: KotDetails[];
  itemSideList: KotDetails[];
  intialKotList: KotDetails[];
  posModel;
  tableModel;
  waiterModel;
  itemModel;
  itemSideConditionList: KotDetails[];
  itemSideCondition: KotDetails;



  constructor(public restApiService: RestApiService, private route: ActivatedRoute, private datePipe: DatePipe) {

    this.itemSideConditionList = [{
      kotPckey: 0, kotNo: '', kotDate: new Date, unqNo: 0, itemPckey: 0,
      itemCode: '0', itemName: '0', quantity: 0,
      rate: 0, taxRate: 0,
      taxAmount: 0, amount: 0 ,
       status: 'N', discount: 0,
      reason: '', preferencePckey: 0, printed: 0, pref: '',  posCode: '', posName: '', tableName: '', waiterCode: '', waiterName: ''
    }];

   }

  ngOnInit() {
    this.posModel = '-1';
    this.tableModel = '-1';
    this.waiterModel = '-1';
    this.itemModel = '-1';
    this.getKotList();
  }

   getUniqueListBy(arr, key) {
    return [new Map(arr.map(item => [item[key], item])).values()];
}

  changePos() {
    this.tableModel = '-1';
    this.waiterModel = '-1';
    this.itemModel = '-1';
    this.kotList = this.intialKotList.filter(book => book.posCode === this.posModel);
    this.getKotCount();

  }


  changeTable() {
    this.posModel = '-1';
    this.waiterModel = '-1';
    this.itemModel = '-1';
    this.kotList = this.intialKotList.filter(book => book.tableName === this.tableModel);
    this.getKotCount();
  }

  changeWaiter() {
    this.posModel = '-1';
    this.tableModel = '-1';
    this.itemModel = '-1';
    this.kotList = this.intialKotList.filter(book => book.waiterCode === this.waiterModel);
    this.getKotCount();
  }

  changeItem() {
    this.posModel = '-1';
    this.tableModel = '-1';
    this.waiterModel = '-1';
    this.kotList = this.intialKotList.filter(book => book.itemPckey === Number(this.itemModel));
    this.getKotCount();
  }

  reduce(array, key) {
    const res = [];
    let count = 0;
    array.map(function(item) {
      const existItem = res.find(x => x.key === item.key);
      if (existItem) {
        count++;
       console.log('item already exist' + count);
      } else {
        count++;
        item.kotNo = count;
        res.push(item);
      }
    });
    console.log(res);
    return res;

  }


  getKotCount() {
    this.itemSideList = [];
   const itemlist = this.removeDuplicates(this.kotList, 'itemPckey');
    let count = 0;
    itemlist.forEach(pdto => {
      count = 0;
    count =  this.findItemCount(itemlist, pdto.itemPckey);
    console.log(pdto.itemPckey + 'count..' + count);
    pdto.kotNo = '' + count;
      this.itemSideList.push(pdto);
    });
  }


  findItemCount(itemlist, itemPckey) {

    const existItem = this.kotList.filter(item => item.itemPckey === itemPckey);

    return existItem.length;
  }



   removeDuplicates(array, key) {
    const lookup = {};
    const result = [];
    array.forEach(element => {
        if (!lookup[element[key]]) {
            lookup[element[key]] = true;
            result.push(element);
        }
    });
    return result;
  }


  async getKotList() {
    this.loading = true;
    this.restApiService.getKotList()
      .subscribe((res: KotDetails[]) => {
        if (res != null) {
          this.kotList = res;
          this.intialKotList = res;

          this.tableList = this.removeDuplicates(this.kotList, 'unqNo');
          this.posList  = this.removeDuplicates(this.kotList, 'posCode');
          this.waiterList = this.removeDuplicates(this.kotList, 'waiterCode');
          this.itemList = this.removeDuplicates(this.kotList, 'itemPckey');
          // this.itemSideList = this.removeDuplicates(this.kotList, 'itemPckey');
          this.getKotCount( );
         // this.tableList = this.kotList.filter((v , i) => this.kotList.findIndex(item => item.unqNo === v.unqNo) === i);
          // this.posList =  this.intialKotList.filter((v , i) => this.intialKotList.findIndex(item => item.posCode === v.posCode) === i);
          // // this.tableList = this.kotList.filter((v , i) => this.kotList.findIndex(item => item.unqNo === v.unqNo) === i);
          // this.waiterList = this.intialKotList.filter((v , i) => this.intialKotList.findIndex(item =>
          //    item.waiterCode === v.waiterCode) === i);
          // this.itemList = this.intialKotList.filter((v , i) => this.intialKotList.findIndex(item => item.itemPckey === v.itemPckey) === i);

          this.loading = false;

        }
      }, err => {
        this.loading = false;
        console.log(err);
      });
  }
}
