import * as api from "../../api/api";
import { useQueries } from "@tanstack/react-query";
import useSlider from "../../hooks/useSlider";
import { SliderContainer } from "./SliderContainer";
import { SliderVertical } from "./SliderVertical";
import { SliderHorizontal } from "./SliderHorizontal";

export const SliderManyFetcherCopy = ({
  tripleIndexed,
  doubleIndexed,
  itemNumberHorizontal,
  itemNumberVertical,
  combinedHorizontal,
  combinedVerticalIndexed,
}) => {

  console.log(itemNumberVertical)

  const userQueries = useQueries({
    queries: tripleIndexed.map((item) => {
      return {
        queryKey: ["getManyDetails", item.id, item.media_type],
        queryFn: () => api.getDetails(item.id, item.media_type),
      };
    }),
  });

  const userQueriesIndexed = userQueries.map((item, key) => ({ key, ...item }));

  const {
    nextFunction,
    previousFunction,
    handleClick,
    handleTransition,
    pauseSlider,
    currentIndex,
    transition,
  } = useSlider(itemNumberHorizontal, combinedHorizontal);

  if (userQueries.some((query) => query.isLoading)) {
    return <h2>"Loading"</h2>;
  }

  return (
    <>
      <button onClick={previousFunction}>Previous</button>
      <button onClick={nextFunction}>Next</button>
      <button onClick={pauseSlider}>Pause slideshow</button>

      {/* <SliderHorizontal
        combinedHorizontal={combinedHorizontal}
        combinedVerticalIndexed={combinedVerticalIndexed}
        userQueriesIndexed={userQueriesIndexed}
        divHeight={"auto"}
        itemNumber={itemNumberHorizontal}
        singlePadding={0}
        currentIndex={currentIndex}
        containerPadding={10}
        handleClick={handleClick}
        handleTransition={handleTransition}
        transition={transition}
        doubleIndexed={doubleIndexed}
      /> */}

      {/* <SliderVertical
        combinedVerticalIndexed={combinedVerticalIndexed}
        tripleIndexed={tripleIndexed}
        divHeight={800}
        itemNumber={itemNumberVertical}
        containerPadding={10}
        singlePadding={10}
        currentIndex={currentIndex}
        handleClick={handleClick}
        handleTransition={handleTransition}
        transition={transition}
        horizontal={false}
      /> */}
      {/* 
      <SliderContainer
        userQueriesIndexed={userQueriesIndexed}
        tripleIndexed={tripleIndexed}
      /> */}
    </>
  );
};
