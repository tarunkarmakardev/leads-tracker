"use client";
import { useMemo } from "react";
import {
  Tabs,
  Tab,
  Card,
  CardContent,
  Grid2 as Grid,
  CardActions,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { icons } from "@/config";
import AddIcon from "@mui/icons-material/Add";
import ListIcon from "@mui/icons-material/List";
import { usePathname, useRouter } from "next/navigation";
import { Avatar, Box, Stack, Typography } from "@mui/material";
import { SvgIconComponent } from "@mui/icons-material";
import NoDataCard from "../no-data-card";
import Spinner from "../spinner";
import LoadingButton from "../loading-button";

interface ListLayoutProps {
  title: string;
  icon: SvgIconComponent;
  children?: React.ReactNode;
  headerComponent?: React.ReactNode;
}

export default function ListLayout({
  title,
  children,
  headerComponent,
  icon: Icon,
}: ListLayoutProps) {
  return (
    <>
      <Stack
        sx={{ borderBottom: 1, borderColor: "divider" }}
        direction="row"
        gap={2}
        my={1}
        justifyContent="space-between"
        alignItems="center"
      >
        <Stack direction="row" gap={2} alignItems="center">
          <Avatar
            sx={{
              m: 0.5,
              bgcolor: "secondary.main",
              width: 24,
              height: 24,
            }}
          >
            <Icon sx={{ width: 16, height: 16 }} />
          </Avatar>
          <Typography component="h1" variant="h6">
            {title}
          </Typography>
        </Stack>
        {headerComponent}
      </Stack>
      <Box>{children}</Box>
    </>
  );
}
ListLayout.Tabs = ListTabs;
ListLayout.Body = ListBody;
ListLayout.Card = ListCard;
ListLayout.EditButton = ListEditButton;
ListLayout.EditDialogActions = ListEditActions;
ListLayout.DeleteButton = ListDeleteButton;

type ListTabsProps = {
  values: {
    LIST: string;
    CREATE: string;
  };
};

function ListTabs({ values }: ListTabsProps) {
  const pathName = usePathname();
  const router = useRouter();
  const value = useMemo(() => {
    if (Object.values(values).includes(pathName)) return pathName;
    return false;
  }, [pathName, values]);

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

function ListBody({
  children,
  noData,
  loading,
}: {
  children: React.ReactNode;
  noData?: boolean;
  loading?: boolean;
}) {
  const renderContent = () => {
    if (noData) return <NoDataCard />;
    return <Stack gap={2}>{children}</Stack>;
  };

  return (
    <Spinner
      loading={loading}
      loaderProps={{
        sx: { my: 12 },
      }}
    >
      {renderContent()}
    </Spinner>
  );
}

type ListCardProps = {
  actions: React.ReactNode;
  children: React.ReactNode;
};

function ListCard({ actions, children }: ListCardProps) {
  return (
    <Card>
      <CardContent>
        <Grid container alignItems="center">
          <Grid size={10}>{children}</Grid>
          <Grid size={2}>
            <CardActions>
              <Stack direction="row" gap={1}>
                {actions}
              </Stack>
            </CardActions>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

type ListEditButtonProps = {
  title?: string;
  children: React.ReactNode;
  open: boolean;
  onClose: () => void;
  onOpen: () => void;
};

function ListEditButton({
  title,
  children,
  open,
  onClose,
  onOpen,
}: ListEditButtonProps) {
  return (
    <>
      <icons.edit color="info" onClick={onOpen} sx={{ cursor: "pointer" }} />
      <Dialog fullWidth maxWidth="md" open={open} onClose={onClose}>
        <DialogTitle>{title ? title : "Edit"}</DialogTitle>
        <DialogContent>{children}</DialogContent>
      </Dialog>
    </>
  );
}

type ListEditActionsProps = {
  onCancel: () => void;
  loading: boolean;
  disabled: boolean;
};

function ListEditActions({
  disabled,
  loading,
  onCancel,
}: ListEditActionsProps) {
  return (
    <DialogActions>
      <Button onClick={onCancel}>Cancel</Button>
      <LoadingButton
        type="submit"
        loading={loading}
        disabled={disabled}
        variant="contained"
      >
        Update
      </LoadingButton>
    </DialogActions>
  );
}

type ListDeleteButtonProps = {
  open: boolean;
  onClose: () => void;
  onOpen: () => void;
  onConfirm: () => void;
  itemName?: string;
  loading: boolean;
};

function ListDeleteButton({
  open,
  onClose,
  onOpen,
  loading,
  onConfirm,
  itemName = "item",
}: ListDeleteButtonProps) {
  return (
    <>
      <icons.delete sx={{ cursor: "pointer" }} color="info" onClick={onOpen} />
      <Dialog fullWidth maxWidth="md" open={open} onClose={onClose}>
        <DialogTitle>Delete {itemName}</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete {itemName}?</Typography>
          <DialogActions>
            <Button onClick={onClose}>Cancel</Button>
            <LoadingButton
              loading={loading}
              variant="contained"
              color="error"
              onClick={onConfirm}
            >
              Delete
            </LoadingButton>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </>
  );
}
