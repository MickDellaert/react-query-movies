import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getPopular, getTrending, getMovies, IMG_URL } from "../api/api";

export const Movies = () => {
  // const queryClient = useQueryClient()

  const { isLoading, data } = useQuery(["trending-movies", `trending/all/week?api_key=d4208ada7ca0b82909b61d7d3afd76fa`], getMovies);
  const { isLoading: popularLoading, data: popularData } = useQuery(
    [
      "popular-movies",
      `movie/popular?api_key=d4208ada7ca0b82909b61d7d3afd76fa&language=en-US&page=1`,
    ],
    getMovies
  );

  if (isLoading) {
    return <h2>Loading</h2>;
  }
  console.log(data.results);

  return (
    <>
      <h2>Popular Movies</h2>
      {popularData?.results.map((popular) => (
        <div key={popular.id}>
          <h3>{popular.title}</h3>
          <img src={`${IMG_URL}${popular.poster_path}`} />
        </div>
      ))}

      <h2>Trending Movies</h2>
      {data?.results.map((popular) => (
        <div key={popular.id}>
          <h3>{popular.title}</h3>
          <img src={`${IMG_URL}${popular.poster_path}`} />
        </div>
      ))}
    </>
  );
};
