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

  const { isLoading: configLoading, data: configData } = useQuery(
    ["config"],
    api.getConfig
  );

  if (popularLoading || trendingLoading) {
    return <h2>"Loading"</h2>;
  }
  // console.log(configData);

  // console.log(trendingData);

  return (
    <>
      <SearchContainer />

      <h2>Trending TV shows or movies</h2>
      {trendingData?.results.map((item) => (
        <ListItem key={item.id} item={item} mediaType={item.media_type} />
      ))}

      <h2>Popular Movies</h2>
      {popularData?.results.map((item) => (
        <ListItem key={item.id} item={item} mediaType="movie" />
        
      ))}
    </>
  );
};
