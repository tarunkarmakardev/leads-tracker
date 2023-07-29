import { Stack } from "@mui/material";
import StatCard from "./components/StatCard";
import NoDataCard from "../no-data-card";
import { CallStatsGetQueryResult } from "@/services/call-stats/api/types";

interface CallStatsListProps {
  getAPI: CallStatsGetQueryResult;
}

export default function CallStatsList({ getAPI }: CallStatsListProps) {
  const { results = [] } = getAPI.data || {};
  return (
    <Stack spacing={2}>
      {results.map((stat) => (
        <StatCard key={stat._id} stat={stat} />
      ))}
      {results.length === 0 && <NoDataCard />}
    </Stack>
  );
}
