"use client";

import {
  Box,
  Typography,
  IconButton,
  Stack,
  SvgIconProps,
  useTheme,
  useMediaQuery,
  Drawer,
} from "@mui/material";
import Link from "next/link";
import DashboardIcon from "@mui/icons-material/Dashboard";
import TimelineIcon from "@mui/icons-material/Timeline";
import { useReduxDispatch, useReduxSelector } from "@/redux/hooks";
import { selectIsNavbarOpen, setOpen } from "./slices/navbarSlice";
import { usePathname } from "next/navigation";
import { useAuth } from "../auth-handler/hooks";

function NavContainer({ children }: React.PropsWithChildren<{}>) {
  const isNavOpen = useReduxSelector(selectIsNavbarOpen);
  const theme = useTheme();
  const isMediumScreen = useMediaQuery(theme.breakpoints.up("md"));
  const dispatch = useReduxDispatch();
  const handleMenuClose = () => {
    dispatch(setOpen(false));
  };

  const renderMenu = () => (
    <Box
      component="header"
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        py: 2,
        px: isMediumScreen ? 2 : 4,
        backgroundColor: "background.paper",
        borderRight: ({ palette }) => `1px solid ${palette.divider}`,
      }}
    >
      {children}
    </Box>
  );

  if (isMediumScreen) return renderMenu();

  return (
    <Drawer anchor="left" open={isNavOpen} onClose={handleMenuClose}>
      {renderMenu()}
    </Drawer>
  );
}

interface NavLinkProps {
  icon: React.FC<SvgIconProps>;
  text: string;
  href: string;
}

function NavLink({ href, icon: Icon, text }: NavLinkProps) {
  const isNavOpen = useReduxSelector(selectIsNavbarOpen);
  const pathName = usePathname();
  const isActive = pathName.includes(href);
  const activeColor = isActive ? "info.main" : "text.main";

  const shrunkNavItem = (
    <Link href={href}>
      <Stack gap={1} alignItems="center">
        <IconButton>
          <Icon fontSize="small" sx={{ color: activeColor }} />
        </IconButton>
        <Typography variant="caption" sx={{ color: activeColor }}>
          {text}
        </Typography>
      </Stack>
    </Link>
  );

  const expandedNavItem = (
    <Link href={href}>
      <Stack direction="row" gap={1} alignItems="center">
        <IconButton>
          <Icon sx={{ color: activeColor }} />
        </IconButton>
        <Typography sx={{ color: activeColor }}>{text}</Typography>
      </Stack>
    </Link>
  );

  if (isNavOpen) return expandedNavItem;

  return shrunkNavItem;
}

export default function Navbar() {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return null;
  return (
    <NavContainer>
      <NavLink href="/dashboard" text="Dashboard" icon={DashboardIcon} />
      <NavLink href="/stats/calls" text="Stats" icon={TimelineIcon} />
    </NavContainer>
  );
}
