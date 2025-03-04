"use client";
import { Tabs, Tab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ListIcon from "@mui/icons-material/List";
import { usePathname, useRouter } from "next/navigation";
import { navigationUrls } from "@/config/urls";
import { useMemo } from "react";

const values = {
  LIST: navigationUrls.reports.list,
  CREATE: navigationUrls.reports.create,
};

export default function ReportsTabs() {
  const pathName = usePathname();
  const router = useRouter();
  const value = useMemo(() => {
    if (Object.values(values).includes(pathName)) return pathName;
    return false;
  }, [pathName]);

  return (
    <Tabs value={value} onChange={(e, value) => router.push(value)}>
      <Tab
        icon={<ListIcon />}
        sx={{ minHeight: 48 }}
        value={values.LIST}
        label="List"
        iconPosition="start"
      />
      <Tab
        icon={<AddIcon />}
        sx={{ minHeight: 48 }}
        value={values.CREATE}
        label="Create"
        iconPosition="start"
      />
    </Tabs>
  );
}
