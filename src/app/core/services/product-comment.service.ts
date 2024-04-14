import { HttpClient, HttpHeaders } from "@angular/common/http";
import { IComment } from "../models/order.interface";
import { environment as env } from "../../../environments/environment.development";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
  })
export class ProductCommentService {
    constructor(private _http: HttpClient) {}

    getProductComments(productBusinessKey: string) {
        let headers = new HttpHeaders({
            "productBusinessKey": productBusinessKey,
          });
          return this._http.get<IComment[]>(`${env.BASEURL}/api/ProductInteraction/CommentAPI/GetCommentsAboutProduct`, { headers: headers });
    }

    commentProduct(userId: string, productBusinessKey: string, commentDetail: string) {
        let headers = new HttpHeaders({
            "userId": userId,
            "productBusinessKey": productBusinessKey,
            "commentDetail": commentDetail
          });
          return this._http.post(`${env.BASEURL}/api/ProductInteraction/CommentAPI/CommentProductFromUser`, "", { headers: headers });
    }
}