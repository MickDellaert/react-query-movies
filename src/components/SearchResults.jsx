import { useQuery } from "@tanstack/react-query";
import useDebounce from "../hooks/useDebounce";
import * as api from "../api/api";
import { ListItem } from "./ListItem";

export const SearchResults = ({ movieQuery }) => {
  const searchTerm = useDebounce(movieQuery, 500);

  const { data: queryData, isFetching } = useQuery(
    ["query-movies", searchTerm],
    api.queryMovies,
    {
      enabled: !!searchTerm,
    }
  );

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

  if (queryData && queryData.results.length === 0) {
    return <h2>Sorry, no results were found</h2>;
  }

  return (
    <>
      <div className="search-results">
        <div className="search-results-movies">
            {queryData && <h2>Movies</h2>}
            <div className="search-results-movies-wrapper">


            {queryData?.results.map((item) => (
              <div className="search-results-item">
                <ListItem
                  key={item.id}
                  item={item}
                  mediaType="movie"
                  searched={movieQuery}
                />
              </div>
            ))}
          </div>
        </div>
        {/* 
        {queryTvData && <h2>TV Shows</h2>}

        {queryTvData?.results.map((item) => (
          <ListItem key={item.id} item={item} mediaType="tv" />
        ))} */}
      </div>
    </>
  );
};
