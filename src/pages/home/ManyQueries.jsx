import React from "react";

import * as api from "../../api/api";

import { useQuery, useQueries } from "@tanstack/react-query";

import useManyQueries from "../../hooks/useManyQueries";

export const ManyQueries = ({ trendingDataCombined }) => {
  // const getManyDetails = (id, type) => {
  //   return axios.get(
  //     `https://api.themoviedb.org/3/${type}/${id}?api_key=d4208ada7ca0b82909b61d7d3afd76fa&append_to_response=videos,images`
  //   );
  // };

  // const userQueries = useQueries({
  //   queries: [
  //     // { queryKey: ["getTrending"], queryFn: api.getTrending },

  //     trendingDataCombined.map((item) => {
  //       return {
  //         queryKey: ["getManyDetails", item.id, item.media_type],
  //         queryFn: () => api.getDetails(item.id, item.media_type),
  //       };
  //     }),
  //   ],
  // });
  const { userQueriesIndexed, userQueries } = useManyQueries(api.getPopular, "movie", 10);

  // const param = ["media_type"];

  // const { isLoading: trendingLoading, data: trendingData } = useQuery(
  //   ["trending-movies"],
  //   api.getTrending,
  //   {
  //     select: (data) => {
  //       const slicedData = data.results.slice(0, 6);
  //       return slicedData;
  //     },
  //   }
  // );

  // const userQueries = useQueries({
  //   queries:
  //     trendingData?.map((item) => {
  //       return {
  //         queryKey: ["getTestDetails", item.id, item.media_type],
  //         queryFn: () => api.getDetails(item.id, item.media_type),
  //         // enabled: !!trendingData,
  //         // select: (data) => data.data.map((item, key) => ({key, ...item}))
  //       };
  //     }) ?? [],
  // });

  // const userQueriesIndexed = userQueries.map((item, key) => ({ key, ...item }));

  // const test = [1, 2, 3, 4, 5];

  if (userQueries.some((query) => query.isLoading)) {
    return <h2>"Loading"</h2>;
  }

  // console.log(userQueries);
  console.log(userQueriesIndexed);
  // console.log(trendingData);

  // const sizeRef = useRef();

  // useLayoutEffect(() => {
  //   if (sizeRef.current) {
  //     setWidth(sizeRef.current.offsetWidth);
  //     setHeight(sizeRef.current.offsetHeight);
  //   }
  // });

  // const [width, setWidth] = useState(0);

  return (
    <>
      {/* <div>ManyQueries</div>
      <div className="test-div">
        <div>{test}</div>
      </div> */}
      <div>Many Details</div>
      <div>
        {userQueriesIndexed.map((many) => (
          <div key={many.data.id}>
            <h3>{many.data.title}</h3>
            <h3>{many.data.original_name}</h3>
          </div>
        ))}
      </div>
    </>
  );
};

/*
<div
  className="horizontal-slider-container"
  // onMouseEnter={() => setIsSliding(false)}
  // onMouseLeave={() => setIsSliding(true)}
  style={{ padding: `${containerPadding}px` }}
>
  <div className="horizontal-slider-crop">
    <div
      className="horizontal-slider-content"
      style={{
        transform: `translateX(-${currentIndex * (100 / itemNumber)}%)`,
        transition: transition ? `all 400ms ease-out` : "none",
      }}
      // onTransitionEnd={() => handleSliderTransition()}
    >
      {userQueriesIndexed.map((item) => (
        <div
          className="horizontal-slider-item"
          key={uuidv4()}
          style={{
            width: `calc((100%  / ${itemNumber})`,
            paddingBlock: `${singlePadding}px`,
          }}
        >
          <p>{item.key} </p>
          <h5>{item.data.title} </h5>
          <h5>{item.data.original_name}</h5>
          {/* <img
            className="vertical-slider-item-image"
            src={`${api.IMG_URL}${item.data.backdrop_path}`}
            alt=""
          /> */

/*{item.data.images.backdrops.slice(0, 1).map((items) => (
            // <div>{items.width}</div>

            <img
              // className="logo-image"
              className="horizontal-slider-item-image"
              src={`${api.IMG_URL}${items.file_path}`}
              alt=""
            />
          ))}

          <p className="horizontal-slider-item-description">
            {item.data.overview}
          </p>
        </div>
      ))}
    </div>
  </div>
</div>


{/* <div
  className={
    horizontal ? "horizontal-slider-container" : "vertical-slider-container"
  }
  style={{ height: `${divHeight}px`, padding: `${containerPadding}px` }}
  // onMouseEnter={() => setIsSliding(false)}
  // onMouseLeave={() => setIsSliding(true)}
>
  <div
    className={horizontal ? `horizontal-slider-crop` : `vertical-slider-crop`}
  >
    <div
      className={
        horizontal ? `horizontal-slider-content` : `vertical-slider-content`
      }
      style={{
        transform: horizontal
          ? `translateX(-${(currentIndex + 1) * (100 / itemNumber)}%)`
          : `translateY(-${(currentIndex + 1) * (100 / itemNumber)}%)`,

        transition: transition ? `all 400ms ease-out` : "none",
      }}
      onTransitionEnd={() => handleTransition()}
    >
      {tripleIndexed.map((item) => (
        <>
          <div
            className={
              horizontal ? `horizontal-slider-item` : "vertical-slider-item"
            }
            key={item.id}
            onClick={() => handleClick(item.key)}
            style={{
              height: `calc((100% / ${itemNumber})`,
              paddingBlock: `${singlePadding}px`,
            }}
          >
            <p>{item.key} </p>
            <h5>{item.title} </h5>
            <h5>{item.original_name}</h5>

            <img
              className={
                horizontal
                  ? `horizontal-slider-item-image`
                  : `vertical-slider-item-image`
              }
              src={`${api.IMG_URL}${item.backdrop_path}`}
              alt=""
            />
          </div>
        </>
      ))}
    </div>
  </div>
</div>; */
