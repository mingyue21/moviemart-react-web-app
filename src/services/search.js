import axios from "axios";
const TMDB_API = "https://api.themoviedb.org/3";
const TMDB_KEY = "92d4a2332e17911c7de8cdb736087546"

export const fullTextSearch = async (query) => {
  const response = await axios.get(`${TMDB_API}/search/movie?api_key=${TMDB_KEY}&query=${query}`);
  return response.data.results;
};

export const getMovie = async (movieId) => {
  const response = await axios.get(`${TMDB_API}/movie/${movieId}?api_key=${TMDB_KEY}&language=en-US`);
  return response.data;
};