"use client";
import { Box, Container, Stack } from "@mui/material";
import Navbar from "@/features/nav-bar/Navbar";
import Providers from "./providers";
import TopBar from "@/features/top-bar";
import { BODY_HEIGHT } from "@/config/common";

export default function LayoutContainer({
  children,
}: React.PropsWithChildren<{}>) {
  return (
    <Providers>
      <TopBar />
      <Stack component="main" direction="row" sx={{ height: BODY_HEIGHT }}>
        <Navbar />
        <Box sx={{ overflow: "auto", flex: 1, bgcolor: "grey.50" }}>
          <Container sx={{ height: BODY_HEIGHT }}>{children}</Container>
        </Box>
      </Stack>
    </Providers>
  );
}
