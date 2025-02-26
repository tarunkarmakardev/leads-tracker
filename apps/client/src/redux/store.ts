import { configureStore } from "@reduxjs/toolkit";
import auth from "@/features/auth-handler/slices/authSlice";
import navbar from "@/features/nav-bar/slices/navbarSlice";

export const store = configureStore({
  reducer: {
    auth,
    navbar,
  },
});

export type ReduxState = ReturnType<typeof store.getState>;
export type ReduxDispatch = typeof store.dispatch;
