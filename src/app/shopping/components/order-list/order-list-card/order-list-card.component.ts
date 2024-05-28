import { Component, EventEmitter, Input, Output } from "@angular/core";
import { IOrderAggregateCart } from "../../../../core/models/order.interface";
import { ColorSvgNames } from "../../../../share-components/svg-definitions/color-svg-names.enum";
import { OrderStatus } from "../../../../core/types/order-status.enum";
import { NzDrawerService } from "ng-zorro-antd/drawer";
import { OrderDetailDrawerComponent } from "../order-detail-drawer/order-detail-drawer.component";

@Component({
    selector: "esa-order-list-card",
    templateUrl: "./order-list-card.component.html",
    styleUrls: ["./order-list-card.component.scss"]
})
export class OrderListCardComponent {
    @Input({required: true}) orderAggregateCart!: IOrderAggregateCart;
    @Output() reOrdered = new EventEmitter<string[]>();
    get ColorSvgNames() {
        return ColorSvgNames;
    }

    get OrderStatus() {
        return OrderStatus;
    }
    
    constructor(private _drawerService: NzDrawerService) {}

    viewDetailOrder() {
        this._drawerService.create({
            nzTitle: undefined,
            nzContent: OrderDetailDrawerComponent,
            nzPlacement: 'right',
            nzFooter: undefined,
            nzWidth: '35%',
            nzData: {
                orderAggregateCart: this.orderAggregateCart
            }
        });
    }

    reOrder() {
        //output for parent component to handle reorder
        let productBusinessKeys = this.orderAggregateCart.cart.items.map(orderItem => orderItem.cartItemBusinessKey as string);
        this.reOrdered.emit(productBusinessKeys);
    }
}