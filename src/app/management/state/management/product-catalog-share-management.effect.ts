import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProductService } from '../../../core/services/product.service';
import { catchError, combineLatestWith, map, of, switchMap, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { IProductLazyLoadRequest } from '../../../core/models/product.interface';
import { Injectable } from '@angular/core';
import { CatalogService } from '../../../core/services/catalog.service';
import { catalogManagementActions, productManagementActions } from './management.actions';
import { selectorProductLazyLoadRequestManagement } from './product-catalog-share-management.selectors';
import { managementFeatureKey } from './management.reducers';
import { IManagementState } from './managementState.interface';

@Injectable({ providedIn: 'root' })
export class ProductCatalogManagementShareEffects {
    constructor(
        private actions$: Actions,
        private _productService: ProductService,
        private _catalogService: CatalogService,
        private _store: Store
    ) {}

    loadProductManagementEffect = createEffect(() =>
        this.actions$.pipe(
            ofType(productManagementActions.reloadProducts),
            switchMap((_) => {
                let currentProductLazyLoadRequest: IProductLazyLoadRequest | null = null;
                let productLazyLoadRequestSubscription = this._store
                    .select((state) =>
                        selectorProductLazyLoadRequestManagement(
                            state as { [managementFeatureKey]: IManagementState }
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
                        productManagementActions.productsLoadedSuccessfull({
                                paginatedProducts: paginatedProducts
                            })
                        ),
                        catchError((err) => of(productManagementActions.productsLoadedFailed({ error: err })))
                    );
            })
        )
    );

    filterProductManagementEffect = createEffect(() =>
        this.actions$.pipe(
            ofType(
                productManagementActions.numProductsPerPageChanged,
                productManagementActions.productsOrderTypeChanged,
                productManagementActions.sortProductsByChanged,
                productManagementActions.pageChanged,
                catalogManagementActions.subCatalogSelected,
                catalogManagementActions.subCatalogDeselected,
                productManagementActions.priceRangeChanged
            ),
            switchMap(() => of(productManagementActions.reloadProducts()))
        )
    );

    loadCatalogsManagementEffect = createEffect(() =>
        this.actions$.pipe(
            ofType(catalogManagementActions.reloadCatalogs),
            switchMap((_) =>
                this._catalogService.getAllCatalogs().pipe(
                    // tap(catalogs => console.log("Loaded Catalogs:", catalogs)),
                    map((catalogs) =>
                        catalogManagementActions.catalogsLoadedSuccessfull({ loadedCatalogs: catalogs })
                    ),
                    catchError((err) => of(catalogManagementActions.catalogsLoadedFailed({ error: err })))
                )
            )
        )
    );

    loadSubCatalogsOfCatalogManagementEffect = createEffect(() =>
        this.actions$.pipe(
            ofType(catalogManagementActions.loadSubCatalogsOfCatalog),
            switchMap((action) =>
                this._catalogService.getAllSubCatalogsOfCatalog(action.catalogId).pipe(
                    map((subCatalogs) =>
                        catalogManagementActions.subCatalogOfCatalogLoadedSuccessfull({ loadedSubCatalogOfCatalog: subCatalogs })
                    ),
                    catchError((err) => of(catalogManagementActions.subCatalogOfCatalogLoadedFailed({ error: err })))
                )
            )
        )
    );
}
