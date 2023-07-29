import { CallStatObject } from "@/services/call-stats/api/types";
import Link from "next/link";
import VisibilityIcon from "@mui/icons-material/Visibility";

interface ViewStatProps {
  stat: CallStatObject;
}

export default function ViewStat({ stat }: ViewStatProps) {
  return (
    <Link href={`/stats/calls/${stat._id}`}>
      <VisibilityIcon color="info" />
    </Link>
  );
}
