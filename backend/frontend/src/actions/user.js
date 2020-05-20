import axios from "axios";
import { createMessage } from "./message";
import { tokenConfig } from "./auth";
import {
    GET_USER_LIST,
    TOGGLE_ACTIVE,
    UPDATE_USER,
    UPDATE_SUCCESS,
} from "./types";
import { STATUS_ERROR, STATUS_SUCCESS, SOMETHING_WRONG } from "./constants";

export const getUserList = (limit, offset) => (dispatch, getState) => {
    axios
        .get(
            `/api/v1/users?limit=${limit}&offset=${offset}`,
            tokenConfig(getState)
        )
        .then((res) => {
            dispatch({
                type: GET_USER_LIST,
                payload: res.data,
            });
        })
        .catch((err) => {
            dispatch(
                createMessage({
                    status: STATUS_ERROR,
                    message: SOMETHING_WRONG,
                })
            );
        });
};

export const toggleActive = (id) => (dispatch, getState) => {
    axios
        .patch(`/api/v1/users/${id}`, null, tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: TOGGLE_ACTIVE,
                payload: res.data,
            });
        })
        .catch((err) => {
            dispatch(
                createMessage({
                    status: STATUS_ERROR,
                    message: SOMETHING_WRONG,
                })
            );
        });
};

// UPDATE USER
export const updateUser = ({
    id,
    first_name,
    last_name,
    email,
    is_staff,
    is_superuser,
}) => (dispatch, getState) => {
    // Request Body
    const body = JSON.stringify({
        first_name: first_name,
        last_name: last_name,
        email: email,
        username: first_name,
        is_staff: is_staff,
        is_superuser,
        is_superuser,
    });

    axios
        .put(`/api/v1/users/${id}`, body, tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: UPDATE_USER,
                payload: res.data,
            });
            dispatch(
                createMessage({
                    status: STATUS_SUCCESS,
                    message: "User has been updated!",
                })
            );
            dispatch({
                type: UPDATE_SUCCESS,
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
