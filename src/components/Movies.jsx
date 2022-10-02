import { useQuery } from "@tanstack/react-query";

import { SearchContainer } from "./SearchContainer";

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
      {popularData?.results.map((popular) => (
        <div key={popular.id}>
          <h3>{popular.title}</h3>
          <img src={`${api.IMG_URL}${popular.poster_path}`} alt="" />
        </div>
      ))}

      <h2>Trending Movies</h2>
      {trendingData?.results.map((trending) => (
        <div key={trending.id}>
          <h3>{trending.title}</h3>

          <img src={`${api.IMG_URL}${trending.poster_path}`} alt="" />
        </div>
      ))}
    </>
  );
};
