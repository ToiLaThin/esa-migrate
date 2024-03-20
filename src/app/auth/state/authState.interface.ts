import { User } from "oidc-client";
import { AuthStatus } from "../../core/types/auth-status.enum";

export interface IAuthState {
    user: User | null;
    authStatus: AuthStatus;
}