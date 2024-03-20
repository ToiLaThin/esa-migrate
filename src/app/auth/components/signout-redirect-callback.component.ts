import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { authActions } from '../state/auth.actions';

@Component({
    //selector: 'esa-signout-redirect-callback',
    template: ``,
    styles: [``]
})
export class SignoutRedirectCallbackComponent implements OnInit {
    constructor(private _store: Store) {}

    ngOnInit(): void {
        this._store.dispatch(authActions.logoutRedirected());
    }
}
