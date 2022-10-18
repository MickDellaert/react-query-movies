import { useEffect, useState } from "react";

 const useSlider = (startItem, tripleIndexed) => {


  const [currentIndex, setCurrentIndex] = useState(startItem);
  const [clickedIndex, setClickedIndex] = useState(startItem);
  const [transition, setTransition] = useState(true);
  const [isSliding, setIsSliding] = useState(false);

  useEffect(() => {
    if (isSliding) {
      const intervalId = setInterval(() => {
        setTransition(true);
        setCurrentIndex((prev) => prev + 1);
      }, 2000);
      return () => {
        clearInterval(intervalId);
      };
    }
  }, [isSliding]);



  const nextFunction = () => {
    setTransition(true);
    setCurrentIndex((currentIndex) => currentIndex + 1);
    // setSliderIndex((prevIndex) => prevIndex + 1);
  };

  const previousFunction = () => {
    setTransition(true);
    setCurrentIndex((currentIndex) => currentIndex - 1);
  };

  const handleClick = (item) => {
    setTransition(true);
    setClickedIndex(item);
    setCurrentIndex(item);
  };

  const pauseSlider = () => {
    setIsSliding(!isSliding);
  };

  const handleTransition = () => {
    if (currentIndex === 0) {
      setTransition(false);
      setCurrentIndex(tripleIndexed.length / 3);
    }
    if (currentIndex > tripleIndexed.length / 3) {
      setTransition(false);
      setCurrentIndex(currentIndex - tripleIndexed.length / 3);
    }
  };

  return {nextFunction, previousFunction, handleClick, handleTransition, pauseSlider, currentIndex, transition}

}

export default useSlider