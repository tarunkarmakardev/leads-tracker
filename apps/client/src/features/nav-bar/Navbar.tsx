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
import { usePathname } from "next/navigation";
import { useGlobalStore } from "../global-store/context";
import { navigationUrls } from "@/config/urls";

function NavContainer({ children }: React.PropsWithChildren) {
  const isNavOpen = useGlobalStore((s) => s.navbarOpen);
  const setNavbarOpen = useGlobalStore((s) => s.setNavbarOpen);
  const theme = useTheme();
  const isMediumScreen = useMediaQuery(theme.breakpoints.up("md"));
  const handleMenuClose = () => {
    setNavbarOpen(false);
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
  const isNavOpen = useGlobalStore((s) => s.navbarOpen);
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
  return (
    <NavContainer>
      <NavLink
        href={navigationUrls.dashboard}
        text="Dashboard"
        icon={DashboardIcon}
      />
      <NavLink
        href={navigationUrls.reports.list}
        text="Reports"
        icon={TimelineIcon}
      />
    </NavContainer>
  );
}
