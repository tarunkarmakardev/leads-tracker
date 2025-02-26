import { Grid } from "@mui/material";

interface GridItemStatProps {
  children?: React.ReactNode;
}

export default function GridItemStat({ children }: GridItemStatProps) {
  return (
    <Grid item display="flex" gap={1} xs={12} md={4}>
      {children}
    </Grid>
  );
}
