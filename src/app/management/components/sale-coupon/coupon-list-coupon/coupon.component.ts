import { Component, Input } from '@angular/core';
import { DiscountType } from '../../../../core/models/sale-item.interface';

@Component({
    selector: 'esa-coupon',
    templateUrl: './coupon.component.html',
    styleUrls: ['./coupon.component.scss']
})
export class CouponListCouponComponent {
    @Input({ required: true }) size: 'sm' | 'md' | 'lg' = 'md';
    @Input({ required: true }) discountType: DiscountType = DiscountType.ByPercent;
    @Input({ required: true }) discountValue!: number;
    @Input({ required: true }) dateExpired!: Date;

    get DiscountType() {
        return DiscountType;
    }
}
