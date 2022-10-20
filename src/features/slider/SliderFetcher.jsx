import * as api from "../../api/api";
import { useQuery } from "@tanstack/react-query";
import { SliderManyFetcher } from "./SliderManyFetcher";
import { SliderManyFetcherCopy } from "./SliderManyFetcherCopy";
import { useEffect } from "react";
import { ManyQueries } from "../../pages/home/ManyQueries";

export const SliderFetcher = () => {
  const totalNumber = 6;
  const itemNumberHorizontal = 1;
  const itemNumberVertical = 4;
  const skipFirst = 1;

  const { isLoading: trendingLoading, data: trendingData } = useQuery(
    ["trending-movies"],
    api.getTrending,
    {
      select: (data) => {
        const slicedData = data.results.slice(0, totalNumber);
        return slicedData;
      },
    }
  );

  if (trendingLoading) {
    return <h2>"Loading"</h2>;
  }

  const trendingDataNext = trendingData.slice(
    0,
    itemNumberVertical + skipFirst
  );

  const trendingDataPrev = trendingData.slice(
    totalNumber - itemNumberVertical,
    totalNumber
  );

  const trendingDataCombined = [
    ...trendingDataPrev,
    ...trendingData,
    ...trendingDataNext,
  ];

  // console.log(trendingData);

  return (
    <>
      <SliderManyFetcher
        trendingDataCombined={trendingDataCombined}
        itemNumberHorizontal={itemNumberHorizontal}
        itemNumberVertical={itemNumberVertical}
        skipFirst={skipFirst}
      />

      {/* <SliderManyFetcherCopy
        tripleIndexed={tripleIndexed}
        doubleIndexed={doubleIndexed}
        itemNumberHorizontal={itemNumberHorizontal}
        itemNumberVertical={itemNumberVertical}
        combinedHorizontal={combinedHorizontalIndexed}
        combinedVerticalIndexed={combinedVerticalIndexed}
      /> */}

    </>
  );
};
