import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import drawerOpen from "./reducers/drawerOpen.reducer";
import userReducer from "./reducers/user.reducer";

const store = configureStore({
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  reducer: {
    drawer: drawerOpen,
    user: userReducer,
  },
});

export default store;
