import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import drawerOpen from "./reducers/drawerOpen.reducer";
import hideColumns from "./reducers/hide.reducer";
import userReducer from "./reducers/user.reducer";
import usersAll from "./reducers/usersAll.reducer";
import usersTracker from "./reducers/usersTracker.reducer";
import drawerViews from "./reducers/views.reducer";

const store = configureStore({
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
    reducer: {
        drawer: drawerOpen,
        views: drawerViews,
        user: userReducer,
        tracker: usersTracker,
        users: usersAll,
        hide: hideColumns,
    },
});

export default store;
