import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { AuthStatus } from '../types/auth-status.enum';
import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import * as signalR from '@microsoft/signalr';
import { environment as env } from '../../../environments/environment.development';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Injectable({ providedIn: 'root' })
export class SignalrService {
    hubConnection!: HubConnection;
    constructor(
        private _authService: AuthService,
        private _notificationService: NzNotificationService
    ) {
        this.initConnection();
    }

    public stopConnection() {
        if (this.hubConnection)
            //https://learn.microsoft.com/en-us/aspnet/signalr/overview/guide-to-the-api/handling-connection-lifetime-events#clientdisconnect
            //this also called in browser event, and server will trigger OnDisconnected immediately
            this.hubConnection.stop();
    }
    public initConnection() {
        if (this._authService.authStatus === AuthStatus.Authenticated) {
            this.hubConnection = new HubConnectionBuilder()
                .withUrl(`${env.NOTIFICATIONHUBROOT}`, {
                    transport:
                        signalR.HttpTransportType.WebSockets |
                        signalR.HttpTransportType.ServerSentEvents,
                    accessTokenFactory: () => this._authService.accessToken
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
