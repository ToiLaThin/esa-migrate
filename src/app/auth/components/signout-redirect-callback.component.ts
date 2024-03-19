import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { SignalrService } from '../../core/services/signalr.service';

@Component({
    //selector: 'esa-signout-redirect-callback',
    template: ``,
    styles: [``]
})
export class SignoutRedirectCallbackComponent implements OnInit {
    constructor(
        private _authService: AuthService,
        private _router: Router,
        private _signalrService: SignalrService
    ) {}

    ngOnInit(): void {
        this._authService.finishLogout().then(() => {
            this._signalrService.stopConnection();
            this._router.navigate(['/'], { replaceUrl: true });
        });
    }
}
