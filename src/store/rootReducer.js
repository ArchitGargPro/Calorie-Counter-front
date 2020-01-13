import {EAccess, ELogInStatus, ETables} from "../Constants/EAccess";
import ActionTypes from "./actionTypes";
import AuthUtil from "../utils/AuthUtil";

export const initialState = {
    loginStatus : ELogInStatus.UNATTEMPTED,
    currentTable : ETables.MEAL,
    userAlert : 1,
    access: EAccess.ANONYMOUS
};

export function rootReducer(state = initialState, action) {
    if(!action) {
        return {
            ...state
        }
    }
    switch (action.type) {
        case ActionTypes.SET_LOGIN_STATUS:
            return {
                ...state,
                loginStatus: action.payload.loginStatus
            };
        case ActionTypes.SET_CURRENT_ACCESS :
            return {
                ...state,
                access: action.payload.access
            };
        case ActionTypes.SET_CURRENT_TABLE :
            return {
                ...state,
                currentTable: action.payload.currentTable
            };
        case ActionTypes.NEW_ROW_UPDATE :
            return {
                ...state,
                userAlert: action.payload
            };
        case ActionTypes.RESET :
            return {
                ...initialState
            };
        default :
            return state;
    }
}
