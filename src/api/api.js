import axios from "axios";

const BASE_URL = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
});

export const getPopular = async () => {
  const response = await BASE_URL.get(
    `movie/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`
  );
  return response.data;
};
