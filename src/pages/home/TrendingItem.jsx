import "./home.css";

import * as api from "../../api/api";

import { useEffect } from "react";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export const TrendingItem = ({ trendingData }) => {
  const [nextIndex, setNextIndex] = useState(0);
  const [start, setStart] = useState(-220);
  const [style, setStyle] = useState({ top: `${start}px` });

  const trendingHeader = trendingData.results[nextIndex];
  const trendingNext = trendingData.results[nextIndex + 1];

  const sliced = trendingData?.results.slice(0, 7);
  const double = [...sliced, ...sliced];

  const id = trendingData.results[nextIndex].id;
  const type = trendingData.results[nextIndex].media_type;


  useEffect(() => {
    setStyle({ top: `${start}px` });
  }, [start]);

  console.log(start);
  console.log(style);

  const nextFunction = () => {
    if (nextIndex < 5) {
      setNextIndex(nextIndex + 1);
      setStart(start - 220);
    }

    if (nextIndex === 5) {
      setNextIndex(0);
      setStart(start + 1100);
    }
  };

  const previousFunction = () => {
    if (nextIndex > 0) {
      setNextIndex(nextIndex - 1);
      setStart(start + 220);
    }
    if (nextIndex === 0) {
      setNextIndex(5);
      setStart(start - 1100);
    }
  };


  const { data: details, isLoading: detailsLoading } = useQuery(
    ["getDetails", id, type],
    () => api.getDetails(id, type)

  );

  if (detailsLoading) {
    return <h2>"Loading"</h2>;
  }

  return (
    <>
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
          {double.map((item) => (
            <>
              <div className="small-list-item" key={item.id} >
                <h3>{item.title}</h3>
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
