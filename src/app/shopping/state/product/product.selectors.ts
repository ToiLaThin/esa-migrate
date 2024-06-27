import { createSelector } from '@ngrx/store';
import { productFeatureKey } from './product.reducers';
import { IProductState } from './productState.interface';
import { IProduct } from '../../../core/models/product.interface';
import { LikeStatus } from '../../../core/models/product-interactions.interface';

export const selectorProductFeature = (state: { [productFeatureKey]: IProductState }) =>
    state[productFeatureKey];

export const selectorProductLazyLoadRequest = createSelector(
    selectorProductFeature,
    (productState) => productState.productLazyLoadRequest
);

export const selectorProductSelectedComments = createSelector(
    selectorProductFeature,
    (productState) => productState.selectedProductComments
);

export const selectorProductSelected = (productId: string) =>
    createSelector(selectorProductFeature, (productState: IProductState) => {
        return (productState.paginatedProducts.products.find(
            (product) => product.productId == productId
        ) as IProduct) || (productState.productSearchMatched?.find(
            (product) => product.productId == productId
        ) as IProduct);
    });

export const selectorIsSelectedProductLiked = (productBusinessKey: string) =>
    createSelector(selectorProductFeature, (productState: IProductState) => {
        return productState.userProductLikeMappings
            .filter((mapping) => mapping.status === LikeStatus.Liked)
            .map((mapping) => mapping.productBusinessKey)
            .includes(productBusinessKey);
    });

export const selectorIsSelectedProductDisliked = (productBusinessKey: string) =>
    createSelector(selectorProductFeature, (productState: IProductState) => {
        return productState.userProductLikeMappings
            .filter((mapping) => mapping.status === LikeStatus.Disliked)
            .map((mapping) => mapping.productBusinessKey)
            .includes(productBusinessKey);
    });

export const selectorIsSelectedProductRated = (productBusinessKey: string) =>
    createSelector(selectorProductFeature, (productState: IProductState) => {
        if (productState.userProductRateMappings === null) {
            return false;
        }
        return productState.userProductRateMappings
            .map((mapping) => mapping.productBusinessKey)
            .includes(productBusinessKey);
    });

export const selectorSelectedProductRating = (productBusinessKey: string) =>
    createSelector(selectorProductFeature, (productState: IProductState) => {
        if (productState.userProductRateMappings === null) return 0;
        const rateProductMapping = productState.userProductRateMappings.find(
            (mapping) => mapping.productBusinessKey === productBusinessKey
        );
        return rateProductMapping?.rating;
    });

export const selectorIsSelectedProductBookmarked = (productBusinessKey: string) =>
    createSelector(selectorProductFeature, (productState) =>
        productState.userProductBookmarkMappings
            .map((mapping) => mapping.productBusinessKey)
            .includes(productBusinessKey)
    );

export const selectorProductWishList = createSelector(
    selectorProductFeature,
    (productState) => productState.userProductWishList
);

export const selectorDisplayingProducts = createSelector(
    selectorProductFeature,
    (productState) => productState.paginatedProducts.products
);
export const selectorIsLoadingProducts = createSelector(
    selectorProductFeature,
    (productState) => productState.isLoadingProducts
);

export const selectorPageCount = createSelector(
    selectorProductFeature,
    (productState) => productState.paginatedProducts.pageCount
);
export const selectorDisplayingProductCount = createSelector(
    selectorProductFeature,
    (productState) => productState.paginatedProducts.products.length
);

export const selectorAllCatalogs = createSelector(
    selectorProductFeature,
    (productState) => productState.allCatalogs
);

export const selectorSelectedCatalog = createSelector(selectorProductFeature, (productState) => {
    return productState.allCatalogs.find(
        (catalog) => catalog.catalogId === productState.selectedCatalogId
    );
});
export const selectorSelectedSubCatalogs = createSelector(
    selectorProductFeature,
    (productState) => productState.subCatalogsOfSelectedCatalog
);

export const selectorProductCompareList = createSelector(
    selectorProductFeature,
    (productState) => {
        const productCompareIdList = productState.productCompareIdList;
        return productState.paginatedProducts.products.filter((product) =>
            productCompareIdList.includes(product.productId!)
        );
    }
);

export const selectorProductMatchedSearch = createSelector(
    selectorProductFeature,
    (productState) => productState.productSearchMatched
);

export const selectorRecommendedProducts = createSelector(
    selectorProductFeature,
    (productState) => productState.recommendedProducts
);
export const selectorIsLoadingRecommendedProducts = createSelector(
    selectorProductFeature,
    (productState) => productState.isLoadingRecommendedProducts
);

export const selectorCrossSellingProducts = createSelector(
    selectorProductFeature,
    (productState) => productState.crossSellingProducts
)
export const selectorIsLoadingCrossSellingProducts = createSelector(
    selectorProductFeature,
    (productState) => productState.isLoadingCrossSellingProducts
)

export const selectorRelatedProducts = createSelector(
    selectorProductFeature,
    (productState) => productState.relatedProducts
)

export const selectorIsLoadingRelatedProducts = createSelector(
    selectorProductFeature,
    (productState) => productState.isLoadingRelatedProducts
)