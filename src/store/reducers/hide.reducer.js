import { createAction, createReducer } from "@reduxjs/toolkit";

export const setHide = createAction("SET_Hide");

let initialState;

// setea el initialState para evaluar el tamaño de la pantalla
// hide y tableSize permiten ajustar valores de la tabla Users
function getWindowSize() {
    const { innerWidth } = window;
    return innerWidth;
}
if (getWindowSize() < 600) {
    initialState = {
        hide: true,
        tableSize: 4
    }
} else {
    initialState = {
        hide: false,
        tableSize: 9
    }
}

const hideColumns = createReducer(initialState, {
    [setHide]: (state, action) => action.payload,
});

export default hideColumns;
