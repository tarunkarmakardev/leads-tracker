"use client";

import { Tabs, Tab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ListIcon from "@mui/icons-material/List";
import { usePathname, useRouter } from "next/navigation";

export default function ReportsTabs() {
  const pathName = usePathname();
  const router = useRouter();
  return (
    <Tabs value={pathName} onChange={(e, value) => router.push(value)}>
      <Tab
        icon={<ListIcon />}
        value="/reports/list"
        label="List"
        iconPosition="start"
        sx={{ minHeight: "56px" }}
      />
      <Tab
        icon={<AddIcon />}
        value="/reports/create"
        label="Create"
        iconPosition="start"
        sx={{ minHeight: "56px" }}
      />
    </Tabs>
  );
}
