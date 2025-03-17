import DashboardIcon from "@mui/icons-material/Dashboard";
import AutoAwesomeMotionIcon from "@mui/icons-material/AutoAwesomeMotion";
import TimelineIcon from "@mui/icons-material/Timeline";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";

export const BODY_HEIGHT = "calc(100dvh - 96px)";

export const chartFromValues = {
  LAST_1_WEEK: "LAST_1_WEEK",
  LAST_3_MONTHS: "LAST_3_MONTHS",
  LAST_6_MONTHS: "LAST_6_MONTHS",
  LAST_1_YEAR: "LAST_1_YEAR",
} as const;

export const localStorageKeys = {
  PROJECT_ID: "projectId",
};

export const icons = {
  dashboard: DashboardIcon,
  projects: AutoAwesomeMotionIcon,
  reports: TimelineIcon,
  edit: EditIcon,
  delete: DeleteIcon,
  view: VisibilityIcon,
};
