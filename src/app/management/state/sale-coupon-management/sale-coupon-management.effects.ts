import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CouponService } from '../../../core/services/coupon.service';
import { saleCouponManagementActions } from './sale-coupon-management.actions';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Injectable({ providedIn: 'root' })
export class SaleCouponManagementEffects {
    constructor(
        private actions$: Actions,
        private _couponService: CouponService,
        private _notificationService: NzNotificationService
    ) {}

    addCouponEffect = createEffect(() =>
        this.actions$.pipe(
            ofType(saleCouponManagementActions.addNewCoupon),
            switchMap((action) =>
                this._couponService.addCoupon(action.coupon).pipe(
                    map((addedCoupon) =>
                        saleCouponManagementActions.addNewCouponSuccess({
                            addedCoupon: addedCoupon
                        })
                    ),
                    tap((action) =>
                        this._notificationService.create(
                            'success',
                            `Coupon with code "${action.addedCoupon.couponCode}" added successfully`,
                            ''
                        )
                    ),
                    catchError((err) => {
                        this._notificationService.create('error', `Error: ${err.title}`, '');
                        return of(saleCouponManagementActions.addNewCouponFailed({ error: err }));
                    })
                )
            )
        )
    );


    loadAllCouponsEffect = createEffect(() =>
        this.actions$.pipe(
            ofType(saleCouponManagementActions.loadAllCoupons),
            switchMap((action) =>
                this._couponService.getAllCoupons().pipe(
                    map((coupons) =>
                        saleCouponManagementActions.loadAllCouponsSuccess({
                            loadedCoupons: coupons,
                            total: coupons.length
                        })
                    ),
                    tap(() => this._notificationService.create('success', 'All coupons loaded successfully', '')),
                    catchError((err) => {
                        this._notificationService.create('error', `Error: ${err.title}`, '');
                        return of(saleCouponManagementActions.loadAllCouponsFailed({ error: err }));
                    })
                )
            )
        )
    );
}
