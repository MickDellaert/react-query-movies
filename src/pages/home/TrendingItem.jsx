import "./home.css";

import { v4 as uuidv4 } from "uuid";
import * as api from "../../api/api";
import { useEffect, useState } from "react";

// import { useQuery, useQueries } from "@tanstack/react-query";

export const TrendingItem = ({ trendingData }) => {
  const divHeight = 800;
  const startItem = 1;
  const itemNumber = 6;
  const totalNumber = 6;
  const containerPadding = 10;
  const singlePadding = 5;
  const singleHeight = (divHeight - containerPadding * 2) / itemNumber;

  const [currentIndex, setCurrentIndex] = useState(startItem);
  // const [singleHeight, setSingleHeight] = useState(
  //   (divHeight - containerPadding * 2) / itemNumber
  // );

  // const [startOffset, setStartOffset] = useState(-currentIndex * singleHeight);
  // const [isForward, setisForward] = useState(true);

  const [clickedIndex, setClickedIndex] = useState(startItem);
  const [sliderIndex, setSliderIndex] = useState(startItem);

  const [transition, setTransition] = useState(true);
  const [clicked, setIsClicked] = useState(false);
  const [isSliding, setIsSliding] = useState(true);

  const sliced = trendingData.results.slice(0, totalNumber);
  const double = [...sliced, ...sliced];
  const triple = [...sliced, ...sliced, ...sliced];

  const slicedIndexed = sliced.map((item, key) => ({ key, ...item }));
  const doubleIndexed = sliced.map((item, key) => ({ key, ...item }));
  const tripleIndexed = triple.map((item, key) => ({ key, ...item }));

  // const trendingHeader = sliced[nextIndex];
  // const trendingNext = sliced[nextIndex + 1];
  // const doubleIndexed = double.map((item, key) => ({ key, ...item }));

  console.log(tripleIndexed);

  useEffect(() => {
    if (isSliding) {
      const intervalId = setInterval(() => {
        setTransition(true);
        setCurrentIndex((prev) => prev + 1);

        if (currentIndex > tripleIndexed.length / 3) {
          // setTransition(false);
          setCurrentIndex(
            (currentIndex) => currentIndex - tripleIndexed.length / 3
          );
        }
      }, 2000);
      return () => {
        clearInterval(intervalId);
      };
    }
  }, [isSliding]);

  const nextFunction = () => {
    setTransition(true);
    setCurrentIndex((currentIndex) => currentIndex + 1);
    setSliderIndex((prevIndex) => prevIndex + 1);
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

  const handleSliderTransition = () => {
    // if (currentIndex > tripleIndexed.length / 3) {
    //   setTransition(false);
    //   setCurrentIndex(currentIndex - tripleIndexed.length / 3);
    // }
  };

  console.log("currentindex" + currentIndex);
  console.log("clickedindex" + clickedIndex);
  console.log("sliderindex" + sliderIndex);
  console.log("singleHeight" + singleHeight);
  console.log("transition " + transition);
  console.log("issliding" + isSliding);

  // console.log("isclicked " + clicked);

  console.log("length" + tripleIndexed.length);
  // console.log("start" + startOffset);

  return (
    <>
      <div>TrendingItem</div>

      <div className="horizontal-slider-container">
        <div className="horizontal-slider-crop">
          <div
            className="horizontal-slider-content"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
              transition: transition ? `all 300ms linear` : "none",
            }}
            onTransitionEnd={() => handleSliderTransition()}
          >
            {tripleIndexed.map((item) => (
              <div className="horizontal-slider-item" key={uuidv4()}>
                <p>{item.key} </p>
                <h5>{item.title} </h5>
                <h5>{item.original_name}</h5>

                <img
                  className="vertical-slider-item-image"
                  src={`${api.IMG_URL}${item.backdrop_path}`}
                  alt=""
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div
        className="vertical-slider-container"
        style={{ height: `${divHeight}px`, padding: `${containerPadding}px` }}
      >
        <div className="vertical-slider-crop">
          <div
            className="vertical-slider-content"
            style={{
              transform: `translateY(-${(currentIndex + 1) * singleHeight}px)`,
              transition: transition ? `all 300ms linear` : "none",
            }}
            onTransitionEnd={() => handleTransition()}
          >
            {tripleIndexed.map((item) => (
              <>
                <div
                  className="vertical-slider-item"
                  key={item.id}
                  onClick={() => handleClick(item.key)}
                  style={{
                    height: `calc((100%  / ${itemNumber})`,
                    paddingBlock: `${singlePadding}px`,
                  }}
                >
                  <p>{item.key} </p>
                  <h5>{item.title} </h5>
                  <h5>{item.original_name}</h5>

                  <img
                    className="vertical-slider-item-image"
                    src={`${api.IMG_URL}${item.backdrop_path}`}
                    alt=""
                  />
                </div>
              </>
            ))}
          </div>
        </div>
      </div>

      <button onClick={previousFunction}>Previous</button>
      <button onClick={nextFunction}>Next</button>
      <button onClick={pauseSlider}>Pause slideshow</button>
    </>
  );
};
