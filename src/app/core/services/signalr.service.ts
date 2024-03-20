import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { AuthStatus } from '../types/auth-status.enum';
import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import * as signalR from '@microsoft/signalr';
import { environment as env } from '../../../environments/environment.development';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Store } from '@ngrx/store';
import { selectorAccessToken, selectorAuthStatus } from '../../auth/state/auth.selectors';
import { Subscription } from 'rxjs';
import { IAuthState } from '../../auth/state/authState.interface';
import { authFeatureKey } from '../../auth/state/auth.reducers';

@Injectable({ providedIn: 'root' })
export class SignalrService {
    hubConnection!: HubConnection;
    authStatusSubscription!: Subscription;
    acessTokenSubscription!: Subscription;

    constructor(private _store: Store, private _notificationService: NzNotificationService) {
        this.initConnection();
    }

    public stopConnection() {
        if (this.hubConnection) this.hubConnection.stop();
        if (this.authStatusSubscription) {
            this.authStatusSubscription.unsubscribe();
        }
        if (this.acessTokenSubscription) {
            this.acessTokenSubscription.unsubscribe();
        }
    }

    public initConnection() {
        let authStatus: AuthStatus | null = null;
        let accessToken: string | null = null;
        this.authStatusSubscription = this._store
            .select((state) => selectorAuthStatus(state as { [authFeatureKey]: IAuthState }))
            .subscribe((status) => {
                authStatus = status;
            });
        this.acessTokenSubscription = this._store
            .select((state) => selectorAccessToken(state as { [authFeatureKey]: IAuthState }))
            .subscribe((token) => {
                accessToken = token;
            });

        if (authStatus === AuthStatus.Authenticated) {
            this.hubConnection = new HubConnectionBuilder()
                .withUrl(`${env.NOTIFICATIONHUBROOT}`, {
                    transport:
                        signalR.HttpTransportType.WebSockets |
                        signalR.HttpTransportType.ServerSentEvents,
                    accessTokenFactory: () => accessToken as string
                })
                .configureLogging(LogLevel.Information)
                .withAutomaticReconnect()
                .build();

            this.hubConnection
                .start()
                .then(() => {
                    console.log('SignalR connection started');
                    this._notificationService.info('SignalR connection started', 'Success');
                })
                .catch((err: any) => {
                    console.log('Error while starting SignalR connection');

                    this._notificationService.error(err, 'Error');
                });

            this.hubConnection.on('OrderStatusChanged', (message: any) => {
                this._notificationService.info(
                    `Order ${message.orderId} status checkouted by 
                                      ${message.paymentMethod} at 
                                      ${message.dateCheckouted} by 
                                      ${message.paidAmount}`,
                    ''
                );
            });

            this.hubConnection.on('ProductModelPriceChanged', (message: any) => {
                this._notificationService.info(
                    `Product ${message.productName} 's model price changed to ${message.newPrice}`,
                    ''
                );
                // this.cartHttpService.updateProductModelPriceInCart(
                //   message.oldProductId,
                //   message.oldProductModelId,
                //   message.newProductId,
                //   message.newProductModelId,
                //   message.newPrice,
                //   message.newPriceOnSaleModel
                // );
            });
        }
    }
}
