// reducer

import {
    RESTORE_TOKEN,
    SET_FACTION,
    SET_PRICES,
    SET_REALM,
    SET_USER_PROFILE,
    SIGN_IN,
    SIGN_OUT
} from "../actions/actions";
import {DefaultRootState} from "react-redux";
import {PayloadAction} from "@reduxjs/toolkit";

export interface RootReducerState extends DefaultRootState {
    userToken: any
    isLoading: boolean
    isSignout: boolean
    selectedRealm: string
    selectedFaction: string
    id: string, // user id
    name: string // user name
    prices: any[]
}

const initialRootReducerState: RootReducerState = {
    userToken: null,
    isLoading: true,
    isSignout: false,
    selectedRealm: 'N/A',
    selectedFaction: 'N/A',
    id: '',
    name: '',
    prices: []
}

function rootReducer(state: RootReducerState = initialRootReducerState, action: PayloadAction<any>) {
    switch (action.type) {
        case RESTORE_TOKEN:
            return {
                ...state,
                isLoading: false,
                userToken: action.payload.userToken
            }
        case SIGN_IN:
            return {
                ...state,
                isSignout: false,
                userToken: action.payload.userToken
            }
        case SIGN_OUT:
            return {
                ...state,
                isSignout: true,
                userToken: null
            }
        case SET_USER_PROFILE:
            return {
                ...state,
                id: action.payload.id,
                name: action.payload.name,
            }
        case SET_REALM:
            return {
                ...state,
                selectedRealm: action.payload
            }
        case SET_FACTION:
            return {
                ...state,
                selectedFaction: action.payload
            }
        case SET_PRICES:
            return {
                ...state,
                prices: action.payload
            }
        default:
            return state
    }
}

export default rootReducer