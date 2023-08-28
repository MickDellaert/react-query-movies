import { SearchContainer } from "../../components/SearchContainer";
import { SliderFetcher } from "../../features/slider/SliderFetcher";
import { ManyQueries } from "./ManyQueries";

export const Home = () => {
  return (
    <>
      <SearchContainer />
      <SliderFetcher />
      <ManyQueries/>
    </>
  );
};
