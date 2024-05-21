import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { environment as env } from '../../../environments/environment.development';
import {
    IProductModelInfoWithStockAggregate,
    IProviderRequirement,
    IStockRequestTransaction
} from '../models/provider.interface';
@Injectable({
    providedIn: 'root'
})
export class ProviderService {
    constructor(private _http: HttpClient) {}

    public getAllProviderRequirements(): Observable<IProviderRequirement[]> {
        return this._http.get<IProviderRequirement[]>(
            `${env.BASEURL}/api/StockProviderRequest/ProviderRequirementAPI/GetAllProviderRequirements`
        );
    }

    public getProductModelInfosWithStockOfProvider(
        providerRequirementSelected: IProviderRequirement
    ) {
        return this._http.post<IProductModelInfoWithStockAggregate[]>(
            `${env.BASEURL}/api/Aggregate/ReadAggregator/GetProductModelInfosWithStockOfProvider`,
            providerRequirementSelected.availableStockItemRequestMetas
        );
    }

    public getProductModelInfosWithStockRequestRequire() {
        return this._http.get<IProductModelInfoWithStockAggregate[]>(
            `${env.BASEURL}/api/Aggregate/ReadAggregator/GetProductModelInfosWithStockRequestRequire`
        );
    }

    public confirmStockRequestToProvider(requestBody: IStockRequestTransaction) {
        return this._http.post(`${env.BASEURL}/api/Aggregate/WriteAggregator/AddStockReqTransAndIncreaseStockItems`, requestBody);
    }

}
