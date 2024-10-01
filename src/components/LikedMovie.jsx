import { useContext } from "react";
import "./Movie.css";
import React from "react";
import LikedMoviesContext from "../../services/context/LikedMoviesContext";
import StarContext from "../../services/context/StarContext";
export default function LikedMovie({ movie }) {
  const { handleSelectLikedMovie } = useContext(LikedMoviesContext);
  const { starRating } = useContext(StarContext);
  return (
    <li
      className="movie-item"
      onClick={() => handleSelectLikedMovie(movie.imdbID)}
      title={movie.Title}
    >
      <h4 className="movie-title">{movie.Title}</h4>
      {/* starRating will appear only if the movie has a rating*/}
      {starRating[movie.imdbID] && (
        <p className="movie-rating">
          ⭐
          <span
            className={
              starRating[movie.imdbID] === 10
                ? "movie-rating-number10" //did this 'if' to fix the problem that if the rating is 10 its not centered.
                : "movie-rating-number"
            }
          >
            <strong>{starRating[movie.imdbID]}</strong>
          </span>
        </p>
      )}
      <img
        className="movie-img"
        src={movie.Poster}
        alt={`${movie.Title} poster`}
      />
      <div>
        <p>
          <span className="movie-year">Release date: {movie.Year}</span>
        </p>
      </div>
    </li>
  );
}
