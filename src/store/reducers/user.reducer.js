import axios from "axios";
import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";

// export const firstLoginRequest = createAsyncThunk("FIRST_LOGIN", (userData) => {
//   return axios
//     .post("/api/users/signup", {
//       email: userData.email,
//       token: Number(userData.token),
//     })
//     .then((r) => {
//       return r.data;
//     })
//     .catch((error) => error.response.data.message);
// });

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

export const setUser = createAsyncThunk("SET_USER", (user) => {
  return user;
});

const userReducer = createReducer(
  {},
  {
    // [firstLoginRequest.fulfilled]: (state, action) => action.payload,
    [loginRequest.fulfilled]: (state, action) => action.payload,
    [createPassRequest.fulfilled]: (state, action) => action.payload,
    [forgotPassRequest.fullfilled]: (state, action) => action.payload,
    [resetPassRequest.fullfilled]: (state, action) => action.payload,
    [setUser.fulfilled]: (state, action) => action.payload,
  }
);

export default userReducer;
