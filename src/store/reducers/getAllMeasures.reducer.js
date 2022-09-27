import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import axios from "axios";


export const getMeasures = createAsyncThunk("GET_MEASURES", ({measures, loggedUser}) => {
    return axios.get(`/api/measures/all?entries=${measures}&user=${loggedUser}`).then(({data}) => data)
})



const getAllMeasures = createReducer(
        false,
    {
      [getMeasures.fulfilled]: (state, action) => action.payload,
    }
  );

export default getAllMeasures;