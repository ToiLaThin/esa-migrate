import { Component, EventEmitter, Input, Output } from "@angular/core";
import { ColorSvgNames } from "../../share-components/svg-definitions/color-svg-names.enum";
import { LayoutClassName } from "../class/layout-class";

@Component({
    selector: "esa-option-horizontal",
    templateUrl: "./option-horizontal.component.html",
})
export class OptionHorizontalComponent {

    get ColorSvgNames() {
        return ColorSvgNames;
    }

    get LayoutClassName() {
        return LayoutClassName;
    }
    @Input({required: true}) optionHorizontalExpanded: boolean = false;
    @Output() orderListNavigated: EventEmitter<void> = new EventEmitter<void>();
    @Output() productWishListNavigated: EventEmitter<void> = new EventEmitter<void>();
    
    constructor() {}

    navigateToOrderList() {
        this.orderListNavigated.emit();
    }

    navigateToProductWishList() {
        this.productWishListNavigated.emit();
    }
}