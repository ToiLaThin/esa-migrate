import { Store } from '@ngrx/store';
import { IOrderAggregateCart } from '../models/order.interface';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class OrderService {
    trackingOrderKey = 'trackingOrderId';
    constructor(private _store: Store, private _http: HttpClient) {}

    updateTrackingOrderInStorage(trackingOrder: IOrderAggregateCart) {
        localStorage.setItem(this.trackingOrderKey, JSON.stringify(trackingOrder));
    }

    loadTrackingOrderFromStorage(): IOrderAggregateCart {
        return JSON.parse(localStorage.getItem(this.trackingOrderKey)!) as IOrderAggregateCart;
    }

    clearTrackingOrderInStorage() {
        localStorage.removeItem(this.trackingOrderKey);
    }
}
