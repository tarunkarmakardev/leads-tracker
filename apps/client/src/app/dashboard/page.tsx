import { icons } from "@/config";
import AppBodyLayout from "@/features/app-body-layout";
import CallStatsChart from "@/features/call-stats-chart";

export default function Dashboard() {
  return (
    <AppBodyLayout icon={icons.dashboard} title="Dashboard">
      <CallStatsChart />
    </AppBodyLayout>
  );
}
