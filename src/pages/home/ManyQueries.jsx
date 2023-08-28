import React from "react";
import * as api from "../../api/api";
import useManyQueries from "../../hooks/useManyQueries";

export const ManyQueries = () => {
  const { userQueriesIndexed, userQueries } = useManyQueries(api.getTrending, "trending-movie-fetcher", "", 10);

  if (userQueries.some((query) => query.isLoading)) {
    return <h2>"Loading"</h2>;
  }

  return (
    <>
      <div>Many Details - trending</div>
      <div>
        {userQueriesIndexed.map((many) => (
          <div key={many.data.id}>
            <h3>{many.data.title}</h3>
            <h3>{many.data.name}</h3>
          </div>
        ))}
      </div>
    </>
  );
};
