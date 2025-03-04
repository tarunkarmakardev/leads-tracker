"use client";
import ReportDetail from "@/features/report-detail";
import Spinner from "@/features/spinner";
import { useDetailReport } from "@/services/reports";
import { useParams } from "next/navigation";

export default function Page() {
  const params = useParams();
  const detailQuery = useDetailReport(params.id as string);
  const reportItem = detailQuery.data;
  return (
    <Spinner loading={detailQuery.isFetching}>
      {reportItem && <ReportDetail item={reportItem} />}
    </Spinner>
  );
}
