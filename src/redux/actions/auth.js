import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    REGISTER_MEMBER_SUCCESS,
    REGISTER_MEMBER_FAIL,
    VALIDATE_SUCCESS,
    VALIDATE_FAIL,
    VALIDATE_LOCAL_TOKEN,
    VALIDATE_LOCAL_TOKEN_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    GET_USER_SUCCESS,
    GET_USER_FAIL,
    SEND_EMAIL_PASSWORD_RECOVERY_SUCCESS,
    SEND_EMAIL_PASSWORD_RECOVERY_FAIL,
    PASSWORD_RECOVERY_SUCCESS,
    PASSWORD_RECOVERY_FAIL,
    LOGOUT,
    SET_MESSAGE,
    CLEAR_MESSAGE,
    DELETE_CART,
    GUEST_USER,
    LOGGED_USER,
    CLEAR_USER_DATA
    // MEMBER_CANDIDATE
} from "./types";

import AuthService from "../services/auth.service";

export const register = (username, email, password, cart_id) => (dispatch) => {
    return AuthService.register(username, email, password, cart_id).then(
        (response) => {
            dispatch({
                type: REGISTER_SUCCESS,
            });

            dispatch({
                type: SET_MESSAGE,
                payload: response.data.message,
            });

            return Promise.resolve();
        },
        (error) => {
            const message = error.response.data.email
            // (error.response &&
            //     error.response.data &&
            //     error.response.data.message) ||
            // error.message ||
            // error.toString();
            dispatch({
                type: REGISTER_FAIL,
            });

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });

            return Promise.reject();
        }
    );
};

export const registerMember = (address, first_name, last_name, phone_number, username, password, email, cart_id) => (dispatch) => {
    return AuthService.registerMember(address, first_name, last_name, phone_number, username, password, email, cart_id).then(
        () => {
            dispatch({
                type: REGISTER_MEMBER_SUCCESS,
            });

            dispatch({
                type: SET_MESSAGE,
                payload: "Register member success",
            });

            return Promise.resolve();
        },
        (error) => {
            const message = error.response.data.detail
            dispatch({
                type: REGISTER_MEMBER_FAIL,
            });

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });

            return Promise.reject();
        }
    );
};

export const validateEmail = (token) => (dispatch) => {
    return AuthService.validateEmail(token).then(
        (response) => {
            dispatch({
                type: VALIDATE_SUCCESS,
            });

            dispatch({
                type: CLEAR_MESSAGE
            });

            return Promise.resolve();
        },
        (error) => {
            const message = error.response.data?.detail
            // (error.response &&
            //     error.response.data &&
            //     error.response.data.message) ||
            // error.message ||
            // error.toString();

            dispatch({
                type: VALIDATE_FAIL,
                payload: message
            });

            return Promise.reject();
        }
    );
};


export const validateLocalToken = (token) => (dispatch) => {
    return AuthService.validateLocalToken(token).then(
        (response) => {
            dispatch({
                type: VALIDATE_LOCAL_TOKEN,
                payload: response.data
            });

            return Promise.resolve();
        },
        (error) => {
            const message = error.response.data?.detail
            localStorage.removeItem("user");
            dispatch({
                type: VALIDATE_LOCAL_TOKEN_FAIL,
                payload: message
            });

            return Promise.reject();
        }
    );
};

export const login = (username, password) => (dispatch) => {
    return AuthService.login(username, password).then(
        (data) => {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: { user: data },
            });
            dispatch({
                type: LOGGED_USER,
            })

            dispatch({
                type: CLEAR_MESSAGE
            });
            return Promise.resolve();
        },
        (error) => {
            const message = error.response.data?.detail
            // (error.response &&
            //     error.response.data &&
            //     error.response.data.message) ||
            // error.message ||
            // error.toString();
            dispatch({
                type: LOGIN_FAIL,
            });
            dispatch({
                type: GUEST_USER,
            })
            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });

            return Promise.reject();
        }
    );
};



export const getUserData = () => (dispatch) => {
    return AuthService.getUserData().then(
        (data) => {
            dispatch({
                type: GET_USER_SUCCESS,
                payload: { user: data },
            });

            dispatch({
                type: CLEAR_MESSAGE
            });

            return Promise.resolve();
        },
        (error) => {
            const message = error.response.data?.detail
            // (error.response &&
            //     error.response.data &&
            //     error.response.data.message) ||
            // error.message ||
            // error.toString();

            dispatch({
                type: GET_USER_FAIL,
            });

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });

            return Promise.reject();
        }
    );
};

export const passwordRecovery = (token, password) => (dispatch) => {
    return AuthService.passwordRecovery(token, password).then(
        (response) => {
            dispatch({
                type: PASSWORD_RECOVERY_SUCCESS,
            });

            dispatch({
                type: CLEAR_MESSAGE
            });

            return Promise.resolve();
        },
        (error) => {
            const message = error.response.data?.detail
            // (error.response &&
            //     error.response.data &&
            //     error.response.data.message) ||
            // error.message ||
            // error.toString();

            dispatch({
                type: PASSWORD_RECOVERY_FAIL,
                payload: message
            });

            return Promise.reject();
        }
    );
};

export const sendEmailPasswordRecovery = (email) => (dispatch) => {
    return AuthService.sendEmailPasswordRecovery(email).then(
        (response) => {
            dispatch({
                type: SEND_EMAIL_PASSWORD_RECOVERY_SUCCESS,
            });
            dispatch({
                type: CLEAR_MESSAGE,
            });
            return Promise.resolve();
        },
        (error) => {
            const message = error.response.data?.detail
            // (error.response &&
            //     error.response.data &&
            //     error.response.data.message) ||
            // error.message ||
            // error.toString();

            dispatch({
                type: SEND_EMAIL_PASSWORD_RECOVERY_FAIL,
                payload: message
            });

            return Promise.reject();
        }
    );
};

export const logout = () => (dispatch) => {
    AuthService.logout().then(
        (response) => {
            dispatch({
                type: LOGOUT,
            })
            dispatch({
                type: DELETE_CART,
                payload: response,
            });
            dispatch({
                type: GUEST_USER,
            })
            dispatch({
                type: SET_MESSAGE,
                payload: response,
            });

        },
        (error) => {
            const message = error.response.data
            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });
            dispatch({
                type: DELETE_CART
            });
            dispatch({
                type: GUEST_USER,
            })
            dispatch({
                type: CLEAR_USER_DATA,
            })
            dispatch({
                type: CLEAR_MESSAGE,
            });
            return Promise.reject();
        }
    )
};