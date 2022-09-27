import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import axios from "axios";


export const getMeasures = createAsyncThunk("GET_MEASURES", ({measures, user, device}) => {
    return axios.get(`/api/measures/all?entries=${measures}&user=${user}`).then(({data}) => console.log("SOY LA DATA: ", data))
})



const getAllMeasures = createReducer(
        false,
    {
      [getMeasures.fulfilled]: (state, action) => action.payload,
    }
  );

export default getAllMeasures;