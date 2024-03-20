import { createReducer, on } from '@ngrx/store';
import { AuthStatus } from '../../core/types/auth-status.enum';
import { IAuthState } from './authState.interface';
import { authActions } from './auth.actions';

export const initialAuthState: IAuthState = {
    user: null,
    authStatus: AuthStatus.Anonymous
};

export const authFeatureKey = 'authFeature';
export const authReducer = createReducer(
    initialAuthState,
    on(authActions.loginSuccessfull, (state, action) => {
        return {
            ...state,
            user: action.returnedUser,
            authStatus: AuthStatus.Authenticated
        };
    }),
    on(authActions.logoutSuccessfull, (state, action) => {
        return {
            ...state,
            user: null,
            authStatus: AuthStatus.Anonymous
        };
    })
);
