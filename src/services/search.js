import axios from "axios";
const TMDB_API = "https://api.themoviedb.org/3";
const TMDB_KEY = process.env.REACT_APP_TMDB_KEY;

export const fullTextSearch = async (query) => {
  const response = await axios.get(`${TMDB_API}/search/movie?api_key=${TMDB_KEY}&query=${query}`);
  return response.data.results;
};

export const getMovie = async (movieId) => {
  const response = await axios.get(`${TMDB_API}/movie/${movieId}?api_key=${TMDB_KEY}&language=en-US`);
  return response.data;
};