import { useContext, useEffect, useState } from "react";
import MoviesContext from "../../services/context/MoviesContext.jsx";
import StarContext from "../../services/context/StarContext.jsx";
import "./DetailsBox.css";
import StarRating from "../../services/ui/StarRating.jsx";
import Loader from "../../services/ui/Loader";
import React from "react";
import LikedMoviesContext from "../../services/context/LikedMoviesContext.jsx";
const KEY = "897516df";

export default function DetailsBox({ selectedId }) {
  const [movieDetails, setMovieDetails] = useState({}); // Initialize with an empty object
  const [detailsLoading, setDetailsLoading] = useState(false); //loader for the movie details box
  const { handleCloseMovie } = useContext(MoviesContext);
  const {
    likedMovies,
    likedMovieID,
    setLikedButton,
    likedButton,
    handleAddLikedMovies,
  } = useContext(LikedMoviesContext);
  const { starRating, handleStarRating } = useContext(StarContext);
  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
    imdbID,
  } = movieDetails;

  useEffect(() => {
    const controller = new AbortController();

    async function getMovieDetails() {
      try {
        setDetailsLoading(true);
        const res = await fetch(
          `https://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`,
          { signal: controller.signal }
        );
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        if (data.Response === "False")
          throw new Error("Movie fetch for details box has failed");
        setMovieDetails(data);
        setDetailsLoading(false);
      } catch (error) {
        console.error("Error fetching movie details:", error.message);
      }
    }

    if (selectedId) {
      getMovieDetails();
    }

    return function () {
      //clean up function
      controller.abort();
    };
  }, [selectedId]);

  if (!movieDetails) return null;

  useEffect(
    function () {
      if (!title) return;
      document.title = `Movie | ${title}`;
      return function () {
        document.title = "Movie Theater";
      };
    },
    [title]
  );

  useEffect(() => {
    //useKey didint work
    function handleKeyDown(e) {
      if (e.code === "Escape") {
        e.preventDefault(); // Prevent the default form submit behavior
        handleCloseMovie();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [selectedId, likedMovieID]);

  function isMovieLiked(imdbID) {
    return likedMovies.some((movie) => movie.imdbID === imdbID);
  }

  useEffect(() => {
    //should've made an instance inside every movie instead of looping everytime
    const isLiked = isMovieLiked(movieDetails.imdbID);
    setLikedButton(isLiked);
  }, [movieDetails, likedMovies]);

  const styles = { fontSize: "12px" };
  return (
    <div className="details-box">
      <button
        title="close movie details"
        className="btn-back"
        onClick={handleCloseMovie}
      >
        &larr;
      </button>
      <button
        title={
          likedButton ? "remove movie from your list" : "add movie to your list"
        }
        // key={movieDetails.title} need to fix
        className="btn-add-to-list"
        onClick={() => handleAddLikedMovies(movieDetails)}
      >
        {likedButton ? "-" : "+"}
      </button>
      {detailsLoading ? (
        <span className="loader">
          <Loader />
        </span>
      ) : (
        <>
          <div className="grid-container">
            <header className="title">
              <strong>{title}</strong>
            </header>
            <img
              className="img"
              src={poster}
              alt={`Poster of ${movieDetails}`}
            />
            <div className="details-overview ">
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                {imdbRating} <span>⭐</span> IMDb rating
              </p>

              {/* {Rating > 0 ? `you rated with ${movieRating}` : ""} */}
            </div>
            <StarRating
              className="rating"
              maxRating={10}
              size={18}
              onSetRating={(rating) =>
                handleStarRating(movieDetails.imdbID, rating)
              }
            />
            {starRating[movieDetails.imdbID] > 0 ? (
              <p className="rating-msg" style={styles}>
                You rated this movie{" "}
                <strong>{starRating[movieDetails.imdbID]}</strong> ⭐
              </p>
            ) : (
              <p className="rating-msg" style={styles}>
                you havent rated this movie yet.
              </p>
            )}
            <section className="movie-desc">
              <p>
                <em>{plot}</em>
              </p>
              <p>Starring {actors}</p>
              <p>Directed by {director}</p>
            </section>
          </div>
        </>
      )}
    </div>
  );
}
