import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/useReducer";

const store = configureStore({
  reducer: {
    user: userReducer as any,
  },
});


export default store;