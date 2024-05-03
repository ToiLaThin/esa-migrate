import { createReducer, on } from '@ngrx/store';
import { AuthStatus } from '../../core/types/auth-status.enum';
import { IAuthState } from './authState.interface';
import { authActions } from './auth.actions';

export const initialAuthState: IAuthState = {
    user: null,
    authStatus: AuthStatus.Anonymous,
    userInfo: null
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
            authStatus: AuthStatus.Anonymous,
            userInfo: null
        };
    }),
    on(authActions.userUpdated, (state, action) => {
        return {
            ...state,
            user: action.updatedUser
        };
    }),
    on(authActions.sessionValid, (state) => {
        return {
            ...state,
            authStatus: AuthStatus.Authenticated
        };
    }),
    on(authActions.loadUserInfoSuccessfull, (state, action) => {
        return {
            ...state,
            userInfo: action.userInfo
        };
    }),
);
