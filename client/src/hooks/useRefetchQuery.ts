import { useQueryClient } from "react-query";

const useRefetchQuery = (QUERY_KEY: string) => {
  const qc = useQueryClient();
  return (queryKeys: any[] = []) =>
    qc.invalidateQueries([QUERY_KEY, ...queryKeys]);
};

export default useRefetchQuery;
