import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ColorSvgNames } from '../../../share-components/svg-definitions/color-svg-names.enum';
import { IProduct } from '../../../core/models/product.interface';
import { Observable, tap } from 'rxjs';
import { productActions } from '../../state/product/product.actions';
import { selectorProductWishList } from '../../state/product/product.selectors';
import { productFeatureKey } from '../../state/product/product.reducers';
import { IProductState } from '../../state/product/productState.interface';
import { selectorUserId } from '../../../auth/state/auth.selectors';
import { authFeatureKey } from '../../../auth/state/auth.reducers';
import { IAuthState } from '../../../auth/state/authState.interface';
import { ProductClassName } from '../../class/product-class';

@Component({
    selector: 'esa-product-wishlist',
    templateUrl: './product-wishlist.component.html',
    styleUrls: ['./product-wishlist.component.scss']
})
export class ProductWishListComponent implements OnInit {
    productWishList$!: Observable<IProduct[]>;
    userId!: string;

    get ProductClassName() {
        return ProductClassName;
    }
    constructor(private _store: Store) {}

    ngOnInit(): void {
        //have auth guard, so userId will be always available, but we can use observable to check if user is logged in
        let tempSubscription = this._store
            .select((state) => selectorUserId(state as { [authFeatureKey]: IAuthState }))
            .subscribe((uId) => (this.userId = uId));
        tempSubscription.unsubscribe();

        this.productWishList$ = this._store
            .select((state) =>
                selectorProductWishList(state as { [productFeatureKey]: IProductState })
            )
            .pipe(
                tap((productWishList) => {
                    if (!productWishList || productWishList.length === 0) {
                        this._store.dispatch(
                            //load product wish list follow after load product bookmark mappings successfull
                            productActions.loadProductBookmarkMappings({ userId: this.userId })
                        );
                    }
                })
            );
    }

    get ColorSvgNames() {
        return ColorSvgNames;
    }
}
