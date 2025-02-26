/* eslint-disable @typescript-eslint/no-explicit-any */
import { Stack, Typography } from "@mui/material";
import { AxiosError } from "axios";
import { useSnackbar } from "notistack";
import { QueryClientProvider, QueryClient } from "react-query";

const queryClient = new QueryClient();

type AxiosErrorMessageProps = {
  data: AxiosError;
};

function AxiosErrorMessage({ data }: AxiosErrorMessageProps) {
  if (!(data instanceof AxiosError)) return null;
  return (
    <Stack>
      <Typography variant="h5">Error</Typography>
      <Typography variant="subtitle2"> Code - {data.code}</Typography>
      <Typography variant="subtitle2">
        Status - {data.response?.status || 500}
      </Typography>
      <Typography variant="subtitle2">
        Message - {(data.response?.data as any)?.message || data.message}
      </Typography>
    </Stack>
  );
}

const QueryProvider = (props: React.PropsWithChildren<object>) => {
  const notification = useSnackbar();
  const handleError = (data: any) => {
    notification.enqueueSnackbar(<AxiosErrorMessage data={data} />, {
      variant: "error",
    });
  };

  queryClient.setDefaultOptions({
    mutations: {
      onError: handleError,
    },
    queries: {
      onError: handleError,
      retry: false,
      refetchOnWindowFocus: false,
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      {props.children}
    </QueryClientProvider>
  );
};

export default QueryProvider;
