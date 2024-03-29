import { Component } from "@angular/core";

@Component({
    selector: 'esa-management-coupon-add-modal',
    templateUrl: './coupon-add-modal.component.html',
    styleUrls: ['./coupon-add-modal.component.scss']
})
export class CouponAddModalComponent {
    todayDefaultInputValue: Date = new Date()
    constructor() {}
}
