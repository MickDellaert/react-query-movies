import "./home.css";

import { v4 as uuidv4 } from "uuid";
import * as api from "../../api/api";
import { useEffect, useState } from "react";
import { useQueries } from "@tanstack/react-query";

export const TrendingItem = ({ trendingData }) => {
  const divHeight = 600;
  const startItem = 6;
  const itemNumber = 4;
  const totalNumber = 6;
  const containerPadding = 10;
  const singlePadding = 5;
  const singleHeight = (divHeight - containerPadding * 2) / itemNumber;

  const [currentIndex, setCurrentIndex] = useState(startItem);
  const [clickedIndex, setClickedIndex] = useState(startItem);
  const [sliderIndex, setSliderIndex] = useState(startItem);
  const [transition, setTransition] = useState(true);
  const [isSliding, setIsSliding] = useState(false);

  
  const sliced = trendingData.results.slice(0, totalNumber);

  // const double = [...sliced, ...sliced];
  // const doubleIndexed = double.map((item, key) => ({ key, ...item }));

  const triple = [...sliced, ...sliced, ...sliced];
  const tripleIndexed = triple.map((item, key) => ({ key, ...item }));

  const firstCopy = trendingData.results.slice(0, itemNumber);
  const lastCopy = trendingData.results.slice(totalNumber - itemNumber, totalNumber);

  const combined = [...lastCopy, ...sliced, ...firstCopy]
  console.log(sliced)
  console.log(combined)

  // console.log(firstCopy)
  // console.log(lastCopy)

  const userQueries = useQueries({
    queries: tripleIndexed.map((item) => {
      return {
        queryKey: ["getManyDetails", item.id, item.media_type],
        queryFn: () => api.getDetails(item.id, item.media_type),
        // select: (data) => { const userQueriesData = data.data.map(item => item.data)
        // return userQueriesData}
      };
    }),
  });

  const userQueriesIndexed = userQueries.map((item, key) => ({ key, ...item }));

  useEffect(() => {
    if (isSliding) {
      const intervalId = setInterval(() => {
        setTransition(true);
        setCurrentIndex((prev) => prev + 1);

        // if (currentIndex > tripleIndexed.length / 3) {
        //   // setTransition(false);
        //   setCurrentIndex(
        //     (currentIndex) => currentIndex - tripleIndexed.length / 3
        //   );
        // }
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
  // console.log(userQueries[0].data);
  // console.log(userQueries);
  // console.log(manyTripleIndexed);
  console.log(userQueriesIndexed);


  if (userQueries.some((query) => query.isLoading)) {
    return <h2>"Loading"</h2>;
  }

  console.log(userQueriesIndexed[0].data.images.logos);


  return (
    <>
      <div>TrendingItem</div>
      <div
        className="horizontal-slider-container"
        // onMouseEnter={() => setIsSliding(false)}
        // onMouseLeave={() => setIsSliding(true)}
      >
        <div className="horizontal-slider-crop">
          <div
            className="horizontal-slider-content"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
              transition: transition ? `all 400ms ease-out` : "none",
            }}
            onTransitionEnd={() => handleSliderTransition()}
          >
            {userQueriesIndexed.map((item) => (
              <div className="horizontal-slider-item" key={uuidv4()}>
                <p>{item.key} </p>
                <h5>{item.data.title} </h5>
                <h5>{item.data.original_name}</h5>
                {/* <img
                  className="vertical-slider-item-image"
                  src={`${api.IMG_URL}${item.data.backdrop_path}`}
                  alt=""
                /> */}

                {item.data.images.backdrops.slice(0, 1).map((items) => (
                  // <div>{items.width}</div>

                  <img
                    // className="logo-image"
                    className="horizontal-slider-item-image"
                    src={`${api.IMG_URL}${items.file_path}`}
                    alt=""
                  />
                ))}

                <p className="horizontal-slider-item-description">{item.data.overview}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div
        className="vertical-slider-container"
        style={{ height: `${divHeight}px`, padding: `${containerPadding}px` }}
        // onMouseEnter={() => setIsSliding(false)}
        // onMouseLeave={() => setIsSliding(true)}
      >
        <div className="vertical-slider-crop">
          <div
            className="vertical-slider-content"
            style={{
              // transform: `translateY(-${(currentIndex + 1) * (singleHeight)}px)`,
              transform: `translateY(-${
                (currentIndex + 1) * (100 / itemNumber)
              }%)`,

              transition: transition ? `all 400ms ease-out` : "none",
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
      <div>
        {/* {userQueriesIndexed.map((item) =>
              item.data.images.backdrops.map((items) => (
                // <div>{items.width}</div>

                <img
                  className="backdrop-image"
                  src={`${api.IMG_URL}${items.file_path}`}
                  alt=""
                />
              ))
            )} */}
      </div>
    </>
  );
};
