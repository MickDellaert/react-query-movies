import * as api from "../api/api";

import { useQuery, useQueries } from "@tanstack/react-query";

const useManyQueries = (fetcher, type, itemNumber) =>{


  const { isLoading: trendingLoading, data: trendingData } = useQuery(
    ["bla-movies"],
    fetcher,
    {
      select: (data) => {
        const slicedData = data.results.slice(0, itemNumber);
        return slicedData;
      },
    }
  );

  const userQueries = useQueries({
    queries: trendingData?.map((item) => {
      return {
        queryKey: ["getTestDetails", item.id, item.media_type || type],
        queryFn: () => api.getDetails(item.id, item.media_type || type ),
        // enabled: !!trendingData,
        // select: (data) => data.data.map((item, key) => ({key, ...item}))
      };
    }) ?? [],
  });

  const userQueriesIndexed = userQueries.map((item, key) => ({ key, ...item }));

  return {userQueriesIndexed, trendingData, userQueries}

}

export default useManyQueries