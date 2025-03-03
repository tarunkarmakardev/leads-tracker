import { Stack } from "@mui/material";
import StatCard from "./components/StatCard";
import NoDataCard from "../no-data-card";
import { ReportItem } from "@leads-tracker/schemas";

interface ReportsListProps {
  items: ReportItem[];
}

export default function ReportsList({ items }: ReportsListProps) {
  return (
    <Stack spacing={2}>
      {items.map((stat) => (
        <StatCard key={stat.id} item={stat} />
      ))}
      {items.length === 0 && <NoDataCard />}
    </Stack>
  );
}
