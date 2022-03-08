import React from "react";
import { isEmpty } from 'lodash'
import { AUTH_ERROR, ERROR, REGISTER_FAIL, REGISTER_SUCCESS, SET_CURRENT_USER } from "../constants/constants";

const initialState = {
    isAuthenticated:false,
    token:localStorage.getItem("token"),
    user:{},
    error:[]
}

const authReducer = (state = initialState, action) => {
    const {payload} = action;
    switch (action.type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                isAuthenticated: true,
                user:payload,
            };
        case REGISTER_SUCCESS:
            localStorage.setItem("token", payload.token)
            return {
                ...state,
                ...payload,
                isAuthenticated:true,
            };
        
        case REGISTER_FAIL:
        case AUTH_ERROR:
            localStorage.removeItem("token")
            return{
                ...state,
                token:null,
                isAuthenticated:false,
            };
        case ERROR:
            return{
                ...state,
                errors:payload
            }
        default:
           return state;
    }
}

export default authReducer;