import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { AuthStatus } from "../../core/types/auth-status.enum";
import { AuthService } from "../../core/services/auth.service";

@Component({
    selector: 'esa-shopping-header-topbar',
    templateUrl: './header-topbar.component.html'
})
export class HeaderTopbarComponent implements OnInit {
    userName$!: Observable<string>;
    userRole$!: Observable<string>;
    authStatus$!: Observable<AuthStatus>;
    get AuthStatus() { return AuthStatus; } //for template to use enum

    constructor(private _authService: AuthService) {}

    ngOnInit(): void {
        this.userName$ = this._authService.userName$;
        this.userRole$ = this._authService.userRole$;
        this.authStatus$ = this._authService.authStatus$

        this.authStatus$.subscribe(
            x => console.log(x)
        )
    }

    login() {
        this._authService.login();
    }

    logout() {
        this._authService.logout();
    }
}
