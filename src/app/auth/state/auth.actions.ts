import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { User } from "oidc-client";

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
    }
})