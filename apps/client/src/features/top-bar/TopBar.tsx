"use client";
import MenuIcon from "@mui/icons-material/Menu";
import { Paper, IconButton, Stack } from "@mui/material";
import { BrandLogo } from "./BrandLogo";
import { Profile } from "./Profile";
import SignIn from "../auth-handler/components/sign-in";
import ClientOnly from "../client-only";
import { useGlobalStore } from "../global-store/context";

export default function TopBar() {
  const toggleOpen = useGlobalStore((s) => s.toggleNavbarOpen);

  const handleMenuClick = () => {
    toggleOpen();
  };

  return (
    <ClientOnly>
      <Paper sx={{ p: 2, position: "relative", zIndex: 2 }}>
        <Stack direction="row" gap={2} alignItems="center">
          <IconButton onClick={handleMenuClick} sx={{ alignSelf: "center" }}>
            <MenuIcon />
          </IconButton>
          <BrandLogo />
          <Stack direction="row" gap={2} alignItems="center" ml="auto">
            <Profile />
            <SignIn />
          </Stack>
        </Stack>
      </Paper>
    </ClientOnly>
  );
}
