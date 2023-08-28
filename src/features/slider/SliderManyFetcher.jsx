import * as api from "../../api/api";
import { useQueries } from "@tanstack/react-query";
import useSlider from "../../hooks/useSlider";
import { SliderVertical } from "./SliderVertical";
import { SliderHorizontal } from "./SliderHorizontal";

export const SliderManyFetcher = ({ trendingDataCombined, itemNumberHorizontal, itemNumberVertical, skipFirst }) => {
  // console.log(trendingDataCombined.length - itemNumberVertical * 2 - 1);
  
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

  const { nextFunction, previousFunction, handleClick, handleTransition, pauseSlider, currentIndex, transition } =
    useSlider(itemNumberVertical, trendingDataIndexed);

  if (userQueries.some((query) => query.isLoading)) {
    return <h2>"Loading"</h2>;
  }

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
      <div className="buttons-row">
        <button onClick={previousFunction}>Previous</button>
        <button onClick={nextFunction}>Next</button>
        <button onClick={pauseSlider}>Pause slideshow</button>
      </div>

      <div className="slider-row">
        <SliderHorizontal {...data} itemNumber={1} divHeight={"auto"} containerPadding={10} singlePadding={0} />

        <SliderVertical
          {...data}
          itemNumber={itemNumberVertical}
          divHeight={600}
          containerPadding={10}
          singlePadding={10}
          horizontal={false}
        />
      </div>

      {/* <SliderVertical
        {...data}
        // trendingDataIndexed={trendingDataIndexed}
        // currentIndex={currentIndex}
        // transition={transition}
        // skipFirst={skipFirst}
        // handleClick={handleClick}
        // handleTransition={handleTransition}
        skipFirst={0}
        itemNumber={1}
        divHeight={"auto"}
        containerPadding={10}
        singlePadding={10}
        horizontal={true}
      /> */}
    </>
  );
};
