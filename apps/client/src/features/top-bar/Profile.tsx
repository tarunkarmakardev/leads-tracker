import { useState } from "react";
import {
  Avatar,
  Box,
  Menu,
  MenuItem,
  MenuList,
  ListItemIcon,
  Typography,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import PowerSettingsIcon from "@mui/icons-material/PowerSettingsNew";
import Link from "next/link";
import { useAuth } from "../auth-handler/hooks";

export function Profile() {
  const { signOut, isAuthenticated } = useAuth();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleOpen = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = () => {
    handleClose();
    signOut();
  };
  if (!isAuthenticated) return null;

  return (
    <Box px={2}>
      <Avatar
        sx={{ cursor: "pointer" }}
        onClick={handleOpen}
        src="https://api.dicebear.com/6.x/avataaars-neutral/svg?seed=Oreo"
      />
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuList>
          <MenuItem>
            <ListItemIcon>
              <PersonIcon fontSize="small" />
            </ListItemIcon>
            <Link href="/my-account">
              <Typography variant="body2" color="text.secondary">
                My account
              </Typography>
            </Link>
          </MenuItem>
          <MenuItem onClick={handleSignOut}>
            <ListItemIcon>
              <PowerSettingsIcon fontSize="small" />
            </ListItemIcon>
            <Typography variant="body2" color="text.secondary">
              Logout
            </Typography>
          </MenuItem>
        </MenuList>
      </Menu>
    </Box>
  );
}
