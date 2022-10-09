import "./home.css";

import axios from "axios";

import * as api from "../../api/api";

import { useEffect, useState, useRef, useLayoutEffect } from "react";

import { useQuery, useQueries } from "@tanstack/react-query";
import { get } from "mongoose";

export const TrendingItem = ({ trendingData }) => {
  const sizeRef = useRef();

  const [clickedIndex, setClickedIndex] = useState();

  const [nextIndex, setNextIndex] = useState(0);
  const [start, setStart] = useState(-200);
  const [style, setStyle] = useState({ top: `${start}px` });

  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);

  const sliced = trendingData.results.slice(0, 10);
  const double = [...sliced];

  // console.log(sliced);

  const trendingHeader = sliced[nextIndex];
  const trendingNext = sliced[nextIndex + 1];

  const doubleIndexed = double.map((item, key) => ({ key, ...item }));
  // console.log(doubleIndexed);

  // sliced.push(sliced[0]);
  // sliced.unshift(sliced[sliced.length - 2])
  // const cloned = tempArr.unshift(sliced[sliced.length - 2])

  // console.log(sliced[0]);
  // console.log(sliced[8]);

  const test = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  // const testSlice = test.slice(0,5)
  // console.log(tempArr)
  // console.log(sliced)

  console.log("index" + nextIndex);
  // console.log(double.length);

  const id = trendingData.results[nextIndex].id;
  const type = trendingData.results[nextIndex].media_type;

  useEffect(() => {
    setStyle({ top: `${start}px` });
  }, [start]);

  useLayoutEffect(() => {
    if (sizeRef.current) {
      setWidth(sizeRef.current.offsetWidth);
      setHeight(sizeRef.current.offsetHeight);
    }
  });

  // useEffect(() => {
  //   console.log("effect" + height);
  // }, [height]);

  // console.log("height" + height);

  // console.log(start);
  // console.log(style);

  const nextFunction = () => {
    setNextIndex(nextIndex + 1);
    setStart(start - height);

    if (nextIndex === double.length / 2 - 1) {
      setNextIndex(0);
      setStart(-height);
    }
  };

  const handleClick = (item) => {
    // {setClickedIndex(event.target.id)}
    setNextIndex(item);
    setStart(-height * (item + 1));
    console.log("key" + item);
  };

  // useEffect(()=>{
  //   console.log("clicked" + clickedIndex)

  //   setClickedIndex(clickedIndex)
  // })

  const previousFunction = () => {
    setNextIndex(nextIndex - 1);
    setStart(start + height);
    if (nextIndex === 0) {
      setNextIndex(double.length / 2 - 1);
      setStart((-height * double.length) / 2);
    }
  };


  // const getManyDetails = (id, type) => {
  //   return axios.get(
  //     `https://api.themoviedb.org/3/${type}/${id}?api_key=d4208ada7ca0b82909b61d7d3afd76fa&append_to_response=videos,images`
  //   );
  // };


  const userQueries = useQueries({
    queries: sliced.map((movie) => {
      return {
        queryKey: ["getManyDetails", movie.id, movie.media_type],
        queryFn: () => api.getDetails(movie.id, movie.media_type), 
        
      };
    }),
  });

  console.log(userQueries);


  if (userQueries.some(query => query.isLoading)) {
    return <h2>"Loading"</h2>;
  }

  return (
    <>
      <div>Many Details</div>

      <div>
        {userQueries.map((many) => (
          <div>
            <h3>{many.data.title}</h3>
            <h3>{many.data.original_name}</h3>

          </div>
        ))}
      </div>

      <div>TrendingItem</div>

      <div>
        <h3 className="trending-header__title">{trendingHeader.title}</h3>
        <img src={`${api.IMG_URL}${trendingHeader.backdrop_path}`} alt="" />
      </div>

      <div>TrendingNext</div>

      <div>
        <h3>{trendingNext.title}</h3>
        <img src={`${api.IMG_URL}${trendingNext.backdrop_path}`} alt="" />
      </div>

      <div className="small-list-container">
        <div className="small-list-slider" style={style}>
          {doubleIndexed.map((item) => (
            <>
              <div
                className="small-list-item"
                key={item.id}
                ref={sizeRef}
                onClick={() => handleClick(item.key)}
              >
                {/* <p >{item.key} </p> */}
                <h5>{item.title} </h5>
                <h5>{item.original_name}</h5>

                <img
                  className="small-list-image"
                  src={`${api.IMG_URL}${item.backdrop_path}`}
                  alt=""
                />
              </div>
            </>
          ))}
        </div>
      </div>

      <button onClick={previousFunction}>Previous</button>
      <button onClick={nextFunction}>Next</button>
    </>
  );
};
