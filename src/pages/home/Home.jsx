import { SearchContainer } from "../../components/SearchContainer";
import { SliderData } from "../../features/slider/SliderData";
import { SliderVertical } from "../../features/slider/SliderVertical";
import { SliderFetcher } from "../../features/slider/SliderFetcher";
import { SliderHorizontal } from "../../features/slider/SliderHorizontal";

import { useQuery } from "@tanstack/react-query";
import * as api from "../../api/api";
import useSlider from "../../hooks/useSlider";
import { ManyQueries } from "./ManyQueries";
import { Movies } from "../../components/Movies";

export const Home = () => {
  return (
    <>
      <div>Home</div>
      <SearchContainer />

      {/* <SliderData></SliderData>
      <SliderData /> */}

      <SliderFetcher />
      {/* <Movies/> */}

      {/* <Trending /> */}
      <ManyQueries/>
    </>
  );
};
