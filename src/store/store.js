import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import mapSlice from "./slices/mapSlice";

export default configureStore({
  reducer: combineReducers({ mapSlice: mapSlice.reducer }),
});
