import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { RewardPointService } from '../../../core/services/reward-point.service';
import { managementActions } from './management.actions';
import { catchError, map, of, switchMap } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { ThemeType } from '../../../core/ui-models/theme-type';

@Injectable({
    providedIn: 'root'
})
export class ManagementEffects {
    constructor(
        private actions$: Actions,
        private _rewardPointService: RewardPointService,
        private _translateService: TranslateService
    ) {}
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

    changeLanguage$ = createEffect(() =>
        this.actions$.pipe(
            ofType(managementActions.changeLanguage),
            map((action) => {
                this._translateService.use(action.newLanguage);
            })
        ), { dispatch: false}
    );

    changeTheme$ = createEffect(() =>
        this.actions$.pipe(
            ofType(managementActions.changeTheme),
            map((action) => {
                let themeContainer = document.body;
                if (action.newTheme == ThemeType.LIGHT) {
                    themeContainer.classList.remove(ThemeType.DARK);
                    themeContainer.classList.add(ThemeType.LIGHT);
                    return;
                }
                themeContainer.classList.remove(ThemeType.LIGHT);
                themeContainer.classList.add(ThemeType.DARK);
            })
        ), { dispatch: false}
    );
}
