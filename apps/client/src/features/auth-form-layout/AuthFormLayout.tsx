"use client";
import { Avatar, Box, Typography } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

type AuthFormLayoutProps = {
  title: string;
  children: React.ReactNode;
};

export default function AuthFormLayout({
  title,
  children,
}: AuthFormLayoutProps) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "min(576px, 100%)",
        mx: "auto",
        mt: 8,
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
        <AccountCircleIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        {title}
      </Typography>
      {children}
    </Box>
  );
}
