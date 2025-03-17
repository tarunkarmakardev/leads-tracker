"use client";
import DeleteReport from "@/features/delete-report";
import EditReport from "@/features/edit-report";
import Listing from "@/features/list-layout";
import ReportCard from "@/features/report-card";
import ViewReport from "@/features/view-report";
import { useGetReports } from "@/services/reports";
import { ReportsGetPayload } from "@leads-tracker/schemas";

const payload: ReportsGetPayload = {
  limit: 100,
  offset: 0,
  sortBy: "dateTime",
  sortOrder: "desc",
};
export default function Page() {
  const getQuery = useGetReports(payload);
  const { results = [] } = getQuery.data || {};

  return (
    <Listing.Body loading={getQuery.isFetching} noData={results.length === 0}>
      {results.map((item) => (
        <Listing.Card
          key={item.id}
          actions={
            <>
              <EditReport item={item} />
              <DeleteReport item={item} />
              <ViewReport item={item} />
            </>
          }
        >
          <ReportCard item={item} />
        </Listing.Card>
      ))}
    </Listing.Body>
  );
}
