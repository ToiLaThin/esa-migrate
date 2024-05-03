import { createSelector } from '@ngrx/store';
import { authFeatureKey } from './auth.reducers';
import { IAuthState } from './authState.interface';
import { jwtDecode } from 'jwt-decode';
import { IUserEnvelope, IUserInfo } from '../../core/models/account.interface';

export const selectorAuthFeature = (state: { [authFeatureKey]: IAuthState }) =>
    state[authFeatureKey];

export const selectorAuthStatus = createSelector(
    selectorAuthFeature,
    (authState) => authState.authStatus
);
// ko the inject store vao selector
// => ko the dispatch check session when accessing auth status, tokens
// => use setInteval to check session
export const selectorCurrentUser = createSelector(
    selectorAuthFeature,
    (authState) => authState.user
);

export const selectorIdToken = createSelector(selectorAuthFeature, (authState) => {
    const user = authState.user;
    if (!user) {
        return '';
    }
    const idToken = user?.id_token;
    return idToken;
});

export const selectorAccessToken = createSelector(selectorAuthFeature, (authState) => {
    const user = authState.user;
    if (!user) {
        return '';
    }
    const accessToken = user?.access_token;
    return accessToken;
});
export const selectorUserName = createSelector(selectorAuthFeature, (authState) => {
    const user = authState.user;
    if (!user) {
        return '';
    }
    return user?.profile.sub;
});

export const selectorUserId = createSelector(selectorAuthFeature, (authState) => {
    const user = authState.user;
    if (!user) {
        return '';
    }
    const idToken = user?.id_token;
    if (!idToken) {
        return '';
    }
    let decodedIdToken: object = jwtDecode(idToken as string);
    return (decodedIdToken as any).sub;
});

export const selectorUserRole = createSelector(selectorAuthFeature, (authState) => {
    const user = authState.user;
    if (!user) {
        return '';
    }
    const idToken = user?.id_token;
    if (!idToken) {
        return '';
    }
    let decodedIdToken: object = jwtDecode(idToken as string);
    return (decodedIdToken as any).role;
});

export const selectorUserInfo = createSelector(
    selectorAuthFeature,
    (authState) => authState.userInfo
);

