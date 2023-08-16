import useSWR from "swr";

import fetcher from "@/libs/fetcher";

const useUsers = () => {
  const { data, isLoading, error, mutate } = useSWR("/api/users", fetcher);

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useUsers;
