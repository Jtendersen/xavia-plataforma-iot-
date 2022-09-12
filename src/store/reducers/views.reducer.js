import { createAction, createReducer } from "@reduxjs/toolkit";

export const setView = createAction("SET_VIEW");

const initialState = "profile"


const drawerViews = createReducer(initialState, {
    [setView]: (state, action) => action.payload,
});

export default drawerViews;
