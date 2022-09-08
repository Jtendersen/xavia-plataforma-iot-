import { createAction, createReducer } from "@reduxjs/toolkit";

export const trackerAction = createAction("TRACKER");

const usersTracker = createReducer(true, {
    [trackerAction]: (state, action) => action.payload,
});

export default usersTracker;