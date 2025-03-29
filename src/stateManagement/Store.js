import { configureStore } from "@reduxjs/toolkit";
import { counterslice } from "./slice";
const store = configureStore({
  reducer: counterslice.reducer,
});

export default store;
