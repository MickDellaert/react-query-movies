import { useQuery } from "@tanstack/react-query";
import useDebounce from "../hooks/useDebounce";
import * as api from "../api/api";

import { ListItem } from "./ListItem";
import { TvListItem } from "./TvListItem";

export const SearchResults = ({ movieQuery, type, setType }) => {
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
        <ListItem item={item} type={type} setType={setType}/>
      ))}

      {queryTvData && <h2>Tv</h2>}

      {queryTvData?.results.map((item) => (
        <TvListItem item={item} type={type} setType={setType}/>
      ))}
    </>
  );
};
