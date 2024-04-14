import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IRateProduct } from "../models/product-interactions.interface";
import { environment as env } from "../../../environments/environment.development";
import { Observable } from "rxjs";
@Injectable({
    providedIn: 'root'
})
export class ProductRateService {
    constructor(private _http: HttpClient) {}

    public getUserProductRateMappings(userId: string): Observable<IRateProduct[]> {
        let headers = new HttpHeaders({
            userId: userId
        });
        return this._http.get<IRateProduct[]>(
            `${env.BASEURL}/api/ProductInteraction/RateAPI/GetRatedMappingsOfUser`,
            { headers: headers }
        );
    }

    public rateProduct(
        productBusinessKey: string,
        userId: string,
        rating: string
    ): Observable<IRateProduct> {
        let headers = new HttpHeaders({
            userId: userId,
            productBusinessKey: productBusinessKey,
            rating: rating.toString() //will be parse to double in backend
        });
        return this._http.post<IRateProduct>(
            `${env.BASEURL}/api/ProductInteraction/RateAPI/RateProductFromUser`,
            '',
            { headers: headers }
        );
    }
}