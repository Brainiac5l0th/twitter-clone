import useSWR from "swr";

import fetcher from "@/libs/fetcher";

const useNotifications = (userId?: string) => {
  const url = userId ? `/api/notifications/${userId}` : null;

  const { data, mutate, isLoading, error } = useSWR(url, fetcher);

  return { data, mutate, isLoading, error };
};

export default useNotifications;
