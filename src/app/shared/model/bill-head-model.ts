import { KotDetails } from './kot-details';

export class BillHeadModel {
    constructor(	public  posCode: number,
        public  posName: string,
        public  netamount: number,
        public  waiterNo: number,
        public  waiterName: string,
        public  unqNo: number,
        public  tableName: string,
        public  totalRate: number,
        public  discountRate: number,
        public  disCountAmount: number,
        public  taxAmount: number,
        public  taxRate: number,
        public  pax: number,
        public  billDate: string,
        public  kotDetails: KotDetails[]) {

    }
}
