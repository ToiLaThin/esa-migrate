import { Component } from "@angular/core";
import { NzModalService } from "ng-zorro-antd/modal";
import { CouponAddModalComponent } from "../coupon-add-modal/coupon-add-modal.component";

@Component({
    selector: 'esa-management-coupon-list',
    templateUrl: 'coupon-list.component.html',
    styleUrls: ['coupon-list.component.scss']
})
export class CouponListManagementComponent {
    constructor(private _modalService: NzModalService) {}

    openAddNewCouponModal() {
        this._modalService.create({
            nzContent: CouponAddModalComponent,
            nzClosable: true,
            nzFooter: null,
            nzWidth: 700,
            nzNoAnimation: false
        })
    }
}