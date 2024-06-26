import { Component, EventEmitter, Output } from "@angular/core";
import { ColorSvgNames } from "../../share-components/svg-definitions/color-svg-names.enum";

@Component({
    selector: "esa-option-vertical",
    templateUrl: "./option-vertical.component.html",
})
export class OptionVerticalComponent {
    get ColorSvgNames() {
        return ColorSvgNames;
    }

    @Output() orderListNavigated: EventEmitter<void> = new EventEmitter<void>();
    @Output() productWishListNavigated: EventEmitter<void> = new EventEmitter<void>();
    constructor() {}

    log() {
        console.log('OptionVerticalComponent');
    }

    navigateToOrderList() {
        this.orderListNavigated.emit();
    }

    navigateToProductWishList() {
        this.productWishListNavigated.emit();
    }

}