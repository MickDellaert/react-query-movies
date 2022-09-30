import { keyboard } from "@testing-library/user-event/dist/keyboard";
import axios from "axios";

const BASE_URL = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
});

export const IMG_URL = "https://image.tmdb.org/t/p/w500/"

export const getPopular = async () => {
  const response = await BASE_URL.get(
    `movie/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`
  );
  return response.data;
};

export const getTrending = async () => {
  const response = await BASE_URL.get(
    `trending/all/week?api_key=${process.env.REACT_APP_API_KEY}`
  );
  return response.data;
};


export const getMovies = async ({queryKey}) => {
  console.log(queryKey)
  // const [key, url] = queryKey;
  const url = queryKey[1];

  const response = await BASE_URL.get(
    url
  );
  return response.data;
};

