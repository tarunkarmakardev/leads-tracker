import React from "react";
import { Box, Card, CardContent, CardHeader, useTheme } from "@mui/material";

export interface ChartCardProps {
  title: string;
  children?: React.ReactNode;
}

export default function ChartCard({ title, children }: ChartCardProps) {
  const theme = useTheme();
  return (
    <Card>
      <CardHeader title={title} />
      <CardContent>
        <Box height={theme.spacing(35)} width="100%">
          {children}
        </Box>
      </CardContent>
    </Card>
  );
}
