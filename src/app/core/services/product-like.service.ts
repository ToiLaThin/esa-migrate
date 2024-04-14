import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ILikeProduct } from '../models/product-interactions.interface';
import { environment as env } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ProductLikeService {

  constructor(private _http: HttpClient) { }
    
  public likeProduct(productBusinessKey: string, userId: string): Observable<ILikeProduct> {
    let headers = new HttpHeaders({
      "userId": userId,
      "productBusinessKey": productBusinessKey,
    });
    return this._http.post<ILikeProduct>(`${env.BASEURL}/api/ProductInteraction/LikeAPI/LikeProductFromUser`, "" ,{ headers: headers });
  }

  public unlikeProduct(productBusinessKey: string, userId: string): Observable<ILikeProduct> {
    let headers = new HttpHeaders()
    headers = headers.set("userId", userId)
    headers = headers.set("productBusinessKey", productBusinessKey);
    return this._http.post<ILikeProduct>(`${env.BASEURL}/api/ProductInteraction/LikeAPI/UnLikeProductFromUser`, "" ,{ headers: headers });
  }

  public dislikeProduct(productBusinessKey: string, userId: string): Observable<ILikeProduct> {
    let headers = new HttpHeaders({
      "userId": userId,
      "productBusinessKey": productBusinessKey,
    });
    return this._http.post<ILikeProduct>(`${env.BASEURL}/api/ProductInteraction/LikeAPI/DisLikeProductFromUser`, "" ,{ headers: headers });
  }
  
  public getLikeProductMappings(userId: string): Observable<ILikeProduct[]> {
    let headers = new HttpHeaders({
      "userId": userId,
    });
    return this._http.get<ILikeProduct[]>(`${env.BASEURL}/api/ProductInteraction/LikeAPI/GetUserProductLikedMappingsOfUser`, { headers: headers });
  }
}
