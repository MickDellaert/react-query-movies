import * as api from "../api/api";

import { useQuery, useQueries } from "@tanstack/react-query";

const useManyQueries = (fetcherFn, multiFetcherKey, type, itemNumber) =>{

  // const multifetcher = "multifetcher"


  const { data } = useQuery(
    ["dynamic-query"],
    fetcherFn,
    {
      select: (data) => {
        const slicedData = data.results.slice(0, itemNumber);
        return slicedData;
      },
    }
  );

  const userQueries = useQueries({
    queries: data?.map((item) => {
      return {
        queryKey: [multiFetcherKey, item.id, item.media_type || type],
        queryFn: () => api.getDetails(item.id, item.media_type || type ),
        // enabled: !!trendingData,
        // select: (data) => data.data.map((item, key) => ({key, ...item}))
      };
    }) ?? [],
  });

  const userQueriesIndexed = userQueries.map((item, key) => ({ key, ...item }));

  return {userQueriesIndexed, data, userQueries}

}

export default useManyQueries