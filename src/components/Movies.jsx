import { useQuery } from "@tanstack/react-query";

import { SearchContainer } from "./SearchContainer";
import { ListItem } from "./ListItem";

import * as api from "../api/api";

export const Movies = () => {
  const { isLoading: popularLoading, data: popularData } = useQuery(
    ["popular-movies"],
    api.getPopular
  );
  const { isLoading: trendingLoading, data: trendingData } = useQuery(
    ["trending-movies"],
    api.getTrending
  );

  if (popularLoading || trendingLoading) {
    return <h2>"Loading"</h2>;
  }

  return (
    <>
      <SearchContainer />

      <h2>Popular Movies</h2>
      {popularData?.results.map((item) => (
        <ListItem item={item} mediaType="movie" />
      ))}

      <h2>Trending TV shows or movies</h2>
      {trendingData?.results.map((item) => (
        <ListItem item={item} mediaType={item.media_type} />
      ))}
    </>
  );
};
