export class TableDto {
    constructor(public unqNo: number, public tableNo: string, public posCode: number,
                public  tableStatus: number, public pax: number, public sitTime: string , public waiterNo: number,
        public waiterName: string, public Discount: number, public sitActive: string, public sitHour: string,
        public sitMin: string, public sit: string, public totalAmount: number) {

    }
}
