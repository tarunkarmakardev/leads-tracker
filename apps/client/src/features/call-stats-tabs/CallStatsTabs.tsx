"use client";

import { Tabs, Tab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ListIcon from "@mui/icons-material/List";
import { usePathname, useRouter } from "next/navigation";

export default function CallStatsTabs() {
  const pathName = usePathname();
  const router = useRouter();
  return (
    <Tabs value={pathName} onChange={(e, value) => router.push(value)}>
      <Tab
        icon={<ListIcon />}
        value="/stats/calls"
        label="List"
        iconPosition="start"
        sx={{ minHeight: "56px" }}
      />
      <Tab
        icon={<AddIcon />}
        value="/stats/calls/create"
        label="Create"
        iconPosition="start"
        sx={{ minHeight: "56px" }}
      />
    </Tabs>
  );
}
