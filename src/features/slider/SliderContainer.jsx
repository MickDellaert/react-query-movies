import { SliderVertical } from "./SliderVertical";
import { SliderHorizontal } from "./SliderHorizontal";
import useSlider from "../../hooks/useSlider";

export const SliderContainer = ({ tripleIndexed, userQueriesIndexed }) => {
  // const divHeight = 600;
  // const startItem = 6;
  // const itemNumber = 4;
  // const totalNumber = 6;
  // const containerPadding = 10;
  // const singlePadding = 5;

  const {
    nextFunction,
    previousFunction,
    handleClick,
    handleTransition,
    pauseSlider,
    currentIndex,
    transition,
  } = useSlider(6, tripleIndexed);

  return (
    <>
      <h2>Slider Container</h2>

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
