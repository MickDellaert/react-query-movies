import { useQuery } from "@tanstack/react-query";

import { ListItem } from "../../components/ListItem";
import { TrendingItem } from "./TrendingItem";
// import { ManyQueries } from "./ManyQueries";

import * as api from "../../api/api";

export const Trending = () => {
  const { isLoading: trendingLoading, data: trendingData } = useQuery(
    ["trending-movies"],
    api.getTrending
  );
  if (trendingLoading) {
    return <h2>"Loading"</h2>;
  }



  // console.log(trendingData)

  return (
    <>
      {/* <ManyQueries trendingData={trendingData}/> */}
      <h2>Trending TV shows or movies</h2>

      <TrendingItem trendingData={trendingData}  />

      {trendingData?.results.map((item) => (
        <ListItem key={item.id} item={item} mediaType={item.media_type} />
      ))}
    </>
  );
};
