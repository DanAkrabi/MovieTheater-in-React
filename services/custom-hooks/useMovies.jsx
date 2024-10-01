import { useEffect, useState } from "react";

const KEY = "897516df";

export default function useMovies(query) {
  //custom hook
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [foundMovie, setFoundMovie] = useState(false); //default is false cause we didint find a movie yet

  useEffect(() => {
    //need to add the abort functionality
    async function fetchMovies() {
      setIsLoading(true);
      setFoundMovie(false); // Reset the foundMovie state initially for each new search

      try {
        const res = await fetch(
          `https://www.omdbapi.com/?apikey=${KEY}&s=${query}`
        );
        if (!res.ok) {
          throw new Error("Failed to fetch");
        }

        const data = await res.json();
        if (data.Response === "False") {
          setFoundMovie(true); // Set foundMovie to true only if no movies found and query is valid
          throw new Error("Movie not found");
        }

        setMovies(data.Search); // Set the movies from the fetched data
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setIsLoading(false);
      }
    }

    if (query.length >= 3) {
      fetchMovies();
    } else {
      setMovies([]); // Clear the movies if the query is less than 3 characters
      setFoundMovie(false); // Ensure foundMovie is false to avoid showing "not found" message
    }
  }, [query]); // Depend on `query` to re-run the effect when it changes

  return {
    movies,
    isLoading,
    setMovies,
    foundMovie,
    setFoundMovie,
  };
}
