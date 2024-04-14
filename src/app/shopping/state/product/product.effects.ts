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
import { ProductCommentService } from '../../../core/services/product-comment.service';
import { ProductBookmarkService } from '../../../core/services/product-bookmark.service';

@Injectable({ providedIn: 'root' })
export class ProductEffects {
    constructor(
        private actions$: Actions,
        private _productService: ProductService,
        private _catalogService: CatalogService,
        private _productCommentService: ProductCommentService,
        private _productBookmarkService: ProductBookmarkService,
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
                        catalogActions.subCatalogOfCatalogLoadedSuccessfull({
                            loadedSubCatalogOfCatalog: subCatalogs
                        })
                    ),
                    catchError((err) =>
                        of(catalogActions.subCatalogOfCatalogLoadedFailed({ error: err }))
                    )
                )
            )
        )
    );

    loadProductCommentsEffect = createEffect(() =>
        this.actions$.pipe(
            ofType(productActions.loadProductComments),
            switchMap((action) =>
                this._productCommentService.getProductComments(action.productBusinessKey).pipe(
                    map((returnedComments) =>
                        productActions.productCommentsLoadedSuccessfully({
                            comments: returnedComments
                        })
                    ),
                    catchError((err) =>
                        of(productActions.productCommentsLoadedFailed({ error: err }))
                    )
                )
            )
        )
    );

    commentProductEffect = createEffect(() =>
        this.actions$.pipe(
            ofType(productActions.commentProduct),
            switchMap((action) =>
                this._productCommentService
                    .commentProduct(action.userId, action.productBusinessKey, action.commentDetail)
                    .pipe(
                        map(() =>
                            productActions.productCommentedSuccessfull({
                                productBusinessKey: action.productBusinessKey
                            })
                        ),
                        catchError((err) =>
                            of(productActions.productCommentedFailed({ error: err }))
                        )
                    )
            )
        )
    );

    commentProductSuccessfulEffect = createEffect(() =>
        this.actions$.pipe(
            ofType(productActions.productCommentedSuccessfull),
            switchMap((action) =>
                of(
                    productActions.loadProductComments({
                        productBusinessKey: action.productBusinessKey
                    })
                )
            )
        )
    );

    loadProductBookmarkMappingsEffect = createEffect(() =>
        this.actions$.pipe(
            ofType(productActions.loadProductBookmarkMappings),
            switchMap((action) =>
                this._productBookmarkService.getBookmarkProductMappings(action.userId).pipe(
                    map((bookmarkedProductMappings) => {
                        //no content is null result
                        if (!bookmarkedProductMappings) {
                            return productActions.productBookmarkMappingsLoadedSuccessfully({
                                bookmarkedProductMappings: []
                            });
                        }
                        return productActions.productBookmarkMappingsLoadedSuccessfully({
                            bookmarkedProductMappings
                        });
                    }),
                    catchError((err) =>
                        of(productActions.productBookmarkMappingsLoadedFailed({ error: err }))
                    )
                )
            )
        )
    );

    //no need for another successful action
    bookmarkProductEffect = createEffect(() =>
        this.actions$.pipe(
            ofType(productActions.bookmarkProduct),
            switchMap((action) =>
                this._productBookmarkService
                    .bookmarkProduct(action.productBusinessKey, action.userId)
                    .pipe(
                        map((_) =>
                            productActions.loadProductBookmarkMappings({ userId: action.userId })
                        ),
                        catchError((err) =>
                            of(productActions.productBookmarkMappingsLoadedFailed({ error: err }))
                        )
                    )
            )
        )
    );

    unbookmarkProductEffect = createEffect(() =>
        this.actions$.pipe(
            ofType(productActions.unbookmarkProduct),
            switchMap((action) =>
                this._productBookmarkService
                    .unbookmarkProduct(action.productBusinessKey, action.userId)
                    .pipe(
                        map((_) =>
                            productActions.loadProductBookmarkMappings({ userId: action.userId })
                        ),
                        catchError((err) =>
                            of(productActions.productBookmarkMappingsLoadedFailed({ error: err }))
                        )
                    )
            )
        )
    );
}
