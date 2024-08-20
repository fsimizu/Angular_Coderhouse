import { createAction, props } from "@ngrx/store";
import { User } from "../../../shared/models/users";

export const setAuthUser = createAction(
    '[Auth] set auth user', 
    props<{ payload: User}>() 
);


export const unsetAuthUser = createAction(
    '[Auth] unset auth user'
);