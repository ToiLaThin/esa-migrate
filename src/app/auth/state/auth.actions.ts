import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { User } from "oidc-client";
import { IUserEnvelope, IUserInfo } from "../../core/models/account.interface";

export const authActions = createActionGroup({
    source: 'Auth Events In Auth Module',
    events: {
        'Login Attempted': emptyProps(),
        'Login Waiting': emptyProps(),
        'Login Redirected': emptyProps(),
        'Login Successfull': props<{returnedUser: User}>(),

        'Logout Attempted': emptyProps(),
        'Logout Waiting': emptyProps(),
        'Logout Redirected': emptyProps(),
        'Logout Successfull': emptyProps(),
        
        'Check Session': emptyProps(),
        'Session Checking': emptyProps(),
        'Session Valid': emptyProps(),
        'User Updated': props<{updatedUser: User}>(),

        'Bootstrap Auth': emptyProps(),

        'Load User Info': props<{userId: string}>(),
        'Load User Info Successfull': props<{userInfo: IUserInfo}>(),
        'Load User Info Failed': props<{error: any}>(),
        'Update User Info': props<{userEnvelope: IUserEnvelope}>(),
    }
})