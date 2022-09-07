import { createAction, createReducer } from "@reduxjs/toolkit";

export const setOpen = createAction("OPEN_DRAWER");

const drawerOpen = createReducer(true, {
    [setOpen]: (state, action) => action.payload,
});

export default drawerOpen;


