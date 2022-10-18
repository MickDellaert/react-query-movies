import * as api from "../../api/api";
import { useQueries } from "@tanstack/react-query";
import useSlider from "../../hooks/useSlider";
// import { SliderContainer } from "./SliderContainer";
import { SliderVertical } from "./SliderVertical";
import { SliderHorizontal } from "./SliderHorizontal";

export const SliderManyFetcher = ({ tripleIndexed }) => {
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
  } = useSlider(6, tripleIndexed);




  if (userQueries.some((query) => query.isLoading)) {
    return <h2>"Loading"</h2>;
  }

  return (
    <>

    <button onClick={previousFunction}>Previous</button>
    <button onClick={nextFunction}>Next</button>
    <button onClick={pauseSlider}>Pause slideshow</button>

    <SliderHorizontal
      userQueriesIndexed={userQueriesIndexed}
      divHeight={"auto"}
      itemNumber={1}
      singlePadding={0}
      currentIndex={currentIndex}
      containerPadding={10}
      handleClick={handleClick}
      handleTransition={handleTransition}
      transition={transition}
    />

    <SliderVertical
      tripleIndexed={tripleIndexed}
      divHeight={800}
      itemNumber={6}
      containerPadding={10}
      singlePadding={10}
      currentIndex={currentIndex}
      handleClick={handleClick}
      handleTransition={handleTransition}
      transition={transition}
    />
  </>
  );
};
