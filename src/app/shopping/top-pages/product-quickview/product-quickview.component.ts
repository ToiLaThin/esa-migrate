import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from '../../../core/models/product.interface';
import { Observable, Subscription } from 'rxjs';
import { AuthStatus } from '../../../core/types/auth-status.enum';
import { Store } from '@ngrx/store';
import { selectorProductSelected } from '../../state/product/product.selectors';
import { IProductState } from '../../state/product/productState.interface';
import { productFeatureKey } from '../../state/product/product.reducers';
import { IAuthState } from '../../../auth/state/authState.interface';
import { authFeatureKey } from '../../../auth/state/auth.reducers';
import { selectorAuthStatus } from '../../../auth/state/auth.selectors';

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
    }

    closeProductModal() {
        this._router.navigate(['shopping', 'product-list']);
    }

    openProductDetail() {
        this._router.navigate(['shopping', 'product-detail', this.productId]);
    }
}
