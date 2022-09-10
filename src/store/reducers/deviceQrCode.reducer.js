import { createAction, createReducer } from "@reduxjs/toolkit";

export const setQrCode = createAction("SET_QRCODE");

const deviceQrCode = createReducer(true, {
    [setQrCode]: (state, action) => action.payload,
});

export default deviceQrCode;