import { HttpClient } from '@angular/common/http';
import { IPaginatedProduct, IProduct, IProductLazyLoadRequest, IProductRecommendation } from '../models/product.interface';
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

    getProductRecommendationsOfUser(userId: string) {
        return this.http.get<IProductRecommendation[]>(
            `${env.FLASKURL}/recommend?user_id=${userId}`
        );
    }
}
