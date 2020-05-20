import axios from "axios";
import { createMessage } from "./message";
import {
    USER_LOADING,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
} from "./types";
import { STATUS_ERROR, SOMETHING_WRONG } from "./constants";

// CHECK TOKEN & LOAD USER
export const loadUser = () => (dispatch, getState) => {
    // User Loading
    dispatch({ type: USER_LOADING });

    axios
        .get("/api/v1/auth/me", tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: USER_LOADED,
                payload: res.data,
            });
        })
        .catch((err) => {
            dispatch({ type: AUTH_ERROR });
        });
};

// USER LOGIN
export const login = (username, password) => (dispatch) => {
    // Headers
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };

    // Request Body
    const body = JSON.stringify({ username, password });

    axios
        .post("/api/v1/auth/login", body, config)
        .then((res) => {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data,
            });
        })
        .catch((err) => {
            dispatch({ type: LOGIN_FAIL });
            if (err.response.data.detail) {
                dispatch(
                    createMessage({
                        status: STATUS_ERROR,
                        message: err.response.data.detail,
                    })
                );
            } else {
                dispatch(
                    createMessage({
                        status: STATUS_ERROR,
                        message: SOMETHING_WRONG,
                    })
                );
            }
        });
};

// USER REGISTER
export const register = ({ first_name, last_name, email, password }) => (
    dispatch
) => {
    // Headers
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };

    // Request Body
    const body = JSON.stringify({
        first_name: first_name,
        last_name: last_name,
        email: email,
        password: password,
        username: first_name,
    });

    axios
        .post("/api/v1/auth/register", body, config)
        .then((res) => {
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data,
            });
        })
        .catch((err) => {
            dispatch({ type: REGISTER_FAIL });
            if (err.response.data.detail) {
                dispatch(
                    createMessage({
                        status: STATUS_ERROR,
                        message: err.response.data.detail,
                    })
                );
            } else {
                dispatch(
                    createMessage({
                        status: STATUS_ERROR,
                        message: SOMETHING_WRONG,
                    })
                );
            }
        });
};

// LOGOUT USER
export const logout = () => (dispatch, getState) => {
    axios
        .post("/api/v1/auth/logout", null, tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: LOGOUT_SUCCESS,
            });
        })
        .catch((err) => {
            if (err.response.data.detail) {
                dispatch(
                    createMessage({
                        status: STATUS_ERROR,
                        message: err.response.data.detail,
                    })
                );
            } else {
                dispatch(
                    createMessage({
                        status: STATUS_ERROR,
                        message: SOMETHING_WRONG,
                    })
                );
            }
        });
};

// SETUP TOKEN CONFIG
export const tokenConfig = (getState) => {
    // Get token from state
    const token = getState().auth.token;

    // Headers
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };

    // If token exist
    if (token) {
        config.headers["Authorization"] = `Token ${token}`;
    }

    return config;
};
