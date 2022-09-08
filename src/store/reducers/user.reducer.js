import axios from "axios";
import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";

export const firstLoginRequest = createAsyncThunk("FIRST_LOGIN", (userData) => {
  return axios
    .post("http://localhost:3001/api/users/signup", {
      email: userData.email,
      token: parseInt(userData.accessKey),
    })
    .then((r) => r.data);
});

export const createPassRequest = createAsyncThunk("CREATE_PASS", (userData) => {
  return axios
    .post("http://localhost:3001/api/users/newpass", {
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
    [createPassRequest.fulfilled]: (state, action) => action.payload,
  }
);

export default userReducer;
