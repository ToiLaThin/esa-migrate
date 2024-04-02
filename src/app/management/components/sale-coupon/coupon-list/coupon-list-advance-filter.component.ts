import { Component } from "@angular/core";
import { NzModalRef } from "ng-zorro-antd/modal";

@Component({
    selector: 'esa-coupon-list-advance-filter',
    templateUrl: './coupon-list-advance-filter.component.html',
    styleUrls: ['./coupon-list-advance-filter.component.scss']
})
export class CouponListAdvanceFilterComponent {
    // constructor(private _modalRef: NzModalRef) {}
    constructor() {}

    showAdvanceFilter: boolean = false;
    minPrice: number = 0;
    maxPrice: number = 100;
    fromPrice: number = this.minPrice;
    toPrice: number = this.maxPrice;
    step = 5;

    priceRange: number[] = [this.minPrice, this.maxPrice];

    logPriceRange() {
        console.log(this.priceRange);
    }

    closeAdvanceFilter() {
        // this._modalRef.close();
    }

    clearAdvanceFilter() {
    }
}