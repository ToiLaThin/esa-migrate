import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICatalog, ISubCatalog } from '../models/catalog.interface';
import { environment as env } from '../../../environments/environment.development';

@Injectable({
    providedIn: 'root'
})
export class CatalogService {
    constructor(private http: HttpClient) {}

    public getAllCatalogs() {
        return this.http.get<ICatalog[]>(
            `${env.BASEURL}/api/ProductCatalog/CatalogAPI/GetAllCatalog`
        );
    }

    public getAllSubCatalogsOfCatalog(catalogId: string) {
        let httpHeaders = new HttpHeaders();
        httpHeaders = httpHeaders.append('catalogId', catalogId);
        return this.http.get<ISubCatalog[]>(
            `${env.BASEURL}/api/ProductCatalog/CatalogAPI/GetAllSubCatalogs`,
            { headers: httpHeaders }
        );
    }

    public addCatalog(catalog: ICatalog) {
        return this.http.post<ICatalog>(
            `${env.BASEURL}/api/ProductCatalog/CatalogAPI/CreateCatalog`,
            catalog
        );
    }

    public addSubCatalog(subCatalog: ISubCatalog, catalogId: string) {
        let httpHeaders = new HttpHeaders();
        httpHeaders = httpHeaders.append('catalogId', catalogId);
        return this.http.post<string>(
            `${env.BASEURL}/api/ProductCatalog/CatalogAPI/CreateSubCatalog`,
            subCatalog,
            { headers: httpHeaders }
        ).pipe();
    }
}
