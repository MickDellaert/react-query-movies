import * as api from "../../api/api";
import { useQuery } from "@tanstack/react-query";
import { SliderManyFetcher } from "./SliderManyFetcher";

export const SliderFetcher = () => {
  const totalNumber = 6;

  const { isLoading: trendingLoading, data: trendingData } = useQuery(
    ["trending-movies"],
    api.getTrending
  );

  if (trendingLoading) {
    return <h2>"Loading"</h2>;
  }

  const sliced = trendingData.results.slice(0, totalNumber);
  const triple = [...sliced, ...sliced, ...sliced];
  const tripleIndexed = triple.map((item, key) => ({ key, ...item }));

  console.log(sliced);

  return <SliderManyFetcher tripleIndexed={tripleIndexed} />;
};
