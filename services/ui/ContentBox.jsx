import React from "react";

import { Outlet } from "react-router-dom";
import "./ContentBox.css";
import { useContext } from "react";
import Loader from "./Loader";
import DetailsBox from "../../src/components/DetailsBox";
import "./Loader.css";
import "../../src/components/MovieList.css";
// import LikedMovieList from "./LikedMovieList.jsx";
import MoviesContext from "../context/MoviesContext.jsx";
import QueryContext from "../context/QueryContext.jsx";
import LikedMoviesContext from "../context/LikedMoviesContext.jsx";
import LikedMovieList from "../../src/components/LikedMovieList.jsx";
const notFoundMsg = <p className="contentbox-msg">❌Movie not found❌</p>;

//could've done it without contentbox - need to check.
export default function ContentBox({ isLoading, showLikedMovies }) {
  const { query } = useContext(QueryContext);
  const { movies, foundMovie, selectedId } = useContext(MoviesContext);
  const { likedMovieID, likedMovies } = useContext(LikedMoviesContext);

  const minHeight =
    movies.length > 0 ? 150 * Math.ceil(movies.length / 3) : 650;

  return (
    <div className="content-box" style={{ minHeight: `${minHeight}px` }}>
      {query.length < 3 && !showLikedMovies && (
        <p className="contentbox-msg">You need to search a movie first</p>
      )}

      {showLikedMovies ? (
        <>
          {likedMovies.length === 0 && (
            <p className="contentbox-msg">Movie list is empty</p>
          )}

          <LikedMovieList likedMovies={likedMovies} />
          {likedMovieID && <DetailsBox selectedId={likedMovieID} />}
        </>
      ) : (
        <>
          {foundMovie ? (
            notFoundMsg //case movie isn't found - will appear in the UI if foundMovie === true
          ) : isLoading ? (
            <span className="loader">
              <Loader />
            </span>
          ) : (
            <Outlet />
          )}
          {selectedId && <DetailsBox selectedId={selectedId} />}
        </>
      )}
    </div>
  );
}
