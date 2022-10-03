import { useQuery } from "@tanstack/react-query";

import { useEffect } from "react";


import { useParams } from "react-router-dom";

import * as api from "../api/api";

export const MovieDetails = ({type, setType}) => {
  const { id } = useParams();
  const movieId = "movie/" + id;

  console.log(id);
  console.log(movieId);



  // const { data: movieDetails, isLoading: movieDetailsLoading } = useQuery(
  //   ["getMovieDetails", id, type],
  //   () => api.getMovieDetails(id, type),
  //   {
  //     enabled: type === "movie",
  //   }
  // );

  // const { data: tvDetails, isLoading: tvDetailsLoading } = useQuery(
  //   ["getTvDetails", id, type],
  //   () => api.getTvDetails(id, type),
  //   {
  //     enabled: type === "tv",
  //   }
  // );

  const { data: details, isLoading: detailsLoading } = useQuery(
    ["getDetails", id, type],
    () => api.getDetails(id, type),
    // {
    //   enabled: type !== "",
    // }
  );

  if (detailsLoading) {
    return <h2>"Loading"</h2>;
  }

  return (
    <>
      <h3>Details</h3>
      {details.title && <h2>{details.title}</h2>}
      {details.original_name && <h2>{details.original_name}</h2>}
    </>
  );
};

// 760161
