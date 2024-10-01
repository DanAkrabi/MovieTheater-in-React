import { useContext } from "react";
import Movie from "./Movie.jsx";
import "./MovieList.css";
import MoviesContext from "../../services/context/MoviesContext.jsx";
import React from "react";

export default function MovieList() {
  const { movies } = useContext(MoviesContext);
  return (
    <ul className="movies-container">
      {movies?.map((movie) => (
        <Movie movie={movie} key={movie.imdbID} />
      ))}
    </ul>
  );
}
