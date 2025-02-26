import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { ReduxState } from "@/redux/store";
import { authStorageInstance } from "../config";
import { UserObject } from "@/services/auth/common.types";

export interface AuthState {
  token: string;
  user: UserObject;
}

const initialState: AuthState = authStorageInstance.getItem();

export const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    setToken(state, action: PayloadAction<string>) {
      const newState = { ...state, token: action.payload };
      authStorageInstance.setItem(newState);
      return newState;
    },
    setUser(state, action: PayloadAction<AuthState["user"]>) {
      const newState = { ...state, user: action.payload };
      authStorageInstance.setItem(newState);
      return newState;
    },
  },
});

export const { setToken, setUser } = authSlice.actions;

export const selectToken = (state: ReduxState) => state.auth.token;

export default authSlice.reducer;
