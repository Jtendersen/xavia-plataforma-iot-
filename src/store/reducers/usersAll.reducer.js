import axios from "axios";
import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";

export const getAllUsers = createAsyncThunk("GET_USERS", () => {
  return axios.get("/api/users/all").then((r) => r.data);
});

export const adminDeleteUser = createAsyncThunk(
    "DELETE_USER",
    async (userId) => {
        const axiosUser = await axios.delete(`/api/users/delete/${userId}`);
        console.log("usuario eliminado: ", axiosUser);
    }
);

const initialState = [{
  imgUrl: '-',
  empresa: '-',
  fullname: '-',
  email: false,
  createdAt: '-',
  _id: '1'
}]

const usersAll = createReducer(
  initialState,
  {
    [getAllUsers.fulfilled]: (state, action) => action.payload,
  }
);

export default usersAll;