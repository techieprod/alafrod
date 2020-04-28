export class ItemWiseReportCustomModel {
    constructor(public  groupCode: string,
        public  groupName: string,
        public  itemCategory: string,
        public  itemName: string,
        public  billDate: string,
        public  serviceCharge: number,
        public  grsAmount: number,
        public  taxRate: number,
        public  rate: number,
        public  qty: number,
        public  netamount: number) {}
}
