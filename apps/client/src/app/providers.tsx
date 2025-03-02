"use client";
import { CssBaseline } from "@mui/material";
import { SnackbarProvider } from "notistack";
import QueryProvider from "@/features/query-client/context/QueryProvider";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { GlobalStoreProvider } from "@/features/global-store/context";

export default function Providers({ children }: React.PropsWithChildren) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <CssBaseline />
      <GlobalStoreProvider>
        <QueryProvider>
          <SnackbarProvider maxSnack={3}>{children}</SnackbarProvider>
        </QueryProvider>
      </GlobalStoreProvider>
    </LocalizationProvider>
  );
}
