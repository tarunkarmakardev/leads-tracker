import React from "react";
import { Paper } from "@mui/material";
import { useAuth } from "../auth-handler/hooks";
import ClientOnly from "../client-only";
import ErrorText from "../error-text/ErrorText";

function NoPermission() {
  return (
    <Paper elevation={3} sx={{ height: "calc(100vh - 68.5px - 64px)", my: 4 }}>
      <ErrorText
        text="You don't have permission to view this page."
        stackProps={{ height: "100%" }}
      />
    </Paper>
  );
}

export default function ProtectedOnly({
  children,
}: React.PropsWithChildren<{}>) {
  const { isAuthenticated } = useAuth();
  const renderContent = () => {
    if (isAuthenticated) return children;
    return <NoPermission />;
  };
  return <ClientOnly>{renderContent()}</ClientOnly>;
}
