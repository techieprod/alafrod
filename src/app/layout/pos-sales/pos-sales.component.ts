import { WaiterMaster } from './../../shared/model/waiter-master';
import { AppSettingService } from './../../shared/services/app-setting.service';
import { ControlModel } from './../../shared/model/control-model';
import { TableCustomModal } from './../../shared/model/table-custom-modal';
import { KotDetails } from './../../shared/model/kot-details';
import { RestApiService } from './../../shared/services/rest-api.service';
import { Component, OnInit, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, filter, switchMap, catchError } from 'rxjs/operators';
import { PosMaster } from 'src/app/shared/model/pos-master';
import { TableDto } from 'src/app/shared/model/table-dto';
import { NgbTypeaheadSelectItemEvent } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { DatePipe, JsonPipe } from '@angular/common';
import { BillHeadModel } from 'src/app/shared/model/bill-head-model';
import { SwalAlertService } from './../../shared/services/swal-alert.service';




@Component({
  selector: 'app-pos-sales',
  templateUrl: './pos-sales.component.html',
  styleUrls: ['./pos-sales.component.scss']
})
export class PosSalesComponent implements OnInit  {

  @ViewChild('qtyView', {static: false})
  qtyView: ElementRef;

  @ViewChild('itemCodeView', {static: true})
  itemCodeView: ElementRef;

  waiterCoreList: WaiterMaster[];
  waiterFinalList: WaiterMaster[];

  public itemCodeModel: any;
  public itemNameModel: any;
  posList: PosMaster[];
  tableList: TableDto[];
  waiterList: WaiterMaster[];
  tableListByWaiter: TableDto[];
  kotList: KotDetails[];
  sessionKotList: KotDetails[] = [];
  posModel;
  tableModel;
  waiterModel;
  rateModel;
  qtyModel: number;
  totalQty: number;
  totalRate = 0.00;
  totalGst = 0.00;
  netAmount = 0.00;
  kotData: KotDetails;
  selectedModel: any;

  isTable = true;
  isWaiter = true;
  isItemCode = true;
  isItemName = true;
  isQty = true;
  isDown = true;
  isKotBtn = true;
  isBillBtn = true;
  isDiscountBill = true;
  isKotEnable = false;
  public loading: boolean;
  posName;
  tableName;
  waiterName;
  tableData: any;
  tempUnqNo;
  tempPosCode;
  tempWaiterCode;
  tableCustomModal: TableCustomModal;
  billHead: BillHeadModel;
  discountBillPopupMode =  false;
  discountTypeList = [{ 'id': '1', 'value': 'By Percentage'}, { 'id': '2', 'value': 'By Amount'} ];
  discountTypeModel;
  discountModel: number;
  discountRate = 0;
      disCountAmount = 0;
      taxRate: number ;
      controlModel: ControlModel;



  constructor(public restApiService: RestApiService, private route: ActivatedRoute, private datePipe: DatePipe, private jsonPipe: JsonPipe,
    public appSettingService: AppSettingService, public swalAlertService: SwalAlertService) {

    this.intialLoading();
    this.discountTypeModel = '1';
    this.getWaiterMasterList();

     this.route.params.subscribe(params => {
      this.tempPosCode = '' + params['posCode']; // (+) converts string 'id' to a number

      this.getTableList( this.tempPosCode);
      this.tempUnqNo = '' + params['unqNo'];
      this.tempWaiterCode = '' + params['waiterCode'];


   });

   this.isTable = false;
   this.isWaiter = false;
   console.log('this.tableData..' + this.tempPosCode);
   this.posModel = this.tempPosCode;
   this.tableModel = this.tempUnqNo;
   this.waiterModel = this.tempWaiterCode;

   this.getKotDetailListByTable(this.tableModel);
   console.log('this.tableModel ' + this.tableModel);
  //  this.tableListByWaiter = this.tableList.filter(tableData => tableData.unqNo === this.tableModel);

  //  this.tableName = '';
  //  this.tableList.forEach(partner => {
  //    if (partner.unqNo === Number(this.tableModel)) {
  //      this.tableName = partner.tableNo;
  //    }
  //  });


  }

  async getWaiterMasterList() {
    this.restApiService.getWaiterMasterList()
      .subscribe((res: WaiterMaster[]) => {
        if (res != null) {
          this.waiterCoreList =  res;
        }
      }, err => {
        console.log(err);
      });
  }


  intialLoading() {
    this.posModel = '-1';
    this.tableModel = '-1';
    this.waiterModel = '-1';
    this.getPosList();

  }


  initialData() {
    this.isTable = false;
    this.isWaiter = false;
    this.kotList = [];
    this.totalQty = 0.00;
    this.totalRate = 0.00;
    this.totalGst = 0.00;
    this.netAmount = 0.00;
    this.taxRate = 0.00;
  }

  closeDisModel() {
    this.discountBillPopupMode = false;
  }

  changePos() {
    if (this.posModel !== '-1') {
      this.posName = '';
      this.posList.forEach(partner => {
        if (partner.posCode === Number(this.posModel)) {
          this.posName = partner.posName;
        }
      });
      this.initialData();
    } else {
      this.isTable = true;
      this.isWaiter = true;
    }
    this.itemCodeModel = '';
    this.itemNameModel = '';
    this.rateModel = '';
    this.qtyModel = 0;
    this.getTableList(this.posModel);
  }

  changeWaiter() {
    this.waiterName = '';
    this.tableList.forEach(partner => {
      // console.log('this.this.waiterModel..' + this.waiterModel);
      // console.log('this.partner.waiterNo..' + partner.waiterNo);
      if (partner.waiterNo === Number(this.waiterModel)) {
        this.waiterName = partner.waiterName;
      }
    });
    console.log('this.waiterName..' + this.waiterName);

  }

  subTotal(rate, qty) {
    let total = 0;
    total = (parseInt(rate, 10) * parseInt(qty, 10));
    return total;
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
  changeTable() {
    this.itemCodeModel = '';
    this.itemNameModel = '';
    this.rateModel = '';
    this.qtyModel = 0;
    this.getKotDetailListByTable(this.tableModel);
    console.log('this.tableModel ' + this.tableModel);
    // this.tableListByWaiter = this.tableList.filter(tableData => tableData.unqNo === this.tableModel);
    const tableListByWaiter = this.removeDuplicates(this.tableList.filter(tableData => tableData.unqNo === this.tableModel), 'waiterCode');

    this.tableName = '';
    this.tableList.forEach(partner => {
      if (partner.unqNo === Number(this.tableModel)) {
        this.tableName = partner.tableNo;
      }
    });

  }

  onTabEvent(event: Event) {

     console.log('ywgdhqwgdu' + event);

    this.qtyView.nativeElement.focus();

  }


  onEnterEvent() {

  this.addNewItem();


  }

  onKeydown(event) {
    if (event.key === 'Enter') {
      console.log('Enter..' + event);
      this.qtyView.nativeElement.select();
    }

    if (event.key === 'Tab') {
      console.log('Tab' + event);
      this.qtyView.nativeElement.select();
    }

  }


  async getPosList() {
    this.loading = true;
    this.restApiService.getPosList()
      .subscribe((res: PosMaster[]) => {
        if (res != null) {
          this.posList = res;
          this.loading = false;
        }
      }, err => {
        this.loading = false;
        console.log(err);
      });
  }

  async getKotDetailListByTable(tableId) {
    this.loading = true;
    this.restApiService.getKotDetailListByTable(tableId)
      .subscribe((res: KotDetails[]) => {
        if (res != null) {
          this.kotList = res;
          this.totalQty = 0.00;
          this.totalRate = 0.00;
          this.totalGst = 0.00;
          this.taxRate = 0;
          this.netAmount = 0.00;
          this.kotList.forEach(pdto => {
            this.isBillBtn = false;
            this.isDiscountBill = false;
            this.taxRate += pdto.taxRate;
            console.log(' this.taxRate ..' + this.taxRate );
            const taxAmount = (pdto.rate *  pdto.quantity * pdto.taxRate) / 100;
            const totalTaxAmount = (taxAmount);
            const totalRate = (pdto.quantity * pdto.rate);

            this.totalQty += pdto.quantity;
            this.totalRate += totalRate;
            this.totalGst += totalTaxAmount;
            this.netAmount += (totalRate + totalTaxAmount);
          });

          this.loading = false;

        }
      }, err => {
        this.loading = false;
        console.log(err);
      });
  }


  addNewItem() {
      if (Number(this.qtyModel) === 0) {
this.swalAlertService.openSwalAlert('Quantity should not zero', '', 'error');
      } else {
    const totalAmount = Number(this.selectedModel.rate) * Number(this.qtyModel);
    this.kotData = {
      kotPckey: 0, kotNo: '', kotDate: new Date, unqNo: this.tableModel, itemPckey: this.selectedModel.itemPckey,
      itemCode: this.selectedModel.itemCode, itemName: this.selectedModel.itemName, quantity: this.qtyModel,
      rate: this.selectedModel.rate, taxRate: this.selectedModel.taxRate,
      taxAmount: 0, amount: totalAmount ,
       status: 'N', discount: 0,
      reason: '', preferencePckey: 0, printed: 0, pref: '',  posCode: '', posName: '', tableName: '', waiterCode: '', waiterName: ''
    };

    this.kotList.push(this.kotData);
    this.sessionKotList.push(this.kotData);

    this.totalQty = 0.00;
    this.totalRate = 0.00;
    this.totalGst = 0.00;
    this.taxRate = 0;
    this.netAmount = 0.00;
    this.kotList.forEach(pdto => {
      if (pdto.status === 'N') {
        this.isKotEnable = true;

      }

      console.log('pdto.quantity..' + pdto.quantity);
      console.log('pdto.rate..' + pdto.rate);
      const taxAmount = (pdto.rate *  pdto.quantity * pdto.taxRate) / 100;
      console.log('taxAmount' + taxAmount);
      console.log(' pdto.taxAmount' + pdto.taxAmount);
      const totalTaxAmount = taxAmount;
      const totalRate = (pdto.quantity * pdto.rate);

      this.totalQty = (this.totalQty + Number(pdto.quantity));
      console.log('pdto.totalQty..' + this.totalQty);
      this.totalRate += totalRate;
      this.totalGst += totalTaxAmount;
      this.taxRate +=  Number(pdto.taxRate);
      console.log(' this.taxRate2 ..' + this.taxRate );
      this.netAmount += (totalRate + totalTaxAmount);
    });

    this.itemCodeModel = '';
    this.itemNameModel = '';
    this.selectedModel = '';
    this.rateModel = '';
    this.qtyModel = 0;
    this.isDown = true;
    this.isQty = true;
    if (this.isKotEnable) {
      this.isKotBtn = false;
    } else {
      this.isKotBtn = true;
    }

  this.itemCodeView.nativeElement.focus();
}
  }

  deleteItem(kot: KotDetails, itemIndex) {
    this.loading = true;
    this.kotList.splice(itemIndex, 1);

    this.totalQty = 0.00;
    this.totalRate = 0.00;
    this.totalGst = 0.00;
    this.taxRate = 0;
    this.netAmount = 0.00;
    this.kotList.forEach(pdto => {
      if (pdto.status === 'N') {
        this.isKotEnable = true;

      }

      const taxAmount = (pdto.rate * pdto.taxRate) / 100;
      this.taxRate += pdto.taxRate;
      console.log(' this.taxRate 3..' + this.taxRate );
      const totalTaxAmount = taxAmount;
      const totalRate = (pdto.quantity * pdto.rate);

      this.totalQty += Number(pdto.quantity);
      this.totalRate += totalRate;
      this.totalGst += totalTaxAmount;
      this.netAmount += (totalRate + totalTaxAmount);
    });

    this.itemCodeModel = '';
    this.itemNameModel = '';
    this.selectedModel = '';
    this.rateModel = '';
    this.qtyModel = 0;
    this.isDown = true;
    this.isQty = true;
    if (this.isKotEnable) {
      this.isKotBtn = false;
    } else {
      this.isKotBtn = true;
    }
this.sessionKotList = [];
    this.loading = false;

  }


  async getTableList(posCode) {
    this.restApiService.getTableListByPosId(posCode)
      .subscribe((res: TableDto[]) => {
        if (res != null) {
          this.tableList = res;
          console.log(' this.waiterList.filter(tableData => tableData.poscode === posCode)..' + this.jsonPipe.transform(this.waiterCoreList));
          this.waiterFinalList =  this.waiterCoreList.filter(tableData => tableData.poscode === Number(posCode));
        }
      }, err => {
        console.log(err);
      });
  }

  // async getItemWithRateListByItemCode(posCode) {
  //   this.restApiService.getItemWithRateListByItemCode(posCode)
  //     .subscribe((res: TableDto[]) => {
  //       if (res != null) {
  //     this.tableList = res;
  //       }
  //     }, err => {
  //       console.log(err);
  //     });
  // }

  itemCodeSearch = (text$: Observable<number>) => {
    return text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      // switchMap allows returning an observable rather than maps array
      switchMap((searchText) => this.restApiService.getItemWithRateListByItemCode(this.posModel, searchText)),
      catchError(_ => of('no more requests!!!')
      )
    );
  }


  itemNameSearch = (text$: Observable<number>) => {
    return text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      // switchMap allows returning an observable rather than maps array
      switchMap((searchText) => this.restApiService.getItemWithRateListByItemName(this.posModel, searchText)),
      catchError(_ => of('no more requests!!!')
      )
    );
  }

  // search = (text$: Observable<string>) =>
  //   text$.pipe(
  //     debounceTime(200),
  //     map(term => term === '' ? []
  //       : states.filter(v => v.name.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
  //   )

  formatter = (x: { itemCode: string, itemName: string }) => x.itemCode + '--' + x.itemName;

  itemCodeformatterDisplay = (x: { itemCode: string, itemName: string }) => x.itemCode;
  itemNameformatter = (x: { itemCode: string, itemName: string }) => x.itemName;

  itemCodeSelected(e: NgbTypeaheadSelectItemEvent) {
    this.itemNameModel = e.item;
    this.selectedModel = e.item;
    this.rateModel = e.item.rate;
    this.qtyModel = 1;
    if (this.itemNameModel) {
      this.isDown = false;
      this.isQty = false;
    }
    this.qtyView.nativeElement.select();
    console.log('$e.item..' + this.itemNameModel);
  }

  itemNameSelected(e: NgbTypeaheadSelectItemEvent) {
    this.itemCodeModel = e.item;
    this.selectedModel = e.item;
    this.rateModel = e.item.rate;
    this.qtyModel = 1;
    if (this.itemCodeModel) {
      this.isDown = false;
      this.isQty = false;
    }
    console.log('$e.item..' + this.itemCodeModel);
  }

  ngOnInit() {
  }


  selectEvent(item) {
    // do something with selected item
  }

  onChangeSearch(val: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }

  onFocused(e) {
    // do something when input is focused
  }
open() {



}





  async saveKot() {
    this.loading = true;

    const currentDateTime =   this.datePipe.transform(new Date(), 'HH:mm');
    this.tableCustomModal = {
      unqNo: this.tableModel ,   tableNo: '',   posCode:  this.posModel,   tableStatus: 1,
        pax: 1,   sitTime: currentDateTime ,   waiterNo: this.waiterModel,   waiterName: '',
        Discount: 0,   sitActive: '',   sitHour: '',   sitMin: '',
        sit: '',   totalAmount: 0
      };

    this.posName = '';
    this.posList.forEach(partner => {
      if (partner.posCode === Number(this.posModel)) {
        this.posName = partner.posName;
      }
    });

    this.tableName = '';
     this.tableList.forEach(partner => {
       if (partner.unqNo === Number(this.tableModel)) {
         this.tableName = partner.tableNo;
       }
     });

     this.waiterName = '';
     this.waiterFinalList.forEach(partner => {
       if (partner.waiterNo === Number(this.waiterModel)) {
         this.waiterName = partner.waiterName;
       }
     });


     this.restApiService.saveKot(this.tableModel, this.posName, this.tableName, this.waiterName, this.sessionKotList)
     .subscribe((res: KotDetails[]) => {
       if (res != null) {
         this.kotList = res;
         this.sessionKotList = [];
         this.isBillBtn = false;
         this.isDiscountBill = false;
         this.loading = false;
         this.isKotBtn = true;
         this.swalAlertService.openSwalAlert('KOT is successfully generated', '', 'success');
       }
     }, err => {
       this.loading = false;
       console.log(err);
     });


    this.restApiService.updateTable(this.tableModel, this.tableCustomModal)
      .subscribe((res: TableCustomModal) => {
        if (res != null) {
          this.loading = false;
        }
      }, err => {
        this.loading = false;
        console.log(err);
      });
  }

  discountBill() {
    let discountPerAmout = 0;
  if ( this.discountTypeModel === '1') {
    discountPerAmout =  (this.totalRate * this.discountModel) / 100;
    this.disCountAmount = discountPerAmout;
    this.discountRate = this.discountModel;
  } else if ( this.discountTypeModel === '2') {

    discountPerAmout =  this.totalRate / this.discountModel;
    this.disCountAmount = this.discountModel;
    this.discountRate = discountPerAmout;
  }
  // const totalWithDiscount = this.totalRate - this.disCountAmount;

  // const totalTaxAmount = (totalWithDiscount * this.taxRate) / 100;
  // this.totalGst = totalTaxAmount;
  this.saveBill();
  this.discountBillPopupMode = false;
  }

  saveBill() {

    this.posName = '';
    this.posList.forEach(partner => {
      if (partner.posCode === Number(this.posModel)) {
        this.posName = partner.posName;
      }
    });

    this.tableName = '';
     this.tableList.forEach(partner => {
       if (partner.unqNo === Number(this.tableModel)) {
         this.tableName = partner.tableNo;
       }
     });

     this.waiterName = '';
     this.waiterFinalList.forEach(partner => {
       if (partner.waiterNo === Number(this.waiterModel)) {
         this.waiterName = partner.waiterName;
       }
     });

    this.billHead = {
      posCode: this.posModel, netamount: this.netAmount,
      posName: this.posName, waiterName: this.waiterName, tableName: this.tableName,
      waiterNo: this.waiterModel, unqNo: this.tableModel,
      totalRate: this.totalRate, discountRate: this.discountRate, billDate: this.appSettingService.globelBillDate,
      disCountAmount: this.disCountAmount, taxAmount: this.totalGst, taxRate: this.taxRate, pax: 1, kotDetails : this.kotList
    };

    console.log('jsonPipe..' + this.jsonPipe.transform(this.billHead.billDate));
    this.restApiService.saveBill(this.billHead)
    .subscribe((res: KotDetails[]) => {
      if (res != null) {
        this.kotList = [];
        this.sessionKotList = [];
        this.loading = false;
        this.totalQty = 0.00;
    this.totalRate = 0.00;
    this.totalGst = 0.00;
    this.netAmount = 0.00;
    this.taxRate = 0.00;
    this.discountRate = 0.00;
    this.disCountAmount = 0.00;
    // Disable
    this.isDiscountBill = true;
    this.isBillBtn = true;
    this.isKotBtn = true;
    this.discountModel = 0;
    this.swalAlertService.openSwalAlert('Bill is successfully generated', '', 'success');
      }
    }, err => {
      this.loading = false;
      console.log(err);
    });

  }

  discountBillPopup() {
this.discountBillPopupMode = true;
  }


}
