import { Component, Input } from "@angular/core";
import { IOrderAggregateCart } from "../../../../core/models/order.interface";
import { ColorSvgNames } from "../../../../share-components/svg-definitions/color-svg-names.enum";
import { OrderStatus } from "../../../../core/types/order-status.enum";

@Component({
    selector: "esa-order-list-card",
    templateUrl: "./order-list-card.component.html",
    styleUrls: ["./order-list-card.component.scss"]
})
export class OrderListCardComponent {
    @Input({required: true}) orderAggregateCart!: IOrderAggregateCart;
    get ColorSvgNames() {
        return ColorSvgNames;
    }

    get OrderStatus() {
        return OrderStatus;
    }
    
    constructor() {}
}