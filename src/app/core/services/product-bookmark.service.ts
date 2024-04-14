import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IBookmarkProduct } from '../models/product-interactions.interface';
import { environment as env } from '../../../environments/environment.development';
@Injectable({
  providedIn: 'root'
})
//service to bookmark product for curr user
export class ProductBookmarkService {

  constructor(private _http: HttpClient) { }

  public getBookmarkProductMappings(userId: string): Observable<IBookmarkProduct[]> {
    let headers = new HttpHeaders({
      "userId": userId,
    });
    return this._http.get<IBookmarkProduct[]>(`${env.BASEURL}/api/ProductInteraction/BookmarkAPI/GetProductBookmarkedOfUser`, { headers: headers });
  }

  public bookmarkProduct(productBusinessKey: string, userId: string): Observable<IBookmarkProduct> {
    let headers = new HttpHeaders({
      "userId": userId,
      "productBusinessKey": productBusinessKey,
    });
    return this._http.post<IBookmarkProduct>(`${env.BASEURL}/api/ProductInteraction/BookmarkAPI/BookmarkProductFromUser`, "" ,{ headers: headers });
  }

  public unbookmarkProduct(productBusinessKey: string, userId: string): Observable<IBookmarkProduct> {
    let headers = new HttpHeaders({
      "userId": userId,
      "productBusinessKey": productBusinessKey,
    });
    return this._http.delete<IBookmarkProduct>(`${env.BASEURL}/api/ProductInteraction/BookmarkAPI/UnBookmarkProductFromUser`, { headers: headers });
  }
}
