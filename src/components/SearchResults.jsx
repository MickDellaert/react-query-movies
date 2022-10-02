import React from "react";
import { useQuery } from "@tanstack/react-query";
import useDebounce from "../hooks/useDebounce";
import * as api from "../api/api";

export const SearchResults = ({ movieQuery }) => {
  const searchTerm = useDebounce(movieQuery, 500);

  const {
    data: queryData,
    isInitialLoading,
  } = useQuery(["query-movies", searchTerm], api.queryMovies, {
    enabled: !!searchTerm,
  });

  if (isInitialLoading) {
    return <h2>Loading</h2>;
  }

  return (
    <>
      {queryData && <h2>SearchResults</h2>}

      {queryData?.results.map((result) => (
        <div key={result.id}>
          <h3>{result.title}</h3>

          <img src={`${api.IMG_URL}${result.poster_path}`} alt="" />
        </div>
      ))}
    </>
  );
};
