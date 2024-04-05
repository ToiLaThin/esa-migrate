import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../../environments/environment.development';
import { IOrderApprovedAggregate, IOrderItemsAndStockAggregate } from '../models/order-approve.model';

@Injectable({
  providedIn: 'root'
})
export class OrderApproveService {

  constructor(private _http: HttpClient) {
  }

  public getBatchOrderApprove() {
    return this._http.get<IOrderItemsAndStockAggregate>(`${env.BASEURL}/api/Aggregate/ReadAggregator/GetOrderToApproveWithStock`);
  }

  confirmApprovedOrders(approvedOrders: IOrderApprovedAggregate[]) {
    if (!approvedOrders || approvedOrders.length === 0) {
      return;
    }
    const httpOptions: any = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json; text/plain;'
      },
      responseType: 'text'
    };
    return this._http.post(`${env.BASEURL}/api/Aggregate/WriteAggregator/ApproveOrdersAndModifyStocks`, approvedOrders, { responseType: 'text'});
    //return this._http.post(`${env.BASEURL}/api/Aggregate/WriteAggregator/ApproveOrdersAndModifyStocks`, approvedOrders, httpOptions);
  }
}
