import { useQueryClient } from "react-query";

const useRefetchQuery = (QUERY_KEY: string) => {
  const qc = useQueryClient();
  return (queryKeys: unknown[] = []) =>
    qc.invalidateQueries([QUERY_KEY, ...queryKeys]);
};

export default useRefetchQuery;
