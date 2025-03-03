"use client";
import ReportsList from "@/features/reports-list";
import Spinner from "@/features/spinner";
import { useGetReports } from "@/services/reports";

const payload = {
  limit: 100,
  offset: 0,
};
export default function Page() {
  const getQuery = useGetReports(payload);
  const { results = [] } = getQuery.data || {};
  return (
    <Spinner
      loading={getQuery.isFetching}
      loaderProps={{
        sx: { my: 12 },
      }}
    >
      <ReportsList items={results} />
    </Spinner>
  );
}
