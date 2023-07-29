import { Grid, GridProps, Typography } from "@mui/material";

type FormGridSectionItem = {
  id: string | number;
  component: React.ReactNode;
  gridItemProps: GridProps;
};

type FormGridSectionProps = {
  title?: string;
  items: FormGridSectionItem[];
};

export default function FormGridSection({
  title,
  items,
}: FormGridSectionProps) {
  return (
    <>
      {title && (
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
      )}
      <Grid container spacing={2} mb={2}>
        {items.map((i) => (
          <Grid key={i.id} item {...i.gridItemProps}>
            {i.component}
          </Grid>
        ))}
      </Grid>
    </>
  );
}
