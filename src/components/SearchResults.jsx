import { useQuery } from "@tanstack/react-query";
import useDebounce from "../hooks/useDebounce";
import * as api from "../api/api";
import { ListItem } from "./ListItem";

export const SearchResults = ({ movieQuery }) => {
  
  const searchTerm = useDebounce(movieQuery, 500);

  const {
    data: queryData,
    isInitialLoading,
    isLoading,
    isFetching,
  } = useQuery(["query-movies", searchTerm], api.queryMovies, {
    enabled: !!searchTerm,
  });

  const { data: queryTvData } = useQuery(
    ["query-tv", searchTerm],
    api.queryTv,
    {
      enabled: !!searchTerm,
    }
  );

  if (isFetching) {
    return <h2>Loading</h2>;
  }

  console.log(queryTvData);

  if (queryData && queryData.results.length === 0) {
    return <h2>Sorry, no results were found</h2>;
  }

  return (
    <>
      {queryData && <h2>Movies</h2>}

      {queryData?.results.map((item) => (
        <ListItem item={item} mediaType="movie" />
      ))}

      {queryTvData && <h2>TV Shows</h2>}

      {queryTvData?.results.map((item) => (
        <ListItem item={item} mediaType="tv" />
      ))}
    </>
  );
};
