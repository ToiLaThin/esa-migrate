import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription, combineLatest, of, switchMap, tap } from 'rxjs';
import { IProduct, IProductModel } from '../../../core/models/product.interface';
import { Store } from '@ngrx/store';
import {
    selectorCrossSellingProducts,
    selectorIsLoadingCrossSellingProducts,
    selectorIsLoadingRelatedProducts,
    selectorIsSelectedProductBookmarked,
    selectorIsSelectedProductDisliked,
    selectorIsSelectedProductLiked,
    selectorIsSelectedProductRated,
    selectorProductSelected,
    selectorProductSelectedComments,
    selectorRelatedProducts,
    selectorSelectedProductRating
} from '../../state/product/product.selectors';
import { productFeatureKey } from '../../state/product/product.reducers';
import { IProductState } from '../../state/product/productState.interface';
import { AuthStatus } from '../../../core/types/auth-status.enum';
import { selectorAuthStatus, selectorUserId } from '../../../auth/state/auth.selectors';
import { authFeatureKey } from '../../../auth/state/auth.reducers';
import { IAuthState } from '../../../auth/state/authState.interface';
import { IComment } from '../../../core/models/order.interface';
import { productActions } from '../../state/product/product.actions';
import { authActions } from '../../../auth/state/auth.actions';
import { ProductCompareService } from '../../../core/services/product-compare.service';
import { ProductClassName } from '../../class/product-class';
import { GgAnalyticsService } from '../../../core/services/gg-analytics.service';
import { ICartItem } from '../../../core/models/cart-item.interface';
import { cartActions } from '../../state/cart/cart.actions';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
    selector: 'esa-product-detail',
    templateUrl: './product-detail.component.html',
    styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit, OnDestroy {
    routeParamsSubscription!: Subscription;
    productId!: string;
    productBusinessKey!: string;
    product!: IProduct; //for gg analytics to send add to wishlist event
    product$!: Observable<IProduct>;
    authStatus$!: Observable<AuthStatus>;
    currentUserId!: string;
    productComments$!: Observable<IComment[]>;

    isProductBookmarked$!: Observable<boolean | null>;
    isProductLiked$!: Observable<boolean | null>;
    isProductDisliked$!: Observable<boolean | null>;

    productRating$!: Observable<number | undefined>;
    isProductRated$!: Observable<boolean>;
    relatedProducts$!: Observable<IProduct[]>;
    isLoadingRelatedProducts$!: Observable<boolean>;

    get AuthStatus() {
        return AuthStatus;
    }

    get ProductClassName() {
        return ProductClassName;
    }
    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _store: Store,
        private _nzNotificationService: NzNotificationService,
        private _analyticsService: GgAnalyticsService
    ) {}

    ngOnDestroy(): void {
        this.routeParamsSubscription.unsubscribe();
    }

    ngOnInit(): void {
        this.routeParamsSubscription = this._route.params.subscribe((params) => {
            this.productId = params['productId'];
        });
        this.relatedProducts$ = this._store.select((state) =>
            selectorRelatedProducts(state as { [productFeatureKey]: IProductState })
        );
        this.isLoadingRelatedProducts$ = this._store.select((state) =>
            selectorIsLoadingRelatedProducts(state as { [productFeatureKey]: IProductState })
        );
        this.product$ = this._store.select((state) =>
            selectorProductSelected(this.productId)(state as { [productFeatureKey]: IProductState })
        );
        this.authStatus$ = this._store.select((state) =>
            selectorAuthStatus(state as { [authFeatureKey]: IAuthState })
        );

        let tempSubscription = this.product$.subscribe((product) => {
            this.productBusinessKey = product.businessKey!;
        });
        tempSubscription.unsubscribe();
        tempSubscription = this.product$
            .pipe(
                tap((product) => {
                    this._analyticsService.viewProduct(product);
                    this._store.dispatch(
                        productActions.loadRelatedProductsMetaDataOfProduct({
                            productBusinessKey: product.businessKey as string
                        })
                    );
                    this.product = product;
                })
            )
            .subscribe();
        tempSubscription.unsubscribe();

        tempSubscription = this._store
            .select((state) => selectorUserId(state as { [authFeatureKey]: IAuthState }))
            .subscribe((userId) => {
                this.currentUserId = userId;
            });
        tempSubscription.unsubscribe();

        this.productComments$ = this._store.select((state) =>
            selectorProductSelectedComments(state as { [productFeatureKey]: IProductState })
        );

        //pipe from another observable, we do not need to subscribe to get value
        this.isProductBookmarked$ = this.authStatus$.pipe(
            switchMap((authStatus) => {
                if (authStatus === AuthStatus.Authenticated) {
                    return this._store.select((state) =>
                        selectorIsSelectedProductBookmarked(this.productBusinessKey)(
                            state as { [productFeatureKey]: IProductState }
                        )
                    );
                }
                //so if unauthenticated, isProductBookmarked$ will return null not false
                //null vs false are different, null means we do not know if the product is bookmarked or not
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

        let authStatus!: AuthStatus;
        tempSubscription = this.authStatus$
            .pipe(tap((status) => (authStatus = status)))
            .subscribe();
        tempSubscription.unsubscribe();

        if (authStatus === AuthStatus.Authenticated) {
            this._store.dispatch(
                productActions.loadProductComments({ productBusinessKey: this.productBusinessKey })
            );
            this._store.dispatch(
                productActions.loadProductBookmarkMappings({
                    userId: this.currentUserId
                })
            );
            this._store.dispatch(
                productActions.loadProductRateMappings({
                    userId: this.currentUserId
                })
            );
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

    login() {
        this._store.dispatch(authActions.loginAttempted());
    }

    commentProduct(commentDetail: string) {
        if (!this.currentUserId) {
            alert('Please login to comment');
            return;
        }

        this._store.dispatch(
            productActions.commentProduct({
                userId: this.currentUserId,
                productBusinessKey: this.productBusinessKey,
                commentDetail
            })
        );
    }

    toggleProductBookmark(isBookmarked: boolean) {
        if (isBookmarked) {
            this._analyticsService.addToWishList(this.product);
            this._store.dispatch(
                productActions.bookmarkProduct({
                    productBusinessKey: this.productBusinessKey,
                    userId: this.currentUserId
                })
            );
            return;
        }
        this._store.dispatch(
            productActions.unbookmarkProduct({
                productBusinessKey: this.productBusinessKey,
                userId: this.currentUserId
            })
        );
    }

    toggleProductLike(isLiked: boolean) {
        if (isLiked === true) {
            this._store.dispatch(
                productActions.likeProduct({
                    productBusinessKey: this.productBusinessKey,
                    userId: this.currentUserId
                })
            );
            return;
        }
        this._store.dispatch(
            productActions.unlikeProduct({
                productBusinessKey: this.productBusinessKey,
                userId: this.currentUserId
            })
        );
    }

    toggleProductDislike(isDisliked: boolean) {
        if (isDisliked === true) {
            this._store.dispatch(
                productActions.dislikeProduct({
                    productBusinessKey: this.productBusinessKey,
                    userId: this.currentUserId
                })
            );
            return;
        }
        this._store.dispatch(
            productActions.unlikeProduct({
                productBusinessKey: this.productBusinessKey,
                userId: this.currentUserId
            })
        );
    }

    rateProduct(rating: string) {
        if (!this.currentUserId) {
            alert('Error: Please login to rate');
            return;
        }
        this._store.dispatch(
            productActions.rateProduct({
                productBusinessKey: this.productBusinessKey,
                userId: this.currentUserId,
                rating
            })
        );
    }

    addProductToCompareList(productId: string) {
        this._store.dispatch(productActions.addProductToCompareList({ productId: productId }));
    }

    addToCart(cartItem: ICartItem) {
        let authStatus!: AuthStatus;
        let tempSubscription = this.authStatus$.subscribe((status) => {
            authStatus = status;
        });
        tempSubscription.unsubscribe();
        if (authStatus === AuthStatus.Anonymous) {
            this._store.dispatch(authActions.loginAttempted());
            return;
        }
        this._store.dispatch(
            cartActions.cartItemUpsert({
                upsertCartItem: cartItem
            })
        );
        //can move to effect later
        this._nzNotificationService.success('Success', `Added ${cartItem.quantity} ${cartItem.productName} to cart`);
        this._analyticsService.addToCart(cartItem);
    }

    buyNow(cartItem: ICartItem) {
        this._store.dispatch(
            cartActions.cartItemUpsert({
                upsertCartItem: cartItem
            })
        );
        this._analyticsService.addToCart(cartItem);
        this._router.navigateByUrl('/shopping/cart');
    }
}
