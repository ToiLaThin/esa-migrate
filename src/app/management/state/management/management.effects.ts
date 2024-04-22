import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { RewardPointService } from '../../../core/services/reward-point.service';
import { managementActions } from './management.actions';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { ThemeType } from '../../../core/ui-models/theme-type';
import { AccessibilityService } from '../../../core/services/accessibility.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Injectable({
    providedIn: 'root'
})
export class ManagementEffects {
    constructor(
        private actions$: Actions,
        private _rewardPointService: RewardPointService,
        private _translateService: TranslateService,
        private _accessibilityService: AccessibilityService,
        private _nzNotificationService: NzNotificationService
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

    loadThemeFromStorage$ = createEffect(() =>
        this.actions$.pipe(
            ofType(managementActions.loadThemeFromStorage),
            switchMap((_) => {
                let loadedTheme = this._accessibilityService.loadThemeFromStorage();
                if (!loadedTheme) {
                    this._nzNotificationService.info('Cannot load theme from storage, use default', '');
                }
                return of(managementActions.changeTheme({ newTheme: loadedTheme }));
            })
        )
    );
    loadCurrencyFromStorage$ = createEffect(() =>
        this.actions$.pipe(
            ofType(managementActions.loadCurrencyFromStorage),
            switchMap((_) => {
                let loadedCurrency = this._accessibilityService.loadCurrencyFromStorage();
                if (!loadedCurrency) {
                    this._nzNotificationService.info('Cannot load currency from storage, use default', '');
                }
                return of(managementActions.changeCurrency({ newCurrency: loadedCurrency }));
            })
        )
    );
    loadLanguageFromStorage$ = createEffect(() =>
        this.actions$.pipe(
            ofType(managementActions.loadLanguageFromStorage),
            switchMap((_) => {
                let loadedLang = this._accessibilityService.loadLanguageFromStorage();
                if (!loadedLang) {
                    this._nzNotificationService.info('Cannot load language from storage, use default', '');
                }
                return of(managementActions.changeLanguage({ newLanguage: loadedLang}));
            })
        )
    );
    changeCurrency$ = createEffect(() =>
        this.actions$.pipe(
            ofType(managementActions.changeCurrency),
            tap((action) => {
                this._accessibilityService.updateCurrencyInStorage(action.newCurrency);
            }),
        ), { dispatch: false}
    );

    changeLanguage$ = createEffect(() =>
        this.actions$.pipe(
            ofType(managementActions.changeLanguage),
            tap((action) => {
                this._accessibilityService.updateLanguageInStorage(action.newLanguage);
            }),
            map((action) => {
                this._translateService.use(action.newLanguage);
            }),
        ), { dispatch: false}
    );

    changeTheme$ = createEffect(() =>
        this.actions$.pipe(
            ofType(managementActions.changeTheme),
            tap((action) => {
                this._accessibilityService.updateThemeInStorage(action.newTheme);
            }),
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
