import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProductService } from '../../../core/services/product.service';
import { catalogActions, productActions } from './product.actions';
import { catchError, combineLatestWith, map, of, switchMap, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { IProductState } from './productState.interface';
import { productFeatureKey } from './product.reducers';
import { selectorProductLazyLoadRequest } from './product.selectors';
import { IProductLazyLoadRequest } from '../../../core/models/product.interface';
import { Injectable } from '@angular/core';
import { CatalogService } from '../../../core/services/catalog.service';

@Injectable({ providedIn: 'root' })
export class ProductEffects {
    constructor(
        private actions$: Actions,
        private _productService: ProductService,
        private _catalogService: CatalogService,
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

    filterProductEffect = createEffect(() =>
        this.actions$.pipe(
            ofType(
                productActions.numProductsPerPageChanged,
                productActions.productsOrderTypeChanged,
                productActions.sortProductsByChanged,
                productActions.pageChanged,
                catalogActions.subCatalogSelected,
                catalogActions.subCatalogDeselected,
                productActions.priceRangeChanged
            ),
            switchMap(() => of(productActions.reloadProducts()))
        )
    );

    loadCatalogsEffect = createEffect(() =>
        this.actions$.pipe(
            ofType(catalogActions.reloadCatalogs),
            switchMap((_) =>
                this._catalogService.getAllCatalogs().pipe(
                    // tap(catalogs => console.log("Loaded Catalogs:", catalogs)),
                    map((catalogs) =>
                        catalogActions.catalogsLoadedSuccessfull({ loadedCatalogs: catalogs })
                    ),
                    catchError((err) => of(catalogActions.catalogsLoadedFailed({ error: err })))
                )
            )
        )
    );

    loadSubCatalogsOfCatalogEffect = createEffect(() =>
        this.actions$.pipe(
            ofType(catalogActions.loadSubCatalogsOfCatalog),
            switchMap((action) =>
                this._catalogService.getAllSubCatalogsOfCatalog(action.catalogId).pipe(
                    map((subCatalogs) =>
                        catalogActions.subCatalogOfCatalogLoadedSuccessfull({ loadedSubCatalogOfCatalog: subCatalogs })
                    ),
                    catchError((err) => of(catalogActions.subCatalogOfCatalogLoadedFailed({ error: err })))
                )
            )
        )
    );
}
