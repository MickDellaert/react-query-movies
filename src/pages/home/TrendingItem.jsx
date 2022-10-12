import "./home.css";

import * as api from "../../api/api";

import { useEffect, useState } from "react";

// import { useQuery, useQueries } from "@tanstack/react-query";

export const TrendingItem = ({ trendingData }) => {
  let divHeight = 800;
  let startItem = 6;
  let itemNumber = 6;
  let containerPadding = 0;
  let singlePadding = 5;
  let test = "test";

  const [currentIndex, setCurrentIndex] = useState(startItem);
  const [singleHeight, setSingleHeight] = useState(
    (divHeight - containerPadding * 2) / itemNumber
  );
  const [startOffset, setStartOffset] = useState(-startItem * singleHeight);
  const [isForward, setisForward] = useState(true);
  const [clickedIndex, setClickedIndex] = useState(startItem);
  const [transition, setTransition] = useState(true);

  const sliced = trendingData.results.slice(0, 6);
  const double = [...sliced, ...sliced, ...sliced];
  const doubleIndexed = double.map((item, key) => ({ key, ...item }));

  // const trendingHeader = sliced[nextIndex];
  // const trendingNext = sliced[nextIndex + 1];

  // const doubleIndexed = double.map((item, key) => ({ key, ...item }));
  console.log(doubleIndexed);

  // sliced.push(sliced[0]);
  // sliced.unshift(sliced[sliced.length - 2])
  // const cloned = tempArr.unshift(sliced[sliced.length - 2])

  // console.log(sliced[0]);
  // console.log(sliced[8]);

  // const testSlice = test.slice(0,5)
  // console.log(tempArr)
  // console.log(sliced)

  // const id = trendingData.results[currentIndex].id;
  // const type = trendingData.results[currentIndex].media_type;

  // useEffect(() => {
  //   setStartOffset(startOffset);
  // }, [startOffset]);

  const nextFunction = () => {
    setisForward(true);
    setTransition(true);

    if (currentIndex < doubleIndexed.length / 3) {
      setCurrentIndex((nextIndex) => nextIndex + 1);
      setStartOffset(startOffset - singleHeight);
    }

    if (currentIndex === doubleIndexed.length / 3) {
      setCurrentIndex(0);
      setTransition(false);
      setStartOffset(0);
    }
  };

  const previousFunction = () => {
    setisForward(false);
    setTransition(true);

    if (currentIndex > 0) {
      setCurrentIndex((currentIndex) => currentIndex - 1);
      setStartOffset(startOffset + singleHeight);
    }

    if (currentIndex === 0) {
      setCurrentIndex(doubleIndexed.length / 3);
      setTransition(false);
      setStartOffset((-singleHeight * doubleIndexed.length) / 3);
    }
  };

  useEffect(() => {
    if (!isForward && currentIndex === doubleIndexed.length / 3) {
      setCurrentIndex((currentIndex) => currentIndex - 1);
      setTransition(true);
      setStartOffset(startOffset + singleHeight);
    }
    if (isForward && currentIndex === 0) {
      setCurrentIndex((currentIndex) => currentIndex + 1);
      setTransition(true);
      setStartOffset(startOffset - singleHeight);
    }
  }, [currentIndex]);

  const handleClick = (item) => {
    console.log("item" + item);

    if (item <= doubleIndexed.length + itemNumber) {
      setTransition(true);

      setClickedIndex(item);
      setStartOffset(-singleHeight * item);
      setCurrentIndex(item - itemNumber);
    }

    if (item > (doubleIndexed.length - itemNumber)) {
      // setStartOffset(-singleHeight * item);
      setTransition(false);
      setClickedIndex(item);

      setCurrentIndex(item - 6)

      setStartOffset(-2 * singleHeight);

      // setCurrentIndex(item - 6)
    }

    // // setClickedIndex(item);

    // if (item > 6) {
    //   setTransition(false);
    //   setClickedIndex(item - 6);

    //   setStartOffset(0);
    //   // setCurrentIndex(item - 6)
    // }
  };

  useEffect(() => {
    // setCurrentIndex(clickedIndex);
    // setCurrentIndex(clickedIndex);
    // console.log("effectclicked" + clickedIndex);
    // // setClickedIndex(clickedIndex - 6);
    // setTransition(true);
    // // setStartOffset(-(currentIndex - 6) * singleHeight);
    // setStartOffset(-singleHeight * clickedIndex);
  }, [clickedIndex]);

  console.log("currentindex" + currentIndex);
  console.log("clickedindex" + clickedIndex);

  // console.log("length" + doubleIndexed.length);
  console.log("start" + startOffset);
  console.log("singleHeight" + singleHeight);

  console.log("transition " + transition);
  console.log("isforward" + isForward);

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
