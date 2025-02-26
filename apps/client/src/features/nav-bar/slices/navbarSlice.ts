import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { ReduxState } from "@/redux/store";

export interface NavbarState {
  isOpen: boolean;
}

const initialState: NavbarState = {
  isOpen: false,
};

export const navbarSlice = createSlice({
  name: "navbarSlice",
  initialState,
  reducers: {
    setOpen(state, action: PayloadAction<boolean>) {
      state.isOpen = action.payload;
    },
    toggleOpen(state) {
      state.isOpen = !state.isOpen;
    },
  },
});

export const { setOpen, toggleOpen } = navbarSlice.actions;

export const selectIsNavbarOpen = (state: ReduxState) => state.navbar.isOpen;

export default navbarSlice.reducer;
