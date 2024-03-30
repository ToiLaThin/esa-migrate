import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CouponService } from '../../../core/services/coupon.service';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { CatalogService } from '../../../core/services/catalog.service';
import { productCatalogManagementActions } from './product-catalog-management.actions';

@Injectable({ providedIn: 'root' })
export class ProductCatalogManagementEffects {
    constructor(
        private actions$: Actions,
        private _catalogService: CatalogService,
        private _notificationService: NzNotificationService
    ) {}

    loadCatalogsEffect = createEffect(() =>
        this.actions$.pipe(
            ofType(productCatalogManagementActions.loadAllCatalogs),
            switchMap((_) =>
                this._catalogService.getAllCatalogs().pipe(
                    map((loadedCatalogs) =>
                        productCatalogManagementActions.loadAllCatalogsSuccess({
                            loadedCatalogs: loadedCatalogs
                        })
                    ),
                    catchError((err) =>
                        of(productCatalogManagementActions.loadAllCatalogsFailed({ error: err }))
                    )
                )
            )
        )
    );
    addCatalogEffect = createEffect(() =>
        this.actions$.pipe(
            ofType(productCatalogManagementActions.addNewCatalog),
            switchMap((action) =>
                this._catalogService.addCatalog(action.catalog).pipe(
                    map((addedCatalog) =>
                        productCatalogManagementActions.addNewCatalogSuccess({
                            addedCatalog: addedCatalog
                        })
                    ),
                    tap((action) =>
                        this._notificationService.create(
                            'success',
                            `Catalog "${action.addedCatalog.catalogName}" added successfully`,
                            ''
                        )
                    ),
                    catchError((err) => {                        
                        this._notificationService.create('error', `Error: ${err.title}`, '');
                        return of(
                            productCatalogManagementActions.addNewCatalogFailed({ error: err })
                        );
                    })
                )
            )
        )
    );

    addSubcatalogEffect = createEffect(() =>
        this.actions$.pipe(
            ofType(productCatalogManagementActions.addNewSubcatalog),
            switchMap((action) =>
                this._catalogService.addSubCatalog(action.subcatalog, action.selectedCatalogId).pipe(
                    map((webServerInfo) =>
                        productCatalogManagementActions.addNewSubcatalogSuccess({
                            info: webServerInfo
                        })
                    ),
                    tap((action) =>
                        this._notificationService.create(
                            'success',
                            `From Server "${action.info}"`,
                            ''
                        )
                    ),
                    catchError((err) => {
                        console.log(err);
                        this._notificationService.create('error', `Error: ${err.title}`, '');
                        return of(
                            productCatalogManagementActions.addNewSubcatalogFailed({ error: err })
                        );
                    })
                )
            )
        )
    );
}
