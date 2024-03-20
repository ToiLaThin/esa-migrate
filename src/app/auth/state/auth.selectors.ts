import { createSelector } from "@ngrx/store";
import { authFeatureKey } from "./auth.reducers";
import { IAuthState } from "./authState.interface";
import { jwtDecode } from "jwt-decode";

export const selectorAuthFeature = (state: { [authFeatureKey]: IAuthState }) => state[authFeatureKey];

export const selectorAuthStatus = createSelector(
    selectorAuthFeature,
    (authState) => authState.authStatus
)

export const selectorCurrentUser = createSelector(
    selectorAuthFeature,
    (authState) => authState.user
)

export const selectorIdToken = createSelector(
    selectorAuthFeature,
    (authState) => {
        const user = authState.user;
        if (!user) {
            return ''
        }
        const idToken = user?.id_token;
        return idToken;
    }
)

export const selectorAccessToken = createSelector(
    selectorAuthFeature,
    (authState) => {
        const user = authState.user;
        if (!user) {
            return ''
        }
        const accessToken = user?.access_token;
        return accessToken;
    }
)
export const selectorUserName = createSelector(
    selectorAuthFeature,
    (authState) => {
        const user = authState.user;
        if (!user) {
            return ''
        }
        const idToken = user?.id_token;
        if (idToken) {
            return ''
        }
        let decodedIdToken : object = jwtDecode(idToken as string);
        return (decodedIdToken as any).name
    }
)

export const selectorUserRole = createSelector(
    selectorAuthFeature,
    (authState) => {
        const user = authState.user;
        if (!user) {
            return ''
        }
        const idToken = user?.id_token;
        if (!idToken) {
            return ''
        }
        let decodedIdToken : object = jwtDecode(idToken as string);
        return (decodedIdToken as any).role
    }
)