"use client";

import { BrandLogo } from "@/features/top-bar/BrandLogo";
import { Container, Paper } from "@mui/material";

export default function Layout({ children }: React.PropsWithChildren<object>) {
  return (
    <>
      <Paper sx={{ p: 2 }}>
        <BrandLogo />
      </Paper>
      <Container>{children}</Container>
    </>
  );
}
