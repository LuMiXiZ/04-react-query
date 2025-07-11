import axios from "axios";
import type { Movie } from "../types/movie";

interface MovieSearchResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

const BASE_URL = "https://api.themoviedb.org/3/search/movie";

export async function fetchMovies(query: string): Promise<Movie[]> {
  try {
    const response = await axios.get<MovieSearchResponse>(BASE_URL, {
      params: {
        query,
        include_adult: false,
        language: "en-US",
        page: 1,
      },
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
      },
    });

    return response.data.results;
  } catch (error) {
    console.error("Failed to fetch movies:", error);
    throw error;
  }
}
