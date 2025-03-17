"use client";
import { icons } from "@/config";
import { navigationUrls } from "@/config/urls";
import AppLayout from "@/features/app-layout";
import Listing from "@/features/list-layout";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AppLayout>
      <Listing
        icon={icons.projects}
        title="Projects"
        headerComponent={
          <Listing.Tabs
            values={{
              LIST: navigationUrls.projects.list,
              CREATE: navigationUrls.projects.create,
            }}
          />
        }
      >
        {children}
      </Listing>
    </AppLayout>
  );
}
