import axios from "axios";
import * as actionTypes from "./actionTypes";

export function authStart() {
    return {
        type: actionTypes.AUTH_START
    }
}

export function authSuccess(idToken, userId) {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken,
        userId
    }
}

export function authFail(error) {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export function logout() {
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("expirationDate");
    window.localStorage.removeItem("userId");
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export function checkAuthTimeout(expirationTime) {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000)
    }
}

export function auth(email, password, isSignup) {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email,
            password,
            returnSecureToken: true
        }
        let url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBjz0ZLNEkokyz8eN8FoKNMtl9xmz7dOoA`;

        if(!isSignup) url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBjz0ZLNEkokyz8eN8FoKNMtl9xmz7dOoA`

        axios.post(url, authData)
            .then(response => {

                const expirationDate = new Date(new Date().getTime() + (response.data.expiresIn * 1000));

                window.localStorage.setItem(`token`, response.data.idToken);
                window.localStorage.setItem(`expirationDate`, expirationDate);
                window.localStorage.setItem(`userId`, response.data.localId)

                dispatch(authSuccess(response.data.idToken, response.data.localId));
                dispatch(checkAuthTimeout(response.data.expiresIn))
            })
            .catch(err => {
                dispatch(authFail(err.response.data.error))
            })
    }
}

export function setAuthRedirectPath(path) {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path
    }
}

export function authCheckState() {
    return dispatch => {

        const token = window.localStorage.getItem("token");
        const userId = window.localStorage.getItem("userId")
        let expirationDate = window.localStorage.getItem("expirationDate")

        if(!token || !expirationDate || !userId) {
            dispatch(logout());
        } else {

            expirationDate = new Date(expirationDate);

            if(expirationDate <= new Date()) {
                dispatch(logout())
            } else {
                dispatch(authSuccess(token, userId));
                dispatch(checkAuthTimeout( (expirationDate.getTime() - new Date().getTime()) / 1000 ))
            }

        }



    }
}
