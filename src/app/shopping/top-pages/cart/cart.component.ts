import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ICartItem } from '../../../core/models/cart-item.interface';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import {
    selectorAllActiveCouponsNotUsedByUser,
    selectorCouponApplied,
    selectorDiscountAmountCoupon,
    selectorDiscountAmountSale,
    selectorItemsInCart,
    selectorSubItemsAfterSalePrice,
    selectorSubItemsAfterSaleThenCouponPrice,
    selectorSubItemsPrice
} from '../../state/cart/cart.selectors';
import { cartFeatureKey } from '../../state/cart/cart.reducers';
import { ICartState } from '../../state/cart/cartState.interface';
import { cartActions } from '../../state/cart/cart.actions';
import { ICoupon } from '../../../core/models/coupon.interface';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { DiscountType } from '../../../core/models/sale-item.interface';

@Component({
    selector: 'esa-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
    cartItems$!: Observable<ICartItem[]>;
    subItemsPrice$!: Observable<number>;
    subItemsAfterSalePrice$!: Observable<number>;
    discountAmountSale$!: Observable<number>;

    discountAmountCoupon$!: Observable<number>;
    subItemsAfterSaleThenCouponPrice$!: Observable<number>;
    allActiveCouponsNotUsedByUser$!: Observable<ICoupon[]>;
    couponApplied$!: Observable<boolean>;

    @ViewChild('couponCodeApply', { read: ElementRef })
    couponCodeInputted!: ElementRef<HTMLInputElement>;

    constructor(private _store: Store, private _nzNotificationService: NzNotificationService) {}

    ngOnInit(): void {
        this._store.dispatch(cartActions.loadActiveCouponsNotUsedByUser());

        this.cartItems$ = this._store.select((state) =>
            selectorItemsInCart(state as { [cartFeatureKey]: ICartState })
        );
        this.subItemsPrice$ = this._store.select((state) =>
            selectorSubItemsPrice(state as { [cartFeatureKey]: ICartState })
        );
        this.subItemsAfterSalePrice$ = this._store.select((state) =>
            selectorSubItemsAfterSalePrice(state as { [cartFeatureKey]: ICartState })
        );
        this.discountAmountSale$ = this._store.select((state) =>
            selectorDiscountAmountSale(state as { [cartFeatureKey]: ICartState })
        );
        this.couponApplied$ = this._store.select((state) =>
            selectorCouponApplied(state as { [cartFeatureKey]: ICartState })
        );
        this.allActiveCouponsNotUsedByUser$ = this._store.select((state) =>
            selectorAllActiveCouponsNotUsedByUser(state as { [cartFeatureKey]: ICartState })
        );
        this.discountAmountCoupon$ = this._store.select((state) =>
            selectorDiscountAmountCoupon(state as { [cartFeatureKey]: ICartState })
        );
        this.subItemsAfterSaleThenCouponPrice$ = this._store.select((state) =>
            selectorSubItemsAfterSaleThenCouponPrice(state as { [cartFeatureKey]: ICartState })
        );
    }

    clearCart() {
        this._store.dispatch(cartActions.cartClear());
    }

    removeCartItemFromCart(idxItemInCart: number) {
        console.log('removeCartItemFromCart', idxItemInCart);
        this._store.dispatch(cartActions.removeCartItem({ idxItemInCart: idxItemInCart }));
    }

    changeCartItemQuantity(indexInCart: number, event: Event) {
        let quantity = (event.target as HTMLInputElement).valueAsNumber;
        this._store.dispatch(
            cartActions.changeCartItemQuantity({
                idxItemInCart: indexInCart,
                newQuantity: quantity
            })
        );
    }

    removeCoupon() {
        this._store.dispatch(cartActions.removeCouponApplied());
    }

    applyCoupon() {
        //already casted to HTMLInputElement in ViewChild
        let inputtedCouponCode = this.couponCodeInputted.nativeElement.value;
        let tempSubscription = this.allActiveCouponsNotUsedByUser$.subscribe(
            (allActiveCouponsNotUsedByUser) => {
                let coupon = allActiveCouponsNotUsedByUser.find(
                    (coupon) => coupon.couponCode === inputtedCouponCode
                );
                if (coupon === undefined || coupon === null) {
                    this._nzNotificationService.error('Not coupon valid', '');
                    return;
                }
                let userRewardPointAndCartPriceValid =
                    this.checkUserRewardPointValidForCoupon(coupon!) === true &&
                    this.checkCartPriceValidForCoupon(coupon!) === true;
                if (userRewardPointAndCartPriceValid) {
                    this.notifyStoreCouponApplied(coupon!);
                }
            }
        );
        tempSubscription.unsubscribe();
    }

    private checkCartPriceValidForCoupon(coupon: ICoupon): boolean {
        let flag = false;
        let subItemAfterSalePrcieSubscription = this.subItemsAfterSalePrice$.subscribe(
            (subItemsAfterSalePrice) => {
                if (subItemsAfterSalePrice >= coupon.minOrderValueToApply) {
                    flag = true;
                } else {
                    flag = false;
                    this._nzNotificationService.error('Min cart price is not valid', '');
                }
            }
        );
        subItemAfterSalePrcieSubscription.unsubscribe();
        return flag;
    }

    private checkUserRewardPointValidForCoupon(coupon: ICoupon): boolean {
        return true; //TODO: implement
    }

    private notifyStoreCouponApplied(coupon: ICoupon) {
        //depend on the discount type, we will calculate the discount amount with the discount value
        //then call the store to dispatch applyCoupon action
        //it will modify the discountAmountByCoupon and affect the subItemsAfterSaleThenCouponPrice selector

        if (
            coupon.discountType !== DiscountType.ByPercent &&
            coupon.discountType !== DiscountType.ByValue
        ) {
            this._nzNotificationService.error('No discount type valid', '');
            return;
        }
        if (coupon.discountType === DiscountType.ByPercent) {
            const couponDiscountValue = coupon.discountValue;
            let tempSubscription = this.subItemsAfterSalePrice$.subscribe((afterSalePrice) => {
                const discountAmount = (afterSalePrice * couponDiscountValue) / 100;
                this._store.dispatch(
                    cartActions.applyCoupon({ discountAmount, couponCode: coupon.couponCode })
                );
            });
            tempSubscription.unsubscribe();
        } else if (coupon.discountType === DiscountType.ByValue) {
            let discountAmount = coupon.discountValue;
            this._store.dispatch(
                cartActions.applyCoupon({
                    discountAmount: discountAmount,
                    couponCode: coupon.couponCode
                })
            );
        }
    }
}
