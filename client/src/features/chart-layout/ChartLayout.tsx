import React from "react";
import { Box, Paper, Typography, useTheme } from "@mui/material";

export interface ChartLayoutProps {
  title: string;
  children?: React.ReactNode;
}

export default function ChartLayout({ title, children }: ChartLayoutProps) {
  const theme = useTheme();
  return (
    <Paper sx={{ p: 4 }} elevation={3}>
      <Typography variant="h5" component="div" mb={2}>
        {title}
      </Typography>
      <Box height={theme.spacing(35)} width="100%">
        {children}
      </Box>
    </Paper>
  );
}
