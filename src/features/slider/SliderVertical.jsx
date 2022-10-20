import "../../pages/home/home.css";

import * as api from "../../api/api";

export const SliderVertical = (
  {
    trendingDataIndexed,
    currentIndex,
    transition,
    skipFirst,
    handleClick,
    handleTransition,
    divHeight,
    itemNumber,
    singlePadding,
    containerPadding,
    horizontal,
    translate,
  }
) => {

  return (
    <>
      <div
        className={
          horizontal
            ? "horizontal-slider-container"
            : "vertical-slider-container"
        }
        style={{ height: `${divHeight}px`, padding: `${containerPadding}px` }}
        // onMouseEnter={() => setIsSliding(false)}
        // onMouseLeave={() => setIsSliding(true)}
      >
        <div
          className={
            horizontal ? `horizontal-slider-crop` : `vertical-slider-crop`
          }
        >
          <div
            className={
              horizontal
                ? `horizontal-slider-content`
                : `vertical-slider-content`
            }
            style={{
              transform: horizontal
                ? `translateX(-${
                    (currentIndex + skipFirst) * (100 / itemNumber)
                  }%)`
                : `translateY(-${
                    (currentIndex + skipFirst) * (100 / itemNumber)
                  }%)`,

              transition: transition ? `all 300ms ease-out` : "none",
            }}
            onTransitionEnd={() => handleTransition()}
          >
            {trendingDataIndexed.map((item) => (
              <>
                <div
                  className={
                    horizontal
                      ? `horizontal-slider-item`
                      : "vertical-slider-item"
                  }
                  key={item.id}
                  onClick={() => handleClick(item.key)}
                  style={{
                    height: `calc((100% / ${itemNumber})`,
                    paddingBlock: `${singlePadding}px`,
                  }}
                >
                  <p>{item.key} </p>
                  <h5>{item.data.title} </h5>
                  <h5>{item.data.original_name}</h5>

                  <img
                    className={
                      horizontal
                        ? `horizontal-slider-item-image`
                        : `vertical-slider-item-image`
                    }
                    src={`${api.IMG_URL}${item.data.backdrop_path}`}
                    alt=""
                  />
                </div>
              </>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
