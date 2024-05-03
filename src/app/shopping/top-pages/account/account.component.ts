import { Component, OnDestroy, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { selectorUserId, selectorUserInfo } from "../../../auth/state/auth.selectors";
import { authFeatureKey } from "../../../auth/state/auth.reducers";
import { IAuthState } from "../../../auth/state/authState.interface";
import { Observable, Subject, takeUntil, tap } from "rxjs";
import { IUserEnvelope, IUserInfo } from "../../../core/models/account.interface";
import { FormBuilder, Validators } from "@angular/forms";
import { authActions } from "../../../auth/state/auth.actions";

@Component({
    selector: 'esa-account',
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit, OnDestroy {
    userInfo: IUserInfo | null = null;
    userId!: string;
    destroy$ = new Subject<void>();
    accountForm = this._fb.group({
        avatarUrl: ['', Validators.required],
        username: ['', Validators.required],
        email: ['', Validators.required],
    });

    constructor(private _store: Store, private _fb: FormBuilder) {}

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
    
    ngOnInit(): void {
        this._store.select(state => selectorUserInfo(state as {[authFeatureKey]: IAuthState})).pipe(
            takeUntil(this.destroy$),
            tap(uInfo => {
                this.userInfo = uInfo;
            })
        ).subscribe();
        this._store.select(state => selectorUserId(state as {[authFeatureKey]: IAuthState})).pipe(
            takeUntil(this.destroy$),
            tap(uId => {
                this.userId = uId;
            })
        ).subscribe();

        this.resetForm();
    }

    resetForm() {
        this.accountForm.setValue({
            avatarUrl: this.userInfo!.avatarUrl,
            username: this.userInfo!.username,
            email: this.userInfo!.email
        
        })
    }
    updateUserInfo() {
        let userEnvelope: IUserEnvelope = {
            userId: this.userId,
            esaUserDto: {
                avatarUrl: this.accountForm.get('avatarUrl')?.value as string,
                username: this.accountForm.get('username')?.value as string,
                email: this.accountForm.get('email')?.value as string
            }
        }
        console.log(userEnvelope);
        this._store.dispatch(authActions.updateUserInfo({userEnvelope}));
    }

}