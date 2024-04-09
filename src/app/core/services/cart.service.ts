import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { ICartConfirmRequest, ICartItem } from '../models/cart-item.interface';
import { environment as env } from '../../../environments/environment.development';
import { IOrderAggregateCart } from '../models/order.interface';
@Injectable({
    providedIn: 'root'
})
export class CartService {
    private itemsInCartKey = 'itemsInCart';

    constructor(private _http: HttpClient) {
    }

    updateCartItemsInStorage(itemsInCart: ICartItem[]) {
        localStorage.setItem(this.itemsInCartKey, JSON.stringify(itemsInCart));
    }

    loadCartItemsFromStorage(): ICartItem[] {
        return JSON.parse(localStorage.getItem(this.itemsInCartKey) || '[]') as ICartItem[];
    }

    clearCartInStorage() {
        localStorage.removeItem(this.itemsInCartKey);
    }

    public confirmCart(cartConfirmRequest: ICartConfirmRequest) {
        return this._http.post<IOrderAggregateCart>(
            `${env.BASEURL}/api/Aggregate/WriteAggregator/CheckCouponAndAddCart`,
            cartConfirmRequest
        );
    }
}
