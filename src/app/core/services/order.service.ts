import { Store } from '@ngrx/store';
import { IOrderAggregateCart } from '../models/order.interface';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {
    ICustomerOrderInfo,
    ICustomerOrderInfoConfirmedRequest
} from '../models/customer-order-info.interface';
import { orderActions } from '../../shopping/state/order/order.actions';
import { environment as env } from '../../../environments/environment.development';
import { IPaymentRequest, IPaymentResponse } from '../models/payment.interface';
import { OrderStatus } from '../types/order-status.enum';
import { PaymentMethod } from '../types/payment-method.enum';
import { OrdersSortBy, OrdersSortType } from '../ui-models/order-filter-data';
@Injectable({
    providedIn: 'root'
})
export class OrderService {
    trackingOrderKey = 'trackingOrderId';
    geometryKey = 'geometry';
    addressKey = 'address';

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

    exchangeGeometryForAddressThenSaveToLS(geometry: object) {
        let addressExchanged = {
            country: 'Viet Nam',
            cityOrProvinceOrPlace: 'Ho Chi Minh City',
            districtOrLocality: 'Thu Duc',
            postalCode: '700000',
            street: '123 Nguyen Van Linh',
            fullAddressName: '123 Nguyen Van Linh, Thu Duc, Ho Chi Minh City, Viet Nam'
        };
        localStorage.setItem(this.addressKey, JSON.stringify(addressExchanged));
        return JSON.stringify(addressExchanged);
    }

    loadAddressFromStorage() {
        let geometry = localStorage.getItem(this.geometryKey);
        let address = localStorage.getItem(this.addressKey);
        if (geometry === null) {
            if (!navigator.geolocation) {
                console.log('You refused to use geolocation api');
                return;
            }
            navigator.geolocation.getCurrentPosition((position) => {
                let geometryObj = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                geometry = this.storeGeometryToLocalStorage(geometryObj);
            });
        }

        if (geometry === null) {
            console.log('Cannot get geometry from storage.');
            return;
        }

        let geometryObj = JSON.parse(geometry);
        if (address === null) {
            address = this.exchangeGeometryForAddressThenSaveToLS(geometryObj);
        }

        if (address === null) {
            console.log('Cannot get address from storage & cannot exchange geometry for address.');
            return;
        }

        let customerOrderInfo: ICustomerOrderInfo = {
            geometry: geometryObj,
            address: JSON.parse(address)
        };
        this._store.dispatch(
            orderActions.customerOrderInfoSetted({ customerOrderInfo: customerOrderInfo })
        );
    }

    storeGeometryToLocalStorage(geometry: object) {
        let geometryStr = JSON.stringify(geometry);
        localStorage.setItem(this.geometryKey, geometryStr);
        return geometryStr;
    }

    clearAddressInLocalStorage() {
        localStorage.removeItem(this.geometryKey);
        localStorage.removeItem(this.addressKey);
    }

    confirmOrderCustomerInfo(customerOrderInfoConfirmedReq: ICustomerOrderInfoConfirmedRequest) {
        return this._http.post<IOrderAggregateCart>(
            `${env.BASEURL}/api/OrderCart/OrderAPI/ConfirmOrderCustomerInfo`,
            customerOrderInfoConfirmedReq
        );
    }

    loadOrderFitlerdSortedPaginatedListOfUser(
        orderListFilterOrderStatus: OrderStatus | null,
        orderListFilterPaymentMethod: PaymentMethod | null,
        orderListPageNum: number,
        orderListPageSize: number,
        orderListSortBy: OrdersSortBy,
        orderListSortType: OrdersSortType,
        uId: string
    ) {
        let httpParams = new HttpParams().appendAll({
            sortBy: orderListSortBy,
            page: orderListPageNum,
            pageSize: orderListPageSize,
            sortType: orderListSortType,
            userId: uId
        });
        if (orderListFilterOrderStatus !== null) {
            httpParams = httpParams.append('filterOrderStatus', orderListFilterOrderStatus);
        }
        if (orderListFilterPaymentMethod !== null) {
            httpParams = httpParams.append('filterPaymentMethod', orderListFilterPaymentMethod);
        }
        console.log(httpParams);
        console.log('Key:', httpParams.keys());
        //key must match property name in OrderAggregateCartViewModelEnvelope in backend
        return this._http.get<{
            orderAggregateCartViewModels: IOrderAggregateCart[];
            totalOrdersCount: number;
        }>(`${env.BASEURL}/api/OrderCart/OrderAPI/GetOrdersAggregateCartFilterSortPaginationOfUser`, {
            params: httpParams
        });
    }

    pickPaymentMethodCOD(trackingOrder: IOrderAggregateCart) {
        let orderId = trackingOrder?.orderId;
        if (orderId === undefined || orderId === null) {
            alert('There is an exception from picking payment method COD. Please try again later');
            return;
        }
        return this._http.put<IOrderAggregateCart>(
            `${env.BASEURL}/api/OrderCart/OrderAPI/PickPaymentMethodCOD?orderId=${orderId}`,
            {}
        );
    }

    pickPaymentMethodEWallet(trackingOrder: IOrderAggregateCart, userId: string) {
        if (trackingOrder === null) {
            alert(
                'There is an exception from picking payment method E-wallet. Please try again later'
            );
            return;
        }
        let paymentRequest: IPaymentRequest = {
            userId: userId,
            orderId: trackingOrder.orderId,
            subTotal: trackingOrder.cart.totalPriceOriginal,
            totalDiscount: trackingOrder.cart.totalSaleDiscountAmount
        };
        return this._http.post<IPaymentResponse>(
            `${env.BASEURL}/api/Payment/MomoAPI/MakePayment`,
            paymentRequest
        );
    }

    //TODO vì việc thanh toán thành công được xử lý ở webhook và webhook trả kq về cho stripe server =>
    //phải thông báo cho user thanh toán thàng công qua signalR notification hub để stopTracking order
    //lúc này sẽ có 1 trang để list các order đã xong và chờ được duyệt
    pickPaymentMethodCreditCard(trackingOrder: IOrderAggregateCart, userId: string) {
        if (trackingOrder === null) {
            alert(
                'There is an exception from picking payment method Credit card. Please try again later'
            );
            return;
        }
        let paymentRequest: IPaymentRequest = {
            userId: userId,
            orderId: trackingOrder.orderId,
            subTotal: trackingOrder.cart.totalPriceOriginal,
            totalDiscount: trackingOrder.cart.totalSaleDiscountAmount
        };
        return this._http.post<IPaymentResponse>(
            `${env.BASEURL}/api/Payment/StripeAPI/MakePayment`,
            paymentRequest
        );
    }

    getOrderAggregateCartByOrderId(orderId: string) {
        return this._http.get<IOrderAggregateCart>(
            `${env.BASEURL}/api/OrderCart/OrderAPI/GetOrderAggregateCartByOrderId?orderId=${orderId}`
        );
    }
}
