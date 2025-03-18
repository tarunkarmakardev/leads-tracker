import { SvgIconComponent } from "@mui/icons-material";
import { Avatar, Box, Stack, Typography } from "@mui/material";
import React from "react";

export interface AppBodyLayoutProps {
  title: string;
  icon: SvgIconComponent;
  children?: React.ReactNode;
  headerComponent?: React.ReactNode;
}

export default function AppBodyLayout({
  title,
  children,
  headerComponent,
  icon: Icon,
}: AppBodyLayoutProps) {
  return (
    <>
      <Stack
        sx={{ borderBottom: 1, borderColor: "divider" }}
        direction="row"
        gap={2}
        my={2}
        justifyContent="space-between"
        alignItems="center"
      >
        <Stack direction="row" gap={2} alignItems="center">
          <Avatar
            sx={{
              m: 0.5,
              bgcolor: "secondary.main",
              width: 24,
              height: 24,
            }}
          >
            <Icon sx={{ width: 16, height: 16 }} />
          </Avatar>
          <Typography component="h1" variant="h6">
            {title}
          </Typography>
        </Stack>
        {headerComponent}
      </Stack>
      <Box sx={{ pb: 2 }}>{children}</Box>
    </>
  );
}
