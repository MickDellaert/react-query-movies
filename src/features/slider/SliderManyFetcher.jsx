import * as api from "../../api/api";
import { useQueries } from "@tanstack/react-query";
import useSlider from "../../hooks/useSlider";
import { SliderContainer } from "./SliderContainer";
import { SliderVertical } from "./SliderVertical";
import { SliderHorizontal } from "./SliderHorizontal";

export const SliderManyFetcher = ({
  trendingDataCombined,
  itemNumberHorizontal,
  itemNumberVertical,
  skipFirst,
}) => {
  console.log(trendingDataCombined.length - itemNumberVertical * 2 - 1);

  const userQueries = useQueries({
    queries: trendingDataCombined.map((item) => {
      return {
        queryKey: ["getManyDetails", item.id, item.media_type],
        queryFn: () => api.getDetails(item.id, item.media_type),
      };
    }),
  });

  const trendingDataIndexed = userQueries.map((item, key) => ({
    key,
    ...item,
  }));

  const {
    nextFunction,
    previousFunction,
    handleClick,
    handleTransition,
    pauseSlider,
    currentIndex,
    transition,
  } = useSlider(itemNumberVertical, trendingDataCombined);

  if (userQueries.some((query) => query.isLoading)) {
    return <h2>"Loading"</h2>;
  }

  // console.log(trendingDataIndexed);

  const data = {
    trendingDataIndexed,
    currentIndex,
    transition,
    skipFirst,
    handleClick,
    handleTransition,
  };

  return (
    <>
      <button onClick={previousFunction}>Previous</button>
      <button onClick={nextFunction}>Next</button>
      <button onClick={pauseSlider}>Pause slideshow</button>

      <SliderHorizontal
        {...data}
        // trendingDataIndexed={trendingDataIndexed}
        // currentIndex={currentIndex}
        // transition={transition}
        // handleClick={handleClick}
        // handleTransition={handleTransition}
        itemNumber={1}
        divHeight={"auto"}
        containerPadding={10}
        singlePadding={0}
      />

      <SliderVertical
        {...data}
        // trendingDataIndexed={trendingDataIndexed}
        // currentIndex={currentIndex}
        // transition={transition}
        // skipFirst={skipFirst}
        // handleClick={handleClick}
        // handleTransition={handleTransition}
        itemNumber={itemNumberVertical}
        divHeight={800}
        containerPadding={10}
        singlePadding={10}
        horizontal={false}
      />

      {/* 
      <SliderContainer
        userQueriesIndexed={userQueriesIndexed}
        tripleIndexed={tripleIndexed}
      /> */}
    </>
  );
};
