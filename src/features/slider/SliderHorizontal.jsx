import "../../pages/home/home.css";

import * as api from "../../api/api";

import { v4 as uuidv4 } from "uuid";

export const SliderHorizontal = ( {
  trendingDataIndexed,
  divHeight,
  itemNumber,
  singlePadding,
  currentIndex,
  containerPadding,
  handleClick,
  handleTransition,
  transition,
}) => {


  
  return (
    <>
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
              transition: transition ? `all 300ms ease-out` : "none",
            }}
            // onTransitionEnd={() => handleSliderTransition()}
            onTransitionEnd={() => handleTransition()}
          >
            {trendingDataIndexed.map((item) => (
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
                  className="horizontal-slider-item-image"
                  src={`${api.IMG_URL}${item.backdrop_path}`}
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

                {/* <p className="horizontal-slider-item-description">
                  {item.data.overview}
                </p> */}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
