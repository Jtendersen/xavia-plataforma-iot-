import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import drawerOpen from "./reducers/drawerOpen.reducer";
import userLoginReducer from "./reducers/login.reducer";

const store = configureStore({
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  reducer: {
    drawer: drawerOpen,
    user: userLoginReducer,
  },
});

export default store;
