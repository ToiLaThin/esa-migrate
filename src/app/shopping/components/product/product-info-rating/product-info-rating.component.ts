import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable, startWith } from 'rxjs';
import { AuthStatus } from '../../../../core/types/auth-status.enum';
import { Store } from '@ngrx/store';
import { selectorAuthStatus } from '../../../../auth/state/auth.selectors';
import { authFeatureKey } from '../../../../auth/state/auth.reducers';
import { IAuthState } from '../../../../auth/state/authState.interface';
import { IProduct } from '../../../../core/models/product.interface';
import { productFeatureKey } from '../../../state/product/product.reducers';
import { IProductState } from '../../../state/product/productState.interface';
import { selectorIsSelectedProductRated, selectorSelectedProductRating } from '../../../state/product/product.selectors';
import { authActions } from '../../../../auth/state/auth.actions';
import { I18NProductIdSelector } from '../../../translate-ids/i18n-product-id';

@Component({
    selector: 'esa-product-info-rating',
    templateUrl: './product-info-rating.component.html',
    styleUrls: ['./product-info-rating.component.scss']
})
export class ProductInfoRatingComponent {
    //observable with init value
    // authStatus$: Observable<AuthStatus> = new Observable<AuthStatus>().pipe(
    //     startWith(AuthStatus.Authenticated)
    // );

    @Input({ required: true }) product!: IProduct;
    @Input({ required: true }) authStatus!: AuthStatus | null;
    @Input({ required: true }) isProductRated!: boolean | null;
    @Input({ required: true }) productRating!: number | undefined | null;
    @Output() productRated: EventEmitter<string> = new EventEmitter<string>();
    allRatings = [0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5];

    get AuthStatus() {
        return AuthStatus;
    }

    get I18NProductIds() {
        return I18NProductIdSelector;
    }

    constructor(private _store: Store) {}

    login() {
        this._store.dispatch(authActions.loginAttempted());
    }

    rateProduct() {
        let ratingInputChecked = document.querySelector(
            'input[name="rating2"]:checked'
        ) as HTMLInputElement;
        console.log(ratingInputChecked.value);
        this.productRated.emit(ratingInputChecked.value);
    }
}
