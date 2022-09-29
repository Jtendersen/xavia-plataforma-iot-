import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import axios from "axios";

export const getDevices = createAsyncThunk("GET_DEVICES", (user_id) => {
    return axios.get(`/api/device/user/${user_id}`).then(({data}) => data);
  });

const deviceMeasures = createReducer(
        false,
    {
      [getDevices.fulfilled]: (state, action) => action.payload,
      [getDevices.rejected]: (state, action) => state = false
    }
  );

export default deviceMeasures;