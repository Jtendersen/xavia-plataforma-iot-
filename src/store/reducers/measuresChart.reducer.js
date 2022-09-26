import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import axios from "axios";


export const getMeasures = createAsyncThunk("GET_MEASURES", ({measures, device}) => {
    return axios.get(`/api/measures/all?entries=${measures}&devEUI=${device}`).then(({data}) => data)
})



const measuresChart = createReducer(
        false,
    {
      [getMeasures.fulfilled]: (state, action) => action.payload,
    }
  );

export default measuresChart;