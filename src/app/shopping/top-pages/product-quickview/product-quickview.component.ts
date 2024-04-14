import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from '../../../core/models/product.interface';
import { Observable, Subscription, combineLatest, of, switchMap, tap } from 'rxjs';
import { AuthStatus } from '../../../core/types/auth-status.enum';
import { Store } from '@ngrx/store';
import {
    selectorIsSelectedProductBookmarked,
    selectorProductSelected
} from '../../state/product/product.selectors';
import { IProductState } from '../../state/product/productState.interface';
import { productFeatureKey } from '../../state/product/product.reducers';
import { IAuthState } from '../../../auth/state/authState.interface';
import { authFeatureKey } from '../../../auth/state/auth.reducers';
import { selectorAuthStatus, selectorUserId } from '../../../auth/state/auth.selectors';
import { productActions } from '../../state/product/product.actions';

@Component({
    selector: 'esa-product-quickview',
    templateUrl: './product-quickview.component.html',
    styleUrls: ['./product-quickview.component.scss']
})
export class ProductQuickviewComponent implements OnInit, OnDestroy {
    routeParamsSubscription!: Subscription;
    productId!: string;
    product$!: Observable<IProduct>;
    authStatus$!: Observable<AuthStatus>;
    isProductBookmarked$!: Observable<boolean | null>;

    productBusinessKey!: string;
    currUserId!: string;
    constructor(private _route: ActivatedRoute, private _router: Router, private _store: Store) {}

    ngOnDestroy(): void {
        this.routeParamsSubscription.unsubscribe();
    }

    ngOnInit(): void {
        this.routeParamsSubscription = this._route.params.subscribe((params) => {
            this.productId = params['productId'];
        });
        this.product$ = this._store.select((state) =>
            selectorProductSelected(this.productId)(state as { [productFeatureKey]: IProductState })
        );
        this.authStatus$ = this._store.select((state) =>
            selectorAuthStatus(state as { [authFeatureKey]: IAuthState })
        );

        //this is different from how we get this value in product-detail.component.ts
        this.isProductBookmarked$ = combineLatest([this.product$, this.authStatus$]).pipe(
            tap(
                ([product, authStatus]) => (this.productBusinessKey = product.businessKey as string)
            ),
            switchMap(([product, authStatus]) => {
                if (authStatus === AuthStatus.Authenticated) {
                    return this._store.select((state) =>
                        selectorIsSelectedProductBookmarked(product.businessKey as string)(
                            state as { [productFeatureKey]: IProductState }
                        )
                    );
                }
                //if user is not authenticated, return null
                //null vs false: null means the user is not authenticated,
                //false means the user is authenticated but the product is not bookmarked
                return of(null);
            })
        );

        let tempSubscription = this._store
            .select((state) => selectorUserId(state as { [authFeatureKey]: IAuthState }))
            .pipe(tap((userId) => (this.currUserId = userId)))
            .subscribe();
        tempSubscription.unsubscribe();

        this._store.dispatch(productActions.loadProductBookmarkMappings({
            userId: this.currUserId
        }));
    }

    closeProductModal() {
        this._router.navigate(['shopping', 'product-list']);
    }

    openProductDetail() {
        this._router.navigate(['shopping', 'product-detail', this.productId]);
    }

    toggleProductBookmark(isBookmarked: boolean) {
        if (isBookmarked) {
            this._store.dispatch(
                productActions.bookmarkProduct({
                    productBusinessKey: this.productBusinessKey,
                    userId: this.currUserId
                })
            );
            return;
        } 
        this._store.dispatch(
            productActions.unbookmarkProduct({
                productBusinessKey: this.productBusinessKey,
                userId: this.currUserId
            })
        );
    }
}
