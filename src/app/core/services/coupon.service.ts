import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { ICoupon } from '../models/coupon.interface';
import { environment as env } from '../../../environments/environment.development';
import { selectorUserId } from '../../auth/state/auth.selectors';
import { authFeatureKey } from '../../auth/state/auth.reducers';
import { IAuthState } from '../../auth/state/authState.interface';
import { Subscription } from 'rxjs';
@Injectable({
    providedIn: 'root'
})
export class CouponService {
    constructor(private _http: HttpClient, private _store: Store) {}

    public getAllCoupons() {
        return this._http.get<ICoupon[]>(
            `${env.BASEURL}/api/CouponSaleItem/CouponAPI/GetAllCoupons`
        );
    }

    public addCoupon(coupon: ICoupon) {
        return this._http.post<ICoupon>(
            `${env.BASEURL}/api/CouponSaleItem/CouponAPI/AddCoupon`,
            coupon
        );
    }

    public getAllActiveCouponsNotUsedByUser() {
        let userId!: string;
        let userIdSubscription: Subscription = this._store
            .select((state) => selectorUserId(state as { [authFeatureKey]: IAuthState }))
            .subscribe((currUserId) => {
                userId = currUserId;
            });
        userIdSubscription.unsubscribe();
        return this._http.get<ICoupon[]>(
            `${env.BASEURL}/api/CouponSaleItem/CouponAPI/GetAllActiveCouponsNotUsedByUser?userId=${userId}`
        );
    }
}
