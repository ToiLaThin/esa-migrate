import { HttpClient } from '@angular/common/http';
import { IPaginatedProduct, IProductLazyLoadRequest } from '../models/product.interface';
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
}
