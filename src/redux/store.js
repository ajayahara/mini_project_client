import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice.js";
import bookReducer from "./book/bookSlice.js";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    books: bookReducer,
  },
});
