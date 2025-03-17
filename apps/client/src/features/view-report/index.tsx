import Link from "next/link";
import { icons } from "@/config";
import { ReportItem } from "@leads-tracker/schemas";
import { navigationUrls } from "@/config/urls";

interface ViewReportProps {
  item: ReportItem;
}

export default function ViewReport({ item }: ViewReportProps) {
  return (
    <Link href={navigationUrls.reports.detail(item.id)}>
      <icons.view color="info" />
    </Link>
  );
}
