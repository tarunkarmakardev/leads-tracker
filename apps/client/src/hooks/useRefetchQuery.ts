import { useQueryClient } from "@tanstack/react-query";

const useRefetchQuery = (QUERY_KEY: string) => {
  const qc = useQueryClient();
  return (queryKeys: unknown[] = []) =>
    qc.invalidateQueries({
      queryKey: [QUERY_KEY, ...queryKeys],
    });
};

export default useRefetchQuery;
