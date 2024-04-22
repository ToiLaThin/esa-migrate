import { Component } from "@angular/core";
import { OutlineSvgNames } from "../../../share-components/svg-definitions/outline-svg-names.enum";

@Component({
    selector: 'esa-management-sale-coupon',
    templateUrl: 'sale-coupon.component.html',
    styleUrls: ['./sale-coupon.component.scss']
})
export class SaleCouponComponent {
    constructor() {}

    get OutlineSvgNames() {
        return OutlineSvgNames;
    }
}