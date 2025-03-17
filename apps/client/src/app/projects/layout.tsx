"use client";
import { icons } from "@/config";
import { navigationUrls } from "@/config/urls";
import AppLayout from "@/features/app-layout";
import ListLayout from "@/features/list-layout";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AppLayout>
      <ListLayout
        icon={icons.projects}
        title="Projects"
        headerComponent={
          <ListLayout.Tabs
            values={{
              LIST: navigationUrls.projects.list,
              CREATE: navigationUrls.projects.create,
            }}
          />
        }
      >
        {children}
      </ListLayout>
    </AppLayout>
  );
}
