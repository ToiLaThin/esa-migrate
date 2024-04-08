import { Component, Input } from "@angular/core";
import { IOrderDraftViewModel } from "../../../../core/models/order.interface";
import { ColorSvgNames } from "../../../../share-components/svg-definitions/color-svg-names.enum";

@Component({
    selector: "esa-order-list-card",
    templateUrl: "./order-list-card.component.html",
    styleUrls: ["./order-list-card.component.scss"]
})
export class OrderListCardComponent {
    @Input({required: true}) order!: IOrderDraftViewModel;
    get ColorSvgNames() {
        return ColorSvgNames;
    }
    
    constructor() {}
}