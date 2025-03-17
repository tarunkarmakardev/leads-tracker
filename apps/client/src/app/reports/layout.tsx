"use client";
import { icons } from "@/config";
import { navigationUrls } from "@/config/urls";
import AppLayout from "@/features/app-layout";
import ListLayout from "@/features/list-layout";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AppLayout>
      <ListLayout
        icon={icons.reports}
        title="Reports"
        headerComponent={
          <ListLayout.Tabs
            values={{
              LIST: navigationUrls.reports.list,
              CREATE: navigationUrls.reports.create,
            }}
          />
        }
      >
        {children}
      </ListLayout>
    </AppLayout>
  );
}
