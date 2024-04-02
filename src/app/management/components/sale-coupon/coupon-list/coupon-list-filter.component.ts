import { Component, Input } from "@angular/core";
import { NzModalService } from "ng-zorro-antd/modal";
import { CouponListAdvanceFilterComponent } from "./coupon-list-advance-filter.component";

@Component({
    selector: 'esa-coupon-list-filter',
    templateUrl: './coupon-list-filter.component.html',
    styleUrls: ['./coupon-list-filter.component.scss']
})
export class CouponListFilterComponent {

    showAdvanceFilter: boolean = false;

    constructor(private _modalService: NzModalService) {}

    checkOpenAdvanceFilter() {
        if (this.showAdvanceFilter === false) {
            return;
        }
        this._modalService.create({
            nzContent: CouponListAdvanceFilterComponent,
            nzClosable: true,
            nzFooter: null,
            nzWidth: 500,
            //somehow when close must reset showAdvanceFilter = false
        })
    }

    closeAdvanceFilter() {
        this.showAdvanceFilter = false;
    }
}