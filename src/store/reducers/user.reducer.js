import axios from "axios";
import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";

export const firstLoginRequest = createAsyncThunk("FIRST_LOGIN", (userData) => {
    return axios
        .post("/api/users/signup", {
            email: userData.email,
            token: userData.accessKey,
        })
        .then((r) => {
            console.log("sor r data: ", r);
            return r.data;
        })
        .catch((error) => error.response.data.message);
});

export const createPassRequest = createAsyncThunk("CREATE_PASS", (userData) => {
    return axios
        .post("/api/users/newpass", {
            email: userData.email,
            token: userData.token,
            password: userData.password,
        })
        .then((r) => r.data);
});

const userReducer = createReducer(
    {},
    {
        [firstLoginRequest.fulfilled]: (state, action) => action.payload,
        [firstLoginRequest.rejected]: (state, action) => action.payload,
        [createPassRequest.fulfilled]: (state, action) => action.payload,
    }
);

export default userReducer;
