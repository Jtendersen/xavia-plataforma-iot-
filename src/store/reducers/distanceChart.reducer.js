import { createAction, createReducer } from "@reduxjs/toolkit";

export const setChart = createAction("SET_CHART");

const initialState = false


const distanceChart = createReducer(initialState, {
    [setChart]: (state, action) => action.payload,
});

export default distanceChart;