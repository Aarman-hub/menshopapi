import React from 'react';
import { combineReducers } from 'redux';
import authReducer from './authReducer';



export default combineReducers({
    user:authReducer,
    });
