"use client";
import { Tabs, Tab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ListIcon from "@mui/icons-material/List";
import { usePathname, useRouter } from "next/navigation";
import { navigationUrls } from "@/config/urls";

export default function ReportsTabs() {
  const pathName = usePathname();
  const router = useRouter();
  return (
    <Tabs value={pathName} onChange={(e, value) => router.push(value)}>
      <Tab
        icon={<ListIcon />}
        sx={{ minHeight: 48 }}
        value={navigationUrls.reports.list}
        label="List"
        iconPosition="start"
      />
      <Tab
        icon={<AddIcon />}
        sx={{ minHeight: 48 }}
        value={navigationUrls.reports.create}
        label="Create"
        iconPosition="start"
      />
    </Tabs>
  );
}
