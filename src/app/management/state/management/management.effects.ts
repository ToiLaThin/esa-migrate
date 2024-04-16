import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { RewardPointService } from '../../../core/services/reward-point.service';
import { managementActions } from './management.actions';
import { catchError, map, of, switchMap } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ManagementEffects {
    constructor(private actions$: Actions, private _rewardPointService: RewardPointService) {}
    // Load Current Logged In User 's Reward Points
    loadUserRewardPoints$ = createEffect(() =>
        this.actions$.pipe(
            ofType(managementActions.loadUserRewardPoints),
            switchMap((action) =>
                this._rewardPointService.getCurrentUserRewardPoints(action.userId).pipe(
                    map((userRewardPoints) =>
                        managementActions.loadUserRewardPointsSuccessfully({
                            userRewardPoints: userRewardPoints
                        })
                    ),
                    catchError((error) =>
                        of(managementActions.loadUserRewardPointsFailed({ error: error }))
                    )
                )
            )
        )
    );
}
