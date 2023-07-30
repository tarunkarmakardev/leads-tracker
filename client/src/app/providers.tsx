/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";

import { store } from "@/redux/store";
import { CssBaseline } from "@mui/material";
import { SnackbarProvider } from "notistack";
import QueryProvider from "@/features/query-client/context/QueryProvider";
import { Provider as ReduxProvider } from "react-redux";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export default function Providers({ children }: React.PropsWithChildren<{}>) {
  return (
    <ReduxProvider store={store}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <CssBaseline />
        {/* @ts-ignore */}
        <SnackbarProvider maxSnack={3}>
          <QueryProvider>{children}</QueryProvider>
        </SnackbarProvider>
      </LocalizationProvider>
    </ReduxProvider>
  );
}
