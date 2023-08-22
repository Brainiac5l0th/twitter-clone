import useSWR from "swr";

import fetcher from "@/libs/fetcher";

const useNotifications = async (userId?: string) => {
  const url = userId ? `/api/notifications/${userId}` : null;

  const { data, mutate, isLoading, error } = useSWR(url, fetcher);

  return { data, mutate, isLoading, error };
};
