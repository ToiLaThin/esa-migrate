import { Component, Input } from "@angular/core";

@Component({
    selector: 'esa-coupon-placeholder',
    templateUrl: './coupon-placeholder.component.html',
    styleUrls: ['./coupon-placeholder.component.scss']
})
export class CouponListCouponPlaceholderComponent {
    @Input() type!: 'add' | 'edit' | 'delete';
    constructor() {}
}