import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, RequiredValidator, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { DiscountType } from '../../../../core/models/sale-item.interface';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { formatDate } from '@angular/common';
import { ICoupon } from '../../../../core/models/coupon.interface';
import { saleCouponManagementActions } from '../../../state/sale-coupon-management/sale-coupon-management.actions';

@Component({
    selector: 'esa-management-coupon-add-modal',
    templateUrl: './coupon-add-modal.component.html',
    styleUrls: ['./coupon-add-modal.component.scss']
})
export class CouponAddModalComponent implements OnInit {
    modelCouponFormGroup!: FormGroup;

    discountTypeKeyArr = Object.keys(DiscountType)
        .map((x) => parseInt(x))
        .filter((x) => !isNaN(x) && x !== DiscountType.NoDiscount);
    discountTypeKeyValueArr = this.discountTypeKeyArr.map((key) => {
        return {
            key: key,
            value: DiscountType[key]
        };
    });
    constructor(private _store: Store, private _fb: FormBuilder, private _modalRef: NzModalRef) {}

    ngOnInit(): void {
        this.modelCouponFormGroup = this._fb.group({
            couponCode: ['', Validators.required],
            discountType: [DiscountType.ByPercent],
            discountValue: [2, Validators.required],
            minOrderValueToApply: [0, Validators.required],
            dateAdded: new FormControl(
                formatDate(new Date(), 'MM-dd-yyyy', 'en'),
                Validators.required
            ),
            dateEnded: new FormControl(
                formatDate(new Date(), 'MM-dd-yyyy', 'en'),
                Validators.required
            ),
            rewardPointRequire: [0, Validators.required]
        });
    }

    resetFormValues() {
        this.modelCouponFormGroup.patchValue({
            couponCode: '',
            discountType: DiscountType.ByPercent, //must be number
            discountValue: 2,
            minOrderValueToApply: 0,
            dateAdded: formatDate(new Date(), 'MM-dd-yyyy', 'en'),
            dateEnded: formatDate(new Date(), 'MM-dd-yyyy', 'en'),
            rewardPointRequire: 0
        });
    }

    addNewCoupon() {
        let newCoupon: ICoupon = {
            couponCode: this.modelCouponFormGroup.value.couponCode,
            discountType: parseInt(this.modelCouponFormGroup.value.discountType), //because the key in frontend is str due to {{}}
            discountValue: this.modelCouponFormGroup.value.discountValue,
            minOrderValueToApply: this.modelCouponFormGroup.value.minOrderValueToApply,
            dateAdded: new Date(this.modelCouponFormGroup.value.dateAdded),
            dateEnded: new Date(this.modelCouponFormGroup.value.dateEnded),
            rewardPointRequire: this.modelCouponFormGroup.value.rewardPointRequire
        };
        this._store.dispatch(saleCouponManagementActions.addNewCoupon({ coupon: newCoupon }));
        this.resetFormValues();
    }

    cancelAddCoupon() {
        this._modalRef.close();
    }
}
