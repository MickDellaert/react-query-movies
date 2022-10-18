import "../../pages/home/home.css";

import * as api from "../../api/api";

export const SliderVertical = ({
  tripleIndexed,
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
    </>
  );
};
