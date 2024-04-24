import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from '../../../core/models/product.interface';
import { Observable, Subscription, combineLatest, of, switchMap, tap } from 'rxjs';
import { AuthStatus } from '../../../core/types/auth-status.enum';
import { Store } from '@ngrx/store';
import {
    selectorIsSelectedProductBookmarked,
    selectorIsSelectedProductDisliked,
    selectorIsSelectedProductLiked,
    selectorIsSelectedProductRated,
    selectorProductSelected,
    selectorSelectedProductRating
} from '../../state/product/product.selectors';
import { IProductState } from '../../state/product/productState.interface';
import { productFeatureKey } from '../../state/product/product.reducers';
import { IAuthState } from '../../../auth/state/authState.interface';
import { authFeatureKey } from '../../../auth/state/auth.reducers';
import { selectorAuthStatus, selectorUserId } from '../../../auth/state/auth.selectors';
import { productActions } from '../../state/product/product.actions';
import { OutlineSvgNames } from '../../../share-components/svg-definitions/outline-svg-names.enum';
import { ProductCompareService } from '../../../core/services/product-compare.service';

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
    isProductLiked$!: Observable<boolean | null>;
    isProductDisliked$!: Observable<boolean | null>;

    productBusinessKey!: string;
    currUserId!: string;

    productRating$!: Observable<number | undefined | null>;
    isProductRated$!: Observable<boolean>;
    
    constructor(private _route: ActivatedRoute, private _router: Router, private _store: Store) {}

    get OutlineSvgNames() {
        return OutlineSvgNames;
    }
    
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

        this.isProductLiked$ = combineLatest([this.product$, this.authStatus$]).pipe(
            switchMap(([product, authStatus]) => {
                if (authStatus === AuthStatus.Authenticated) {
                    return this._store.select((state) =>
                        selectorIsSelectedProductLiked(product.businessKey as string)(
                            state as { [productFeatureKey]: IProductState }
                        )
                    );
                }
                return of(null);
            })
        );

        this.isProductDisliked$ = combineLatest([this.product$, this.authStatus$]).pipe(
            switchMap(([product, authStatus]) => {
                if (authStatus === AuthStatus.Authenticated) {
                    return this._store.select((state) =>
                        selectorIsSelectedProductDisliked(product.businessKey as string)(
                            state as { [productFeatureKey]: IProductState }
                        )
                    );
                }
                return of(null);
            })
        );

        let tempSubscription = this._store
            .select((state) => selectorUserId(state as { [authFeatureKey]: IAuthState }))
            .pipe(tap((userId) => (this.currUserId = userId)))
            .subscribe();
        tempSubscription.unsubscribe();

        let authStatus!: AuthStatus;
        tempSubscription = this.authStatus$.pipe(
            tap(status => authStatus = status)
        ).subscribe();
        tempSubscription.unsubscribe();

        if (authStatus === AuthStatus.Authenticated) {
            this._store.dispatch(productActions.loadProductBookmarkMappings({
                userId: this.currUserId
            }));
    
            this._store.dispatch(productActions.loadProductLikeMappings({
                userId: this.currUserId,
            }));
            this._store.dispatch(productActions.loadProductRateMappings({
                userId: this.currUserId
            }));
        }

        this.isProductRated$ = this._store.select((state) =>
            selectorIsSelectedProductRated(this.productBusinessKey)(
                state as { [productFeatureKey]: IProductState }
            )
        );
        this.productRating$ = this._store.select((state) =>
            selectorSelectedProductRating(this.productBusinessKey)(
                state as { [productFeatureKey]: IProductState }
            )
        );
        
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

    toggleProductLike(isLiked: boolean) {
        if(isLiked === true) {
            this._store.dispatch(
                productActions.likeProduct({
                    productBusinessKey: this.productBusinessKey,
                    userId: this.currUserId
                })
            );
            return;
        }
        this._store.dispatch(
            productActions.unlikeProduct({
                productBusinessKey: this.productBusinessKey,
                userId: this.currUserId,
            })
        );
    }

    toggleProductDislike(isDisliked: boolean) {
        if(isDisliked === true) {
            this._store.dispatch(
                productActions.dislikeProduct({
                    productBusinessKey: this.productBusinessKey,
                    userId: this.currUserId
                })
            );
            return;
        }
        this._store.dispatch(
            productActions.unlikeProduct({
                productBusinessKey: this.productBusinessKey,
                userId: this.currUserId,
            })
        );
    }

    rateProduct(rating: string) {
        if (!this.currUserId) {
            alert('Error: Please login to rate');
            return;
        }
        this._store.dispatch(
            productActions.rateProduct({
                productBusinessKey: this.productBusinessKey,
                userId: this.currUserId,
                rating
            })
        );
    }

    addProductToCompareList(productId: string) {
        this._store.dispatch(productActions.addProductToCompareList({ productId: productId }));
    }
}
