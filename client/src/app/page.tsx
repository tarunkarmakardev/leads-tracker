"use client";
import * as React from "react";
import { Typography, Box, Avatar } from "@mui/material";
import TimelineIcon from "@mui/icons-material/Timeline";

export default function Home() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: "secondary.main", height: 80, width: 80 }}>
        <TimelineIcon sx={{ fontSize: 64 }} />
      </Avatar>
      <Typography variant="h1" textAlign="center">
        Welcome to Leads Tracker
      </Typography>
    </Box>
  );
}
