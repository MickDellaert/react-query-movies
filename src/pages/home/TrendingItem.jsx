import "./home.css";

import * as api from "../../api/api";

import { useEffect, useState } from "react";

// import { useQuery, useQueries } from "@tanstack/react-query";

export const TrendingItem = ({ trendingData }) => {
  let divHeight = 800;
  let startItem = 3;
  let itemNumber = 4;
  let containerPadding = 0;
  let singlePadding = 5;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [singleHeight, setSingleHeight] = useState(
    (divHeight - containerPadding * 2) / itemNumber
  );
  const [startOffset, setStartOffset] = useState(0);
  const [isForward, setisForward] = useState(false);
  const [clickedIndex, setClickedIndex] = useState();
  const [transition, setTransition] = useState(true);

  const sliced = trendingData.results.slice(0, 6);
  const double = [...sliced, ...sliced];
  const doubleIndexed = double.map((item, key) => ({ key, ...item }));

  // const trendingHeader = sliced[nextIndex];
  // const trendingNext = sliced[nextIndex + 1];

  // const doubleIndexed = double.map((item, key) => ({ key, ...item }));
  // console.log(doubleIndexed);

  // sliced.push(sliced[0]);
  // sliced.unshift(sliced[sliced.length - 2])
  // const cloned = tempArr.unshift(sliced[sliced.length - 2])

  // console.log(sliced[0]);
  // console.log(sliced[8]);

  // const testSlice = test.slice(0,5)
  // console.log(tempArr)
  // console.log(sliced)

  const id = trendingData.results[currentIndex].id;
  const type = trendingData.results[currentIndex].media_type;

  // useEffect(() => {
  //   setStartOffset(startOffset);
  // }, [startOffset]);

  const nextFunction = () => {
    setisForward(true);

    if (currentIndex < doubleIndexed.length) {
      setCurrentIndex((nextIndex) => nextIndex + 1);
      setStartOffset(startOffset - singleHeight);
    }

    if (currentIndex === doubleIndexed.length / 2) {
      setCurrentIndex(0);
      setTransition(false);
      setStartOffset(0);
    }
  };

  const previousFunction = () => {
    setisForward(false);

    if (currentIndex > 0) {
      setCurrentIndex((nextIndex) => nextIndex - 1);
      setStartOffset(startOffset + singleHeight);
    }

    if (currentIndex === 0) {
      setCurrentIndex(doubleIndexed.length / 2);
      setTransition(false);
      setStartOffset((-singleHeight * doubleIndexed.length) / 2);
    }
  };

  useEffect(() => {
    if (!isForward && currentIndex === doubleIndexed.length / 2) {
      setCurrentIndex((nextIndex) => nextIndex - 1);
      setTransition(true);
      setStartOffset(startOffset + singleHeight);
    }
    if (isForward && currentIndex === 0) {
      setCurrentIndex((nextIndex) => nextIndex + 1);
      setTransition(true);
      setStartOffset(-singleHeight);
    }
  }, [currentIndex]);

  const handleClick = (item) => {
    setCurrentIndex(item);
    setStartOffset(-singleHeight * (item + 1));
    console.log("key" + item);
  };

  console.log("index" + currentIndex);
  console.log("length" + doubleIndexed.length);
  console.log("start" + startOffset);
  console.log("singleHeight" + singleHeight);

  console.log(isForward);

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
              transform: `translateY(${startOffset}px)`,
              transition: transition ? `all 250ms linear` : "none",
            }}
          >
            {doubleIndexed.map((item) => (
              <>
                <div
                  className="vertical-slider-item"
                  key={item.id}
                  onClick={() => handleClick(item.key)}
                  style={{
                    height: `calc((100%  / ${itemNumber})`,
                    padding: `${singlePadding}px`,
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
