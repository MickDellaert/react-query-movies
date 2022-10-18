import { SearchContainer } from "../../components/SearchContainer";
import { SliderData } from "../../features/slider/SliderData";
import { SliderVertical } from "../../features/slider/SliderVertical";
import { SliderFetcher } from "../../features/slider/SliderFetcher";

export const Home = () => {
  return (
    <>
      <div>Home</div>
      <SearchContainer />
      {/* <SliderData></SliderData>
      <SliderData /> */}

      <SliderFetcher />

      {/* <Trending /> */}
    </>
  );
};
