import "./home.css";

import * as api from "../../api/api";

import { useEffect, useState } from "react";

// import { useQuery, useQueries } from "@tanstack/react-query";

export const TrendingItem = ({ trendingData }) => {
  let divHeight = 1000;
  let itemNumber = 6;
  let containerPadding = 20;
  let singlePadding = 5;

  const [nextIndex, setNextIndex] = useState(0);

  const [startOffset, setStartOffset] = useState(0);

  const [singleHeight, setSingleHeight] = useState(
    (divHeight - containerPadding * 2) / itemNumber
  );

  // const [transform, setTransform] = useState({ transform: `translateY(${startOffset}px)` });

  const [clickedIndex, setClickedIndex] = useState();

  const [transition, setTransition] = useState();

  const sliced = trendingData.results.slice(0, 10);
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

  const id = trendingData.results[nextIndex].id;
  const type = trendingData.results[nextIndex].media_type;

  useEffect(() => {
    setStartOffset(startOffset);
  }, [startOffset]);

  console.log("start" + startOffset);

  const nextFunction = () => {
    if (nextIndex < doubleIndexed.length - 1) {
      setNextIndex(nextIndex + 1);
      setStartOffset(startOffset - singleHeight);
    }

    if (nextIndex === doubleIndexed.length / 2) {
      setNextIndex(0);
      setStartOffset(0);
    }
  };

  const previousFunction = () => {
    if (nextIndex > 0) {
      setNextIndex((nextIndex) => nextIndex - 1);
      setStartOffset(startOffset + singleHeight);
    }

    if (nextIndex === 0) {
      setNextIndex(doubleIndexed.length / 2);
      setStartOffset((-singleHeight * doubleIndexed.length) / 2);
      // setNextIndex(nextIndex => nextIndex - 1);
      // setStartOffset(startOffset + singleHeight);
      // setStartOffset(startOffset + singleHeight);
    }
  };

  useEffect(() => {
    if (nextIndex === doubleIndexed.length / 2) {
      setStartOffset(startOffset + singleHeight);
    }
  }, [nextIndex]);

  const handleClick = (item) => {
    setNextIndex(item);
    setStartOffset(-singleHeight * (item + 1));
    console.log("key" + item);
  };

  console.log("index" + nextIndex);
  console.log("length" + doubleIndexed.length);
  console.log("start" + startOffset);


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
            style={{ transform: `translateY(${startOffset}px)` }}
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
