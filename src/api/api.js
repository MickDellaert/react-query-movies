import axios from "axios";

const API_KEY = process.env.REACT_APP_API_KEY;

const BASE_URL = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
});

export const IMG_URL = "https://image.tmdb.org/t/p/w500/";

export const getPopular = () => getMovies(`movie/popular?api_key=${API_KEY}`);

export const getTrending = () =>
  getMovies(`trending/all/week?api_key=${API_KEY}&append_to_response=videos`);

export const queryMovies = ({ queryKey }) => {
  const movieQuery = queryKey[1];
  return getMovies(
    `search/movie?api_key=${API_KEY}&language=en-US&query=${movieQuery}&page=1&include_adult=false`
  );
};

export const queryTv = ({ queryKey }) => {
  const movieQuery = queryKey[1];
  return getMovies(
    `search/tv?api_key=${API_KEY}&language=en-US&query=${movieQuery}&page=1&include_adult=false`
  );
};

export const getDetails = (id, type) => {
  return getMovies(
    `${type}/${id}?api_key=${API_KEY}&append_to_response=videos,images`
  );
};

// export const getMovieDetails = (id) => {
//   return getMovies(
//     `movie/${id}?api_key=${API_KEY}&append_to_response=videos,images`
//   );
// };

// export const getManyDetails = async (id, type) => {
//   const response = await BASE_URL.get(
//     `${type}/${id}?api_key=${API_KEY}&append_to_response=videos,images`
//   );
  
//   return response.data;
// };

export const getConfig = () => getMovies(`configuration?api_key=${API_KEY}`);

const getMovies = async (url) => {
  const response = await BASE_URL.get(url);
  return response.data;
};
