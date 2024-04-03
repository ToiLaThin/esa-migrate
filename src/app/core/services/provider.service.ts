import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { environment as env } from '../../../environments/environment.development';
import { IProviderRequirement } from '../models/provider.interface';
@Injectable({
  providedIn: 'root'
})
export class ProviderService {
  constructor(private _http: HttpClient) { 
  }

  public getAllProviderRequirements(): Observable<IProviderRequirement[]> {
    return this._http.get<IProviderRequirement[]>(`${env.BASEURL}/api/StockProviderRequest/ProviderRequirementAPI/GetAllProviderRequirements`);    
  }
}
