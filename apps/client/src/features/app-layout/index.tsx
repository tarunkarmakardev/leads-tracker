"use client";
import { Box, Container, Stack } from "@mui/material";
import Navbar from "@/features/nav-bar/Navbar";
import TopBar from "@/features/top-bar";
import { BODY_HEIGHT } from "@/config/common";

export default function AppLayout({
  children,
}: React.PropsWithChildren<object>) {
  return (
    <>
      <TopBar />
      <Stack component="main" direction="row">
        <Navbar />
        <Box
          sx={{
            overflow: "auto",
            flex: 1,
            bgcolor: "grey.50",
            height: BODY_HEIGHT,
          }}
        >
          <Container maxWidth="xl">{children}</Container>
        </Box>
      </Stack>
    </>
  );
}
