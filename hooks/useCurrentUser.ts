import useSWR from "swr";

import fetcher from "@/libs/fetcher";

const useCurrentUser = () => {
  const { data, isLoading, error, mutate } = useSWR("/api/current", fetcher);

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useCurrentUser;
