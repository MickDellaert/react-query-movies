import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getPopular } from "../api/api";

export const Movies = () => {
  // const queryClient = useQueryClient()

  const { isLoading, data } = useQuery(["popular-movies"], getPopular);

  if (isLoading) {
    return <h2>Loading</h2>;
  }
  console.log(data.results);

  return (
    <>
      <h2>Popular Movies</h2>
      {data.results.map((popular) => {
        return <h3 key={popular.id}>{popular.original_title}</h3>;
      })}
    </>
  );
};
