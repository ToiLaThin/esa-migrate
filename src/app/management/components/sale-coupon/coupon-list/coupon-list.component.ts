import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { CouponAddModalComponent } from '../coupon-add-modal/coupon-add-modal.component';
import { DiscountType } from '../../../../core/models/sale-item.interface';
import { ICoupon } from '../../../../core/models/coupon.interface';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectorAllCoupons } from '../../../state/sale-coupon-management/sale-coupon-management.selectors';
import { saleCouponManagementFeatureKey } from '../../../state/sale-coupon-management/sale-coupon-management.reducers';
import { ISaleCouponManagementState } from '../../../state/sale-coupon-management/saleCouponManagementState.interface';
import { saleCouponManagementActions } from '../../../state/sale-coupon-management/sale-coupon-management.actions';
import { OutlineSvgNames } from '../../../../share-components/svg-definitions/outline-svg-names.enum';

@Component({
    selector: 'esa-management-coupon-list',
    templateUrl: 'coupon-list.component.html',
    styleUrls: ['coupon-list.component.scss']
})
export class CouponListManagementComponent implements OnInit {
    siderToggled: boolean = false;
    allCoupons$!: Observable<ICoupon[]>;
    get DiscountType() {
        return DiscountType;
    }

    constructor(private _modalService: NzModalService, private _store: Store) {
        this._store.dispatch(saleCouponManagementActions.loadAllCoupons());
    }

    get OutlineSvgNames() {
        return OutlineSvgNames;
    }
    
    ngOnInit(): void {
        this.allCoupons$ = this._store.select((state) =>
            selectorAllCoupons(
                state as { [saleCouponManagementFeatureKey]: ISaleCouponManagementState }
            )
        );
    }

    toggleSider() {
        this.siderToggled = !this.siderToggled;
        console.log(this.siderToggled);
    }

    openAddNewCouponModal() {
        this._modalService.create({
            nzContent: CouponAddModalComponent,
            nzClosable: true,
            nzFooter: null,
            nzWidth: 700,
            nzNoAnimation: false
        });
    }
}
