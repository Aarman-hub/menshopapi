import { 
    SET_CURRENT_USER,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    ERROR,
    AUTH_ERROR
 } from "../constants/constants";
import axios from 'axios';

import { getServer } from '../../utils/index';
import setAuthToken from '../../utils/setAuthToken';

export const currentUser = user => async dispatch =>{
    if(localStorage.token){
        setAuthToken(localStorage.token);
    }
    try {
        const res = await axios.get(`${getServer}/api/auth/`);
        dispatch({
            type:SET_CURRENT_USER,
            payload:res.data
        });
    } catch (error) {
        dispatch({
            type:AUTH_ERROR
        });
    }

}

export const register = userData => async (dispatch) =>{
    const config = {
        headers:{
            "Content-type":"application/json"
        }
    }

    try {
        const res = await axios.post(`${getServer}/api/user/`, userData, config);
        dispatch({
            type:REGISTER_SUCCESS,
            payload:res.data
        });

    } catch (err) {
        const error = err.response.data.errors;
        if(error){
            dispatch({
                type:ERROR,
                payload:error
            });
        }else{
            dispatch({
                type:REGISTER_FAIL
            })
        }
    }
} 