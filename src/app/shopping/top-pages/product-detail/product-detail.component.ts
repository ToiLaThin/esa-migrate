import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { IProduct, IProductModel } from '../../../core/models/product.interface';
import { Store } from '@ngrx/store';
import {
    selectorProductSelected,
    selectorProductSelectedComments
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

@Component({
    selector: 'esa-product-detail',
    templateUrl: './product-detail.component.html',
    styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit, OnDestroy {
    routeParamsSubscription!: Subscription;
    productId!: string;
    productBusinessKey!: string;
    product$!: Observable<IProduct>;
    authStatus$!: Observable<AuthStatus>;
    currentUserId!: string;
    productComments$!: Observable<IComment[]>;

    get AuthStatus() {
        return AuthStatus;
    }
    constructor(private _route: ActivatedRoute, private _store: Store) {}

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

        let tempSubscription = this.product$.subscribe((product) => {
            this.productBusinessKey = product.businessKey!;
        });
        tempSubscription.unsubscribe();

        tempSubscription = this._store.select(state => selectorUserId(state as {[authFeatureKey]: IAuthState})).subscribe(userId => {
            this.currentUserId = userId;
        });
        tempSubscription.unsubscribe();

        this._store.dispatch(
            productActions.loadProductComments({ productBusinessKey: this.productBusinessKey })
        );
        this.productComments$ = this._store.select((state) =>
            selectorProductSelectedComments(state as { [productFeatureKey]: IProductState })
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
}
