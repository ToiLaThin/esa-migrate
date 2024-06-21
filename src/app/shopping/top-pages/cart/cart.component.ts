import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ICartConfirmRequest, ICartItem } from '../../../core/models/cart-item.interface';
import { Observable, Subscription, tap, map } from 'rxjs';
import { Store } from '@ngrx/store';
import {
    selectorAllActiveCouponsNotUsedByUser,
    selectorCouponApplied,
    selectorCouponCodeApplied,
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
import { selectorUserId } from '../../../auth/state/auth.selectors';
import { authFeatureKey } from '../../../auth/state/auth.reducers';
import { IAuthState } from '../../../auth/state/authState.interface';
import { selectorUserRewardPoints } from '../../../management/state/management/management.selectors';
import { managementFeatureKey } from '../../../management/state/management/management.reducers';
import { IManagementState } from '../../../management/state/management/managementState.interface';
import { CartClassName } from '../../class/cart-class';
import { I18NCartIdSelector } from '../../translate-ids/i18n-cart-id';
import { I18NCommonIdSelector } from '../../../core/translation-loader/i18n-common-id';
import { productActions } from '../../state/product/product.actions';
import { IProduct } from '../../../core/models/product.interface';
import { selectorCrossSellingProducts, selectorIsLoadingCrossSellingProducts } from '../../state/product/product.selectors';
import { productFeatureKey } from '../../state/product/product.reducers';
import { IProductState } from '../../state/product/productState.interface';
import { Router } from '@angular/router';
import { ProductClassName } from '../../class/product-class';
import { GgAnalyticsService } from '../../../core/services/gg-analytics.service';

@Component({
    selector: 'esa-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
    cartItems$!: Observable<ICartItem[]>;
    crossSellingProducts$!: Observable<IProduct[]>;
    isLoadingCrossSellingProducts$!: Observable<boolean>;

    subItemsPrice$!: Observable<number>;
    subItemsAfterSalePrice$!: Observable<number>;
    discountAmountSale$!: Observable<number>;

    discountAmountCoupon$!: Observable<number>;
    subItemsAfterSaleThenCouponPrice$!: Observable<number>;
    allActiveCouponsNotUsedByUser$!: Observable<ICoupon[]>;
    couponApplied$!: Observable<boolean>;

    @ViewChild('couponCodeApply', { read: ElementRef })
    couponCodeInputted!: ElementRef<HTMLInputElement>;

    get CartClassName() {
        return CartClassName;
    }

    get I18NCartIds() {
        return I18NCartIdSelector;
    }

    get I18NCommonIds() {
        return I18NCommonIdSelector;
    }

    get ProductClassName() {
        return ProductClassName;
    }

    constructor(
        private _store: Store,
        private _nzNotificationService: NzNotificationService,
        private _router: Router,
        private _analyticsService: GgAnalyticsService
    ) {}

    ngOnInit(): void {
        this._store.dispatch(cartActions.loadActiveCouponsNotUsedByUser());

        this.cartItems$ = this._store.select((state) =>
            selectorItemsInCart(state as { [cartFeatureKey]: ICartState })
        );

        this.crossSellingProducts$ = this._store.select((state) =>
            selectorCrossSellingProducts(state as { [productFeatureKey]: IProductState })
        );
        this.isLoadingCrossSellingProducts$ = this._store.select((state) =>
            selectorIsLoadingCrossSellingProducts(state as { [productFeatureKey]: IProductState })
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

        let cartItemSubscription = this.cartItems$.subscribe((cartItems) => {
            if (cartItems.length > 0 && cartItems !== null && cartItems !== undefined) {
                let productInCartBusinessKeys = cartItems.map(
                    (cartItem) => cartItem.businessKey
                ) as string[];
                this._store.dispatch(
                    productActions.loadCrossSellingProductsMetaDataOfProductsInCart({
                        cartProductBusinessKeys: productInCartBusinessKeys
                    })
                );
            }
        });
        cartItemSubscription.unsubscribe();
    }

    viewProductQuickView(productId: string | undefined) {
        this._router.navigate(['shopping', 'product-quickview', productId]);
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

    confirmCart() {
        let currentItemsInCart: ICartItem[] = [];
        let curentUserId: string | undefined = undefined;
        let couponCodeApplied: string | undefined = undefined;
        let tempSubscription: Subscription;

        tempSubscription = this.cartItems$.subscribe((cartItems) => {
            if (cartItems.length === 0) {
                this._nzNotificationService.error('Cart is empty', '');
                return;
            }
            currentItemsInCart = cartItems;
        });
        tempSubscription.unsubscribe();

        tempSubscription = this._store
            .select((state) => selectorUserId(state as { [authFeatureKey]: IAuthState }))
            .subscribe((userId) => {
                curentUserId = userId;
            });
        tempSubscription.unsubscribe();

        tempSubscription = this._store
            .select((state) => selectorCouponCodeApplied(state as { [cartFeatureKey]: ICartState }))
            .subscribe((couponCode) => {
                couponCodeApplied = couponCode;
            });
        tempSubscription.unsubscribe();

        //if user id is undefined, return
        if (!curentUserId) {
            this._nzNotificationService.error('User not logged in', '');
            return;
        }

        let cartConfirmReq: ICartConfirmRequest = {
            cartItems: currentItemsInCart,
            userId: curentUserId!,
            couponCode: couponCodeApplied === '' ? undefined : couponCodeApplied
            //string.empty might cause err so we convert to undefined
        };
        //undefined if no coupon applied and  will not have couponCode field in CartConfirmRequestDTO in backend
        console.log('cartRequest', cartConfirmReq);
        this._analyticsService.beginCheckout(cartConfirmReq);
        this._store.dispatch(cartActions.confirmCart({ cartConfirmRequest: cartConfirmReq }));
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
        let currentUserRewardPoint: number | undefined;
        let tempSubscription: Subscription;
        tempSubscription = this._store
            .select((state) =>
                selectorUserRewardPoints(state as { [managementFeatureKey]: IManagementState })
            )
            .pipe(tap((rewardPoint) => (currentUserRewardPoint = rewardPoint)))
            .subscribe();
        tempSubscription.unsubscribe();

        if (currentUserRewardPoint === undefined) {
            this._nzNotificationService.error('User reward point is not valid', '');
            return false;
        }
        if (coupon.rewardPointRequire === undefined) {
            this._nzNotificationService.error('Min reward point is not valid', '');
            return false;
        }

        if (currentUserRewardPoint < coupon.rewardPointRequire) {
            this._nzNotificationService.error('User reward point is not enough', '');
            return false;
        }
        return true;
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
