export class KotDetails {
    constructor(public  posCode: string,
        public  posName: string,
        public  tableName: string,
        public  waiterCode: string,
        public  waiterName: string,
        public kotPckey: number, public kotNo: string, public kotDate: Date, public unqNo: number, public itemPckey: number,
        public itemCode: string, public itemName: string, public quantity: number, public rate: number, public taxRate: number,
        public taxAmount: number, public amount: number, public status: string, public discount: number, public reason: string,
        public preferencePckey: number, public printed: number, public pref: string) {}
}
