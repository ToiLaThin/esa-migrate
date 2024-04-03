import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProviderService } from '../../../core/services/provider.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { providerStockManagementActions } from './provider-stock.actions';
import { switchMap, map, tap, catchError, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProviderStockManagementEffects {
    constructor(
        private actions$: Actions,
        private _providerService: ProviderService,
        private _notificationService: NzNotificationService
    ) {}

    loadAllProviderRequirementsEffect = createEffect(() =>
        this.actions$.pipe(
            ofType(providerStockManagementActions.loadAllProviderRequirements),
            switchMap((action) =>
                this._providerService.getAllProviderRequirements().pipe(
                    map((allProviderRequirements) =>
                        providerStockManagementActions.loadAllProviderRequirementsSuccess({
                            loadedProviderRequirements: allProviderRequirements
                        })
                    ),
                    tap(() =>
                        this._notificationService.create(
                            'success',
                            'All provider requirements loaded successfully',
                            ''
                        )
                    ),
                    catchError((err) => {
                        this._notificationService.create('error', `Error: ${err.title}`, '');
                        return of(
                            providerStockManagementActions.loadAllProviderRequirementsFailed({
                                error: err
                            })
                        );
                    })
                )
            )
        )
    );
}
