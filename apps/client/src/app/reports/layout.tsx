import AppLayout from "@/features/app-layout";
import ReportsLayout from "@/features/reports-layout";
import ReportsTabs from "@/features/reports-tabs";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AppLayout>
      <ReportsLayout title="Reports" headerComponent={<ReportsTabs />}>
        {children}
      </ReportsLayout>
    </AppLayout>
  );
}
