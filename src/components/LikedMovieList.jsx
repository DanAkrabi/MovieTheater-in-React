import LikedMovie from "./LikedMovie.jsx";
import "./MovieList.css";
import React from "react";

export default function LikedMovieList({ likedMovies }) {
  return (
    <ul className="movies-container">
      {likedMovies.map((movie) => (
        <LikedMovie key={movie.imdbID} movie={movie} />
      ))}
    </ul>
  );
}
