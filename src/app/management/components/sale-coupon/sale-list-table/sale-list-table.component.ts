import { Component, Input, OnInit } from "@angular/core";
import { PillType } from "../../../../core/ui-models/pill-type";
import { Observable } from "rxjs";
import { IProduct } from "../../../../core/models/product.interface";
export enum OrderStatus {
    CANCELED = 'Canceled',
    DELIVERED = 'Delivered',
    PROCESSING = 'Processing'
}

export enum PaymentMode {
    CASH = 'Cash On Delivery',
    BANK = 'Transfer Bank'
}

export interface ITableRow {
    id: string;
    product: string;
    productImg: string;
    customer: string;
    date: Date;
    amount: number;
    paymentMode: PaymentMode,
    orderStatus: OrderStatus
}

@Component({
    selector: 'esa-sale-list-table',
    templateUrl: 'sale-list-table.component.html',
    styleUrls: ['./sale-list-table.component.scss']
})
export class SaleListTableComponent implements OnInit {

    get PillType() {
        return PillType;
    }
    @Input({required: true}) displayingProducts$!: Observable<IProduct[]>;

    constructor() {}

    ngOnInit(): void {
        console.log("table list component init")
    }
}