import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import drawerOpen from "./reducers/drawerOpen.reducer";
import userReducer from "./reducers/user.reducer";
import userLoginReducer from "./reducers/login.reducer";
import usersAll from "./reducers/usersAll.reducer";
import usersTracker from "./reducers/usersTracker.reducer";

const store = configureStore({
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  reducer: {
    drawer: drawerOpen,
    user: userReducer,
    tracker: usersTracker,
    users: usersAll

  },
});

export default store;
