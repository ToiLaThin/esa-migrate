import { Component } from "@angular/core";
import { SignalrService } from "../../../../core/services/signalr.service";
import { Router } from "@angular/router";

@Component({
    selector: 'esa-checkout-credit-redirect',
    template: '',
    styles: []
})
//redirect to notify customer page after stripe payment
export class CheckoutCreditRedirectComponent {
    constructor(private _router: Router,private _signalrService: SignalrService) { }
    ngOnInit() {
        this._signalrService.initConnection();
        this._router.navigate(['/shopping/order-process/notify-customer'], { replaceUrl: true });
    }
}