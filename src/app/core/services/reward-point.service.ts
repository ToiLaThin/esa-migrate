import { environment as env } from '../../../environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IUserRewardPoint } from '../models/reward-point.interface';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class RewardPointService {
    constructor(private _http: HttpClient) {}

    getCurrentUserRewardPoints(userId: string) {
        let headers = new HttpHeaders(`userId: ${userId}`);
        return this._http.get<IUserRewardPoint>(
            `${env.BASEURL}/api/CustomerLoyaltyProgram/UserRewardPointAPI/GetRewardPointOfUser`,
            { headers: headers }
        );
    }
}
