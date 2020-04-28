export class ItemModel {
    constructor(public itemPckey: number, public itemCode: string, public groupCode: number, public itemName: string,
        public rate: string, public taxRate: string, public active: string, public status: string,
        public totalMl: string, public uom: string ) {}
}
