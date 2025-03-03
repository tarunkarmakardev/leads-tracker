"use client";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Paper,
  IconButton,
  Stack,
  Autocomplete,
  TextField,
} from "@mui/material";
import { BrandLogo } from "./BrandLogo";
import { Profile } from "./Profile";
import SignIn from "../auth-handler/components/sign-in";
import ClientOnly from "../client-only";
import { useGlobalStore } from "../global-store/context";
import { useLocalStorageState } from "ahooks";
import { useQueryClient } from "@tanstack/react-query";
import { ProjectItem } from "@leads-tracker/schemas";
import { localStorageKeys } from "@/config/common";
import { useMemo } from "react";
import { useGetProjects } from "@/services/projects";

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
            <SelectProject />
            <Profile />
            <SignIn />
          </Stack>
        </Stack>
      </Paper>
    </ClientOnly>
  );
}

function SelectProject() {
  const queryClient = useQueryClient();
  const [storage, onChange] = useLocalStorageState<{ projectId: string }>(
    localStorageKeys.PROJECT_ID,
    {
      defaultValue: { projectId: "" },
    }
  );
  const payload = {
    limit: 100,
    offset: 0,
  };
  const getQuery = useGetProjects(payload);
  const { results = [] } = getQuery.data || {};
  const value = useMemo(() => {
    return results.find((project) => project.id === storage?.projectId) || null;
  }, [results, storage]);
  return (
    <Autocomplete
      disableClearable
      value={value as ProjectItem}
      getOptionLabel={(option) => option.name}
      onChange={(e, item) => {
        onChange({ projectId: item?.id });
        queryClient.refetchQueries();
      }}
      options={results}
      sx={{ width: 180 }}
      renderInput={(params) => (
        <TextField {...params} placeholder="Select Project" />
      )}
    />
  );
}
