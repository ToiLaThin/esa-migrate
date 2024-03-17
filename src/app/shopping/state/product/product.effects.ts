import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProductService } from '../../../core/services/product.service';
import { productActions } from './product.actions';
import { catchError, combineLatestWith, map, of, switchMap, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { IProductState } from './productState.interface';
import { productFeatureKey } from './product.reducers';
import { selectorProductLazyLoadRequest } from './product.selectors';
import { IProductLazyLoadRequest } from '../../../core/models/product.interface';
import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class ProductEffects {
    constructor(
        private actions$: Actions,
        private _productService: ProductService,
        private _store: Store
    ) {}

    loadProductEffect = createEffect(() =>
        this.actions$.pipe(
            ofType(productActions.reloadProducts),
            switchMap((_) => {
                let currentProductLazyLoadRequest: IProductLazyLoadRequest | null = null;
                let productLazyLoadRequestSubscription = this._store
                    .select((state) =>
                        selectorProductLazyLoadRequest(
                            state as { [productFeatureKey]: IProductState }
                        )
                    )
                    .pipe(
                        tap(
                            (productLazyLoadRequest) =>
                                (currentProductLazyLoadRequest = productLazyLoadRequest)
                        )
                    )
                    .subscribe();
                productLazyLoadRequestSubscription.unsubscribe();
                return this._productService
                    .getProducts(
                        currentProductLazyLoadRequest as unknown as IProductLazyLoadRequest
                    )
                    .pipe(
                        tap((paginatedProduct) => console.log(paginatedProduct)),
                        map((paginatedProducts) =>
                            productActions.productsLoadedSuccessfull({
                                paginatedProducts: paginatedProducts
                            })
                        ),
                        catchError((err) => of(productActions.productsLoadedFailed({ error: err })))
                    );
            })
        )
    );
}
