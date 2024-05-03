import { User } from "oidc-client";
import { AuthStatus } from "../../core/types/auth-status.enum";
import { IUserInfo } from "../../core/models/account.interface";

export interface IAuthState {
    user: User | null;
    authStatus: AuthStatus;
    userInfo: IUserInfo | null;
}