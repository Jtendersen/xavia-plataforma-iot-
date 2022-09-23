import { createAction, createReducer } from "@reduxjs/toolkit";

export const getToMarker = createAction("SET_TOMARKER");

const mapMarker = createReducer(false, {
    [getToMarker]: (state, action) => action.payload,
});

export default mapMarker;