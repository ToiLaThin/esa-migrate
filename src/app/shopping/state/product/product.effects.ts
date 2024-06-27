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
import { ProductLikeService } from '../../../core/services/product-like.service';
import { ProductRateService } from '../../../core/services/product-rate.service';
import { ProductCompareService } from '../../../core/services/product-compare.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Injectable({ providedIn: 'root' })
export class ProductEffects {
    constructor(
        private actions$: Actions,
        private _productService: ProductService,
        private _catalogService: CatalogService,
        private _productCommentService: ProductCommentService,
        private _productBookmarkService: ProductBookmarkService,
        private _productLikeService: ProductLikeService,
        private _productRateService: ProductRateService,
        private _productCompareService: ProductCompareService,
        private _notificationService: NzNotificationService,
        private _store: Store
    ) {}
    loadProductRelatedMetaDatasEffect = createEffect(() =>
        this.actions$.pipe(
            ofType(productActions.loadRelatedProductsMetaDataOfProduct),
            switchMap((action) =>
                this._productService.getProductRelatedMetaDatas(action.productBusinessKey).pipe(
                    map((relatedProductBusinessKeys) =>
                        productActions.loadRelatedProductsMetaDataOfProductSuccessfully({
                            relatedProductBusinessKeys: relatedProductBusinessKeys
                        })
                    ),
                    catchError((err) =>
                        of(productActions.loadRelatedProductsMetaDataOfProductFailed({ error: err }))
                    )
                )
            )
        )
    );

    loadRelatedProductMetaDatasSuccessfullEffect = createEffect(() =>
        this.actions$.pipe(
            ofType(productActions.loadRelatedProductsMetaDataOfProductSuccessfully),
            switchMap((action) =>
                this._productService
                    .getProductsWithBusinessKeys(action.relatedProductBusinessKeys)
                    .pipe(
                        map((products) =>
                            productActions.relatedProductsLoadedSuccessfully({
                                loadedProducts: products
                            })
                        )
                    )
            )
        )
    );

    loadProductCrossSellingMetaDataEffect = createEffect(() =>
        this.actions$.pipe(
            ofType(productActions.loadCrossSellingProductsMetaDataOfProductsInCart),
            switchMap((action) =>
                this._productService
                    .getProductCrossSellingMetaDatas(action.cartProductBusinessKeys)
                    .pipe(
                        map((crossSellingProductBusinessKeys) =>
                            productActions.loadCrossSellingProductsMetaDataSuccessfully({
                                crossSellingProductBusinessKeys: crossSellingProductBusinessKeys
                            })
                        ),
                        catchError((err) =>
                            of(
                                productActions.loadCrossSellingProductsMetaDataFailed({
                                    error: err
                                })
                            )
                        )
                    )
            )
        )
    );

    loadCrossSellingProductMetaDatasSuccessfullEffect = createEffect(() =>
        this.actions$.pipe(
            ofType(productActions.loadCrossSellingProductsMetaDataSuccessfully),
            switchMap((action) =>
                this._productService
                    .getProductsWithBusinessKeys(action.crossSellingProductBusinessKeys)
                    .pipe(
                        map((products) =>
                            productActions.crossSellingProductsLoadedSuccessfully({
                                loadedProducts: products
                            })
                        )
                    )
            )
        )
    );

    loadProductRecommendationMetaDatasEffect = createEffect(() =>
        this.actions$.pipe(
            ofType(productActions.loadProductRecommendationMetaDatasOfUser),
            switchMap((action) =>
                this._productService.getProductRecommendationMetaDatasOfUser(action.userId).pipe(
                    map((recommendationMetaDatas) =>
                        productActions.productRecommendationsMetaDataOfUserLoadedSuccessfully({
                            productRecommendationMetaDatas: recommendationMetaDatas
                        })
                    ),
                    catchError((err) =>
                        of(productActions.productBookmarkMappingsLoadedFailed({ error: err }))
                    )
                )
            )
        )
    );

    loadProductRecommendationsSuccessfullEffect = createEffect(() =>
        this.actions$.pipe(
            ofType(productActions.productRecommendationsMetaDataOfUserLoadedSuccessfully),
            switchMap((action) =>
                this._productService
                    .getProductsWithBusinessKeys(
                        action.productRecommendationMetaDatas.map((pR) => pR.product_key)
                    )
                    .pipe(
                        map((products) =>
                            productActions.recommendedProductLoadedSuccessfully({
                                products: products
                            })
                        )
                    )
            )
        )
    );

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

    loadProductWishListSuccessfullEffect = createEffect(() =>
        this.actions$.pipe(
            ofType(productActions.productBookmarkMappingsLoadedSuccessfully),
            switchMap((action) => {
                let bookmarkedProductBusinessKeys = action.bookmarkedProductMappings.map(
                    (bookmarkProductMapping) => bookmarkProductMapping.productBusinessKey
                );
                return this._productService
                    .getProductsWithBusinessKeys(bookmarkedProductBusinessKeys)
                    .pipe(
                        map((loadedProducts) =>
                            productActions.productWishListLoadedSuccessfully({
                                productWishList: loadedProducts
                            })
                        )
                    );
            })
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

    loadProductLikeMappingsEffect = createEffect(() =>
        this.actions$.pipe(
            ofType(productActions.loadProductLikeMappings),
            switchMap((action) =>
                this._productLikeService.getLikeProductMappings(action.userId).pipe(
                    map((likedProductMappings) => {
                        //no content is null result
                        if (!likedProductMappings) {
                            return productActions.productLikeMappingsLoadedSuccessfully({
                                likedProductMappings: []
                            });
                        }
                        return productActions.productLikeMappingsLoadedSuccessfully({
                            likedProductMappings
                        });
                    }),
                    catchError((err) =>
                        of(productActions.productLikeMappingsLoadedFailed({ error: err }))
                    )
                )
            )
        )
    );

    likeProductEffect = createEffect(() =>
        this.actions$.pipe(
            ofType(productActions.likeProduct),
            switchMap((action) =>
                this._productLikeService.likeProduct(action.productBusinessKey, action.userId).pipe(
                    map((_) => productActions.loadProductLikeMappings({ userId: action.userId })),
                    catchError((err) =>
                        of(productActions.productLikeMappingsLoadedFailed({ error: err }))
                    )
                )
            )
        )
    );

    dislikeProductEffect = createEffect(() =>
        this.actions$.pipe(
            ofType(productActions.dislikeProduct),
            switchMap((action) =>
                this._productLikeService
                    .dislikeProduct(action.productBusinessKey, action.userId)
                    .pipe(
                        map((_) =>
                            productActions.loadProductLikeMappings({ userId: action.userId })
                        ),
                        catchError((err) =>
                            of(productActions.productLikeMappingsLoadedFailed({ error: err }))
                        )
                    )
            )
        )
    );

    unlikeProductEffect = createEffect(() =>
        this.actions$.pipe(
            ofType(productActions.unlikeProduct),
            switchMap((action) =>
                this._productLikeService
                    .unlikeProduct(action.productBusinessKey, action.userId)
                    .pipe(
                        map((_) =>
                            productActions.loadProductLikeMappings({ userId: action.userId })
                        ),
                        catchError((err) =>
                            of(productActions.productLikeMappingsLoadedFailed({ error: err }))
                        )
                    )
            )
        )
    );

    loadProductRateMappingsEffect = createEffect(() =>
        this.actions$.pipe(
            ofType(productActions.loadProductRateMappings),
            switchMap((action) =>
                this._productRateService.getUserProductRateMappings(action.userId).pipe(
                    map((ratedProductMappings) => {
                        //no content is null result
                        if (!ratedProductMappings) {
                            return productActions.productRateMappingsLoadedSuccessfully({
                                ratedProductMappings: []
                            });
                        }
                        return productActions.productRateMappingsLoadedSuccessfully({
                            ratedProductMappings
                        });
                    }),
                    catchError((err) =>
                        of(productActions.productRateMappingsLoadedFailed({ error: err }))
                    )
                )
            )
        )
    );

    rateProductEffect = createEffect(() =>
        this.actions$.pipe(
            ofType(productActions.rateProduct),
            switchMap((action) =>
                this._productRateService
                    .rateProduct(action.productBusinessKey, action.userId, action.rating)
                    .pipe(
                        map((_) =>
                            productActions.loadProductRateMappings({ userId: action.userId })
                        ),
                        catchError((err) =>
                            of(productActions.productRateMappingsLoadedFailed({ error: err }))
                        )
                    )
            )
        )
    );

    loadProductCompareIdListEffect = createEffect(() =>
        this.actions$.pipe(
            ofType(productActions.loadProductCompareIdListFromStorage),
            switchMap((action) => {
                let productCompareIdList =
                    this._productCompareService.loadProductCompareListFromStorage();
                return of(
                    productActions.productCompareIdListLoadedSuccessfully({
                        productCompareIdList: productCompareIdList
                    })
                );
            })
        )
    );

    addProductToCompareListEffect = createEffect(() =>
        this.actions$.pipe(
            ofType(productActions.addProductToCompareList),
            switchMap((action) => {
                let productCompareIdList =
                    this._productCompareService.loadProductCompareListFromStorage();
                if (productCompareIdList.includes(action.productId) === true) {
                    this._notificationService.info('Product already in compare list', '');
                }
                if (productCompareIdList.length >= 3) {
                    this._notificationService.info('Compare list is full', '');
                }
                productCompareIdList.push(action.productId);
                this._productCompareService.updateProductCompareListInStorage(productCompareIdList);
                return of(productActions.loadProductCompareIdListFromStorage()); //this will trigger load successfull and modify the state in reducer
            })
        )
    );
    removeProductToCompareListEffect = createEffect(() =>
        this.actions$.pipe(
            ofType(productActions.removeProductFromCompareList),
            switchMap((action) => {
                let productCompareIdList =
                    this._productCompareService.loadProductCompareListFromStorage();
                if (productCompareIdList.includes(action.productId) === false) {
                    this._notificationService.info('Product not in in compare list to remove', '');
                }
                if (productCompareIdList.length === 0) {
                    this._notificationService.info('Compare list is empty', '');
                }
                productCompareIdList = productCompareIdList.filter(
                    (pId) => pId !== action.productId
                );
                this._productCompareService.updateProductCompareListInStorage(productCompareIdList);
                return of(productActions.loadProductCompareIdListFromStorage()); //this will trigger load successfull and modify the state in reducer
            })
        )
    );

    searchProductsEffect = createEffect(() =>
        this.actions$.pipe(
            ofType(productActions.searchProducts),
            switchMap((action) => {
                return this._productService.searchProducts(action.searchTerm).pipe(
                    map((retProducts) =>
                        productActions.productsSearchedSuccessfully({
                            matchingProducts: retProducts
                        })
                    ),
                    catchError((err) => of(productActions.productsSearchedFailed({ error: err })))
                );
            })
        )
    );
}
