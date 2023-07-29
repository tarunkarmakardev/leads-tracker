"use client";

import CallStatDetail from "@/features/call-stat-detail";
import CallStatsLayout from "@/features/call-stats-layout";
import { useDetailCallStat } from "@/services/call-stats/hooks";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Button } from "@mui/material";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function CallStatDetailPage() {
  const params = useParams();
  const detailAPI = useDetailCallStat({
    _id: params._id,
  });

  return (
    <CallStatsLayout
      title="Call Stats List"
      headerComponent={
        <>
          <Link href="/stats/calls">
            <Button startIcon={<ArrowBackIosIcon />}>Go Back</Button>
          </Link>
        </>
      }
      loading={detailAPI.isFetching}
    >
      <CallStatDetail detailAPI={detailAPI} />
    </CallStatsLayout>
  );
}
