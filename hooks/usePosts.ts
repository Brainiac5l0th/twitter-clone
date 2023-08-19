import useSWR from "swr";

import fetcher from "@/libs/fetcher";

const usePosts = (userid?: string) => {
  const url = userid ? `/api/posts?userid=${userid}` : "/api/posts";

  const { data, isLoading, error, mutate } = useSWR(url, fetcher);

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default usePosts;
