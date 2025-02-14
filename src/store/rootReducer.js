import {EAccess, ELogInStatus, ETables} from "../Constants/EAccess";
import ActionTypes from "./actionTypes";
import AuthUtil from "../utils/AuthUtil";
// import ERegistrationStatus from "../Constants/ERegistrationStatus";


const initialStateGenerator = () => {
    if (AuthUtil.getUser()) {
        //console.log('<<<<<<<<<<<<<<<<<<<<<<<<<<<<authutil is present>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
        const data = JSON.parse(localStorage.getItem('user'));
        let access;
        switch (data.access) {
            case 0: access = EAccess.USER;
            break;
            case 1: access = EAccess.MANAGER;
            break;
            case 2: access = EAccess.ADMIN;
            break;
            default: access = EAccess.ANONYMOUS;
        }

        return(
            {
                loginStatus : ELogInStatus.LOGGEDIN,
                currentTable : ETables.MEAL,
                access: access,
                mealData : null,
                userData : null,
                expectedValue : 0,

            }
        );

        }
    else{
        // console.log('<<<<<<<<<<<<<<<<<<<<<<<<<<<<nope nope nope>>>>>>>>>>>>>>>>>>>>>>>>>>>>')

        return(
            {
                loginStatus : ELogInStatus.UNATTEMPTED,
                currentTable : ETables.MEAL,
                access: EAccess.ANONYMOUS,
                mealData : null,
                userData : null,
                expectedValue : 0,

            }
        );
    }
};

export const initialState = initialStateGenerator(); //to save state on refresh


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
        case ActionTypes.SET_MEAL_DATA :
            return {
                ...state,
                mealData: action.payload.mealData
            };
        case ActionTypes.SET_USER_DATA :
            return {
                ...state,
                userData : action.payload.userData
            };
        case ActionTypes.SET_EXPECTED_DATA :
            return {
                ...state,
                expectedValue : action.payload.expectedValue
            };
        case ActionTypes.RESET :
            return (initialStateGenerator()); //send the new state, instead of cached one
        default :
            return state;
    }
}
