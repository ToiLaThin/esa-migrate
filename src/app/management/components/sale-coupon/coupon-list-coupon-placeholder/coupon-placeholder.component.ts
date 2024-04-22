import { Component, Input } from "@angular/core";
import { OutlineSvgNames } from "../../../../share-components/svg-definitions/outline-svg-names.enum";

@Component({
    selector: 'esa-coupon-placeholder',
    templateUrl: './coupon-placeholder.component.html',
    styleUrls: ['./coupon-placeholder.component.scss']
})
export class CouponListCouponPlaceholderComponent {
    @Input() type!: 'add' | 'edit' | 'delete';

    get OutlineSvgNames() {
        return OutlineSvgNames;
    }
    constructor() {}
}