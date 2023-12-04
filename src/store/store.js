import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import mapSlice from "./slices/mapSlice";
import userSlice from "./slices/userSlice";

export default configureStore({
  reducer: combineReducers({
    mapSlice: mapSlice.reducer,
    userSlice: userSlice.reducer,
  }),
});
