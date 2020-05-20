import {
    GET_USER_LIST,
    TOGGLE_ACTIVE,
    UPDATE_USER,
    UPDATE_SUCCESS,
} from "../actions/types";

const initialState = {
    users: {
        count: 0,
        next: null,
        previous: null,
        results: [],
    },
    updateSuccess: false,
};
export default function (state = initialState, action) {
    switch (action.type) {
        case GET_USER_LIST:
            return {
                ...state,
                users: action.payload,
                updateSuccess: false,
            };
        case TOGGLE_ACTIVE:
            return {
                ...state,
                users: {
                    ...state.users,
                    results: state.users.results.map((user) =>
                        user.id !== action.payload.id ? user : action.payload
                    ),
                },
            };
        case UPDATE_USER:
            return {
                ...state,
                users: {
                    ...state.users,
                    results: state.users.results.map((user) =>
                        user.id !== action.payload.id ? user : action.payload
                    ),
                },
            };
        case UPDATE_SUCCESS:
            return {
                ...state,
                updateSuccess: true,
            };
        default:
            return state;
    }
}
