const API_KEY = "8e902d8f";
const BASE_URL = "https://www.omdbapi.com/";


// Search movies
export async function searchMovies(query) {
  const url =
    BASE_URL +
    "?apikey=" +
    encodeURIComponent(API_KEY) +
    "&s=" +
    encodeURIComponent(query) +
    "&type=movie";

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Movie service is not available right now.");
  }

  const data = await response.json();

  if (data.Response === "False") {
    throw new Error(data.Error || "No movies found.");
  }

  return data.Search || [];
}


// Get details of one movie
export async function getMovieDetails(imdbId) {
  const url =
    BASE_URL +
    "?apikey=" +
    encodeURIComponent(API_KEY) +
    "&i=" +
    encodeURIComponent(imdbId) +
    "&plot=full";

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Movie details could not be loaded.");
  }

  const data = await response.json();

  if (data.Response === "False") {
    throw new Error(data.Error || "Movie details not found.");
  }

  return data;
}