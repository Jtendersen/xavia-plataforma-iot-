import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import axios from "axios";


export const getMeasures = createAsyncThunk("GET_MEASURES", ({entries, user, device}) => {
  console.log('me piden: ', entries, user, device)
    return axios.get(`/api/measures/all?entries=${entries}&user=${user}&device=${device}`).then(({data}) => data)
})


const getAllMeasures = createReducer(
        false,
    {
      [getMeasures.fulfilled]: (state, action) => action.payload,
    }
  );

export default getAllMeasures;