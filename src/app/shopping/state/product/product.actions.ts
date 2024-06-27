import { createActionGroup, emptyProps, props } from '@ngrx/store';
import {
    IPaginatedProduct,
    IProduct,
    IProductRecommendationMetaData,
    OrderType,
    SortBy
} from './../../../core/models/product.interface';
import { ICatalog, ISubCatalog } from '../../../core/models/catalog.interface';
import { IComment } from '../../../core/models/order.interface';
import { IBookmarkProduct, ILikeProduct, IRateProduct } from '../../../core/models/product-interactions.interface';

export const productActions = createActionGroup({
    source: 'Product Events In Shopping Module',
    events: {
        'Reload Products': emptyProps(),
        'Products Loaded Successfull': props<{ paginatedProducts: IPaginatedProduct }>(),
        'Products Loaded Failed': props<{ error: string }>(),
        'Num Products Per Page Changed': props<{ selectedProductPerPage: number }>(),
        'Sort Products By Changed': props<{ selectedSortBy: SortBy }>(),
        'Products Order Type Changed': props<{ selectedOrderType: OrderType }>(),
        'Page Changed': props<{ selectedPage: number }>(),
        'Price Range Changed': props<{ fromPrice: number; toPrice: number }>(),
        
        'Load Product Comments': props<{ productBusinessKey: string }>(),
        'Product Comments Loaded Successfully': props<{ comments: IComment[] }>(),
        'Product Comments Loaded Failed': props<{ error: string }>(),

        'Comment Product': props<{
            productBusinessKey: string;
            commentDetail: string;
            userId: string;
        }>(),
        'Product Commented Successfull': props<{ productBusinessKey: string }>(),
        'Product Commented Failed': props<{ error: string }>(),

        'Load Product Bookmark Mappings': props<{ userId: string }>(),
        'Product Bookmark Mappings Loaded Successfully': props<{ bookmarkedProductMappings: IBookmarkProduct[] }>(),
        'Product Bookmark Mappings Loaded Failed': props<{ error: string }>(),
        'Bookmark Product': props<{ productBusinessKey: string; userId: string }>(),
        'Unbookmark Product': props<{ productBusinessKey: string; userId: string }>(),
        'Product Wish List Loaded Successfully': props<{productWishList: IProduct[]}>(),

        'Load Product Like Mappings': props<{ userId: string }>(),
        'Product Like Mappings Loaded Successfully': props<{ likedProductMappings: ILikeProduct[] }>(),
        'Product Like Mappings Loaded Failed': props<{ error: string }>(),

        'Like Product': props<{ productBusinessKey: string; userId: string }>(),
        'Unlike Product': props<{ productBusinessKey: string; userId: string }>(),
        'Dislike Product': props<{ productBusinessKey: string; userId: string }>(),

        'Load Product Rate Mappings': props<{ userId: string }>(),
        'Product Rate Mappings Loaded Successfully': props<{ ratedProductMappings: IRateProduct[] }>(),
        'Product Rate Mappings Loaded Failed': props<{ error: string }>(),

        'Rate Product': props<{ productBusinessKey: string; userId: string; rating: string }>(),
        'Load Product Compare Id List From Storage': emptyProps(),
        'Product Compare Id List Loaded Successfully': props<{ productCompareIdList: string[] }>(),
        //these 2 not affect reducer, they will be handled in effects, the validation logic in effect, the load successfull will modify the state in reducer
        //that is more clear and easy to understand, efficient too
        'Add Product To Compare List': props<{ productId: string }>(),
        'Remove Product From Compare List': props<{ productId: string }>(),

        'Search Products': props<{ searchTerm: string }>(),
        'Products Searched Successfully': props<{ matchingProducts: IProduct[] }>(),
        'Products Searched Failed': props<{ error: string }>(),
        'Clear Search Products': emptyProps(),

        //collaborative filtering
        'Load Product Recommendation Meta Datas Of User': props<{ userId: string }>(),
        'Product Recommendations Meta Data Of User Loaded Successfully': props<{ productRecommendationMetaDatas: IProductRecommendationMetaData[] }>(), //only load the productBussinessKeys of recommend products
        'Product Recommendations Meta Data Of User Loaded Failed': props<{ error: string }>(),
        'Recommended Product Loaded Successfully': props<{ products: IProduct[] }>(), //this action officially load products to the state

        //association rule based filtering
        'Load Cross Selling Products Meta Data Of Products In Cart': props<{ cartProductBusinessKeys: string[] }>(),
        'Load Cross Selling Products Meta Data Successfully': props<{ crossSellingProductBusinessKeys: string[] }>(),
        'Load Cross Selling Products Meta Data Failed': props<{ error: string }>(),
        'Cross Selling Products Loaded Successfully': props<{ loadedProducts: IProduct[] }>(),

        //content based filtering
        'Load Related Products Meta Data Of Product': props<{ productBusinessKey: string }>(),
        'Load Related Products Meta Data Of Product Successfully': props<{ relatedProductBusinessKeys: string[] }>(),
        'Load Related Products Meta Data Of Product Failed': props<{ error: string }>(),
        'Related Products Loaded Successfully': props<{ loadedProducts: IProduct[] }>(),
    }
});

export const catalogActions = createActionGroup({
    source: 'Catalog Events In Shopping Module',
    events: {
        'Reload Catalogs': emptyProps(),
        'Catalogs Loaded Successfull': props<{ loadedCatalogs: ICatalog[] }>(),
        'Catalogs Loaded Failed': props<{ error: string }>(),
        'Load SubCatalogs Of Catalog': props<{ catalogId: string }>(),
        'SubCatalog Of Catalog Loaded Successfull': props<{ loadedSubCatalogOfCatalog: ISubCatalog[] }>(),
        'SubCatalog Of Catalog Loaded Failed': props<{ error: string }>(),
        'SubCatalog Selected': props<{ selectedSubCatalogId: string }>(),
        'SubCatalog Deselected': props<{ deselectedSubCatalogId: string }>(),
    }
})
