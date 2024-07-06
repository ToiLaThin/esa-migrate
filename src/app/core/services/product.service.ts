import { HttpClient } from '@angular/common/http';
import { IPaginatedProduct, IProduct, IProductLazyLoadRequest, IProductModelUpdatePriceRequest, IProductRecommendationMetaData } from '../models/product.interface';
import { environment as env } from './../../../environments/environment.development';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ProductService {
    constructor(private http: HttpClient) {}

    getProducts(lazyLoadRequest: IProductLazyLoadRequest) {
        return this.http.post<IPaginatedProduct>(
            `${env.BASEURL}/api/ProductCatalog/ProductAPI/GetProductsLazyLoad`,
            lazyLoadRequest
        );
    }

    searchProducts(searchTerm: string) {
        return this.http.get<IProduct[]>(
            `${env.BASEURL}/api/ProductCatalog/ProductAPI/SearchProductByName?searchPhrase=${searchTerm}`
        );
    }

    getProductsWithBusinessKeys(productBusinessKeys: string[]) {
        return this.http.post<IProduct[]>(
            `${env.BASEURL}/api/ProductCatalog/ProductAPI/GetProductsWithBusinessKeys`,
            productBusinessKeys
        );
    }

    getProductRecommendationMetaDatasOfUser(userId: string) {
        return this.http.get<IProductRecommendationMetaData[]>(
            `${env.FLASKURL}/recommend_collab?user_id=${userId}`
        );
    }

    getProductCrossSellingMetaDatas(productBusinessKeys: string[]) {
        return this.http.post<string[]>(
            `${env.FLASKURL}/cross_sell`, 
            {
                product_keys: productBusinessKeys
            }
        );
    }

    getProductRelatedMetaDatas(productBusinessKey: string) {
        return this.http.get<string[]>(
            `${env.FLASKURL}/recommend_content?product_key=${productBusinessKey}`
        );
    }

    updateProductModelPrice(productModelUpdatePriceRequest: IProductModelUpdatePriceRequest) {
        return this.http.post(
            `${env.BASEURL}/api/ProductCatalog/ProductAPI/UpdatePriceProductModel`,
            productModelUpdatePriceRequest
        );
    }
}
