import { createReducer, on } from "@ngrx/store";
import { User } from "../../../shared/models/users";
import { setAuthUser, unsetAuthUser } from "./auth.actions";

export const authFeatureName = 'auth';


export interface AuthState {
    authUser: User | null
}


const initialState: AuthState = {
    authUser: null
}

export const authReducer = createReducer(initialState,
    on(setAuthUser, (state, action) => {
        return {
            ...state,
            authUser: action.payload,
        }
    }),
    on(unsetAuthUser, () => initialState)
)