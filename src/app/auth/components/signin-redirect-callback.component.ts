import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { authActions } from '../state/auth.actions';

@Component({
    //selector: 'esa-signin-redirect-callback',
    template: ``,
    styles: []
})
export class SigninRedirectCallbackComponent implements OnInit {
    constructor(private _store: Store) {}

    ngOnInit(): void {
        this._store.dispatch(authActions.loginRedirected());
    }
}
