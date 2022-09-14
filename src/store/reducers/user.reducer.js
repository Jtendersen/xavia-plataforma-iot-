import axios from "axios";
import {
    createAction,
    createAsyncThunk,
    createReducer,
} from "@reduxjs/toolkit";

const initialState = {
    state: "loading",
};

export const loginRequest = createAsyncThunk("USER_LOGIN", (userData) => {
    return axios
        .post("/api/auth/login", {
            email: userData.email,
            password: userData.password,
        })
        .then((r) => {
            return r.data;
        })
        .catch((error) => error.response.data.message);
});

export const logoutRequest = createAsyncThunk("USER_LOGOUT", () => {
  return axios
  .post("/api/auth/logout")
  .then(() => {return {state: 'rejected'}})
})

export const createPassRequest = createAsyncThunk("CREATE_PASS", (userData) => {
    return axios
        .post("/api/users/newpass", {
            email: userData.email,
            token: userData.token,
            password: userData.password,
        })
        .then((r) => r.data);
});

export const forgotPassRequest = createAsyncThunk("FORGOT_PASS", (userData) => {
    return axios
        .put("/api/auth/forgot-password", {
            email: userData.email,
        })
        .then((r) => r.data);
});

export const resetPassRequest = createAsyncThunk("RESET_PASS", (userData) => {
    return axios
        .put("/api/auth/reset-password", {
            // email: userData.email,
            newPassword: userData.password,
            resetLink: userData.token,
        })
        .then((r) => r.data);
});
export const setUser = createAction("SET_USER")
export const getUserRequest = createAsyncThunk("GET_USER", (userId) => {
    return axios.get(`/api/users/${userId}`).then((r) => r.data);
});

const userReducer = createReducer(initialState, {
    [loginRequest.fulfilled]: (state, action) => action.payload,
    [createPassRequest.fulfilled]: (state, action) => action.payload,
    [forgotPassRequest.fullfilled]: (state, action) => action.payload,
    [resetPassRequest.fullfilled]: (state, action) => action.payload,
    [setUser]: (state, action) => action.payload,
    [logoutRequest.fulfilled]: (state, action) => action.payload,
    [getUserRequest.fulfilled]: (state, action) => action.payload,
});


  export default userReducer;
