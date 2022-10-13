import "./home.css";

import * as api from "../../api/api";

import { useEffect, useState } from "react";

// import { useQuery, useQueries } from "@tanstack/react-query";

export const TrendingItem = ({ trendingData }) => {
  let divHeight = 800;
  let startItem = 1;
  let itemNumber = 5;
  let containerPadding = 10;
  let singlePadding = 5;

  const [currentIndex, setCurrentIndex] = useState(startItem);
  const [singleHeight, setSingleHeight] = useState(
    (divHeight - containerPadding * 2) / itemNumber
  );

  // const [startOffset, setStartOffset] = useState(-currentIndex * singleHeight);
  // const [isForward, setisForward] = useState(true);

  const [clickedIndex, setClickedIndex] = useState(startItem);
  const [transition, setTransition] = useState(true);
  const [clicked, setIsClicked] = useState(false);

  const sliced = trendingData.results.slice(0, 6);
  const double = [...sliced, ...sliced];
  const doubleIndexed = double.map((item, key) => ({ key, ...item }));

  // const trendingHeader = sliced[nextIndex];
  // const trendingNext = sliced[nextIndex + 1];
  // const doubleIndexed = double.map((item, key) => ({ key, ...item }));

  console.log(doubleIndexed);

  useEffect(() => {
    if (clicked) {
      setTransition(true);
      setCurrentIndex(clickedIndex - doubleIndexed.length / 2 );
    }
  }, [clicked]);

  const nextFunction = () => {
    setTransition(true);
    setCurrentIndex((currentIndex) => currentIndex + 1);
  };

  const previousFunction = () => {
    setTransition(true);
    setCurrentIndex((currentIndex) => currentIndex - 1);
  };

  const handleClick = (item) => {
    setTransition(true);
    setClickedIndex(item);
    setCurrentIndex(item);
    setIsClicked(false);

    if (item > doubleIndexed.length / 2) {
      setTransition(false);
      setIsClicked(true);
      setClickedIndex(item);
      setCurrentIndex(0);
    }
 };

  const handleTransition = () => {
    if (!clicked) {
      if (currentIndex === doubleIndexed.length / 2 + 1) {
        setTransition(false);
        setCurrentIndex(1);
      }
      if (currentIndex === 0) {
        setTransition(false);
        setCurrentIndex(doubleIndexed.length / 2);
      }
    }

    setIsClicked(false);
  };

  console.log("currentindex" + currentIndex);
  console.log("clickedindex" + clickedIndex);
  console.log("singleHeight" + singleHeight);
  console.log("transition " + transition);
  console.log("isclicked " + clicked);

  // console.log("length" + doubleIndexed.length);
  // console.log("start" + startOffset);

  return (
    <>
      <div>TrendingItem</div>

      {/* <div>
        <h3 className="trending-header__title">{trendingHeader.title}</h3>
        <img src={`${api.IMG_URL}${trendingHeader.backdrop_path}`} alt="" />
      </div>

      <div>TrendingNext</div>

      <div>
        <h3>{trendingNext.title}</h3>
        <img src={`${api.IMG_URL}${trendingNext.backdrop_path}`} alt="" />
      </div> */}

      <div
        className="vertical-slider-container"
        style={{ height: `${divHeight}px`, padding: `${containerPadding}px` }}
      >
        <div className="vertical-slider-crop">
          <div
            className="vertical-slider-content"
            style={{
              transform: `translateY(${-currentIndex * singleHeight}px)`,
              transition: transition ? `all 2500ms linear` : "none",
            }}
            onTransitionEnd={() => handleTransition()}
          >
            {doubleIndexed.map((item) => (
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
    </>
  );
};
