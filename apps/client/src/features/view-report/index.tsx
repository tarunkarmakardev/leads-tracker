import Link from "next/link";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { ReportItem } from "@leads-tracker/schemas";
import { navigationUrls } from "@/config/urls";

interface ViewReportProps {
  item: ReportItem;
}

export default function ViewReport({ item }: ViewReportProps) {
  return (
    <Link href={navigationUrls.reports.detail(item.id)}>
      <VisibilityIcon color="info" />
    </Link>
  );
}
