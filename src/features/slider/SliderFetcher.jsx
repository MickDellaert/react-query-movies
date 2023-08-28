import * as api from "../../api/api";
import { useQuery } from "@tanstack/react-query";
import { SliderManyFetcher } from "./SliderManyFetcher";

export const SliderFetcher = () => {
  const totalNumber = 10;
  const itemNumberHorizontal = 1;
  const itemNumberVertical = 5;
  const skipFirst = 1;

  const { isLoading: trendingLoading, data: trendingData } = useQuery(["trending-movies"], api.getTrending, {
    select: (data) => {
      const slicedData = data.results.slice(0, totalNumber);
      return slicedData;
    },
  });

  if (trendingLoading) {
    return <h2>"Loading"</h2>;
  }

  const trendingDataNext = trendingData.slice(0, itemNumberVertical + skipFirst);
  const trendingDataPrev = trendingData.slice(totalNumber - itemNumberVertical, totalNumber);
  const trendingDataCombined = [...trendingDataPrev, ...trendingData, ...trendingDataNext];

  return (
    <>
      <SliderManyFetcher
        trendingDataCombined={trendingDataCombined}
        itemNumberHorizontal={itemNumberHorizontal}
        itemNumberVertical={itemNumberVertical}
        skipFirst={skipFirst}
        totalNumber={totalNumber}
      />
    </>
  );
};
