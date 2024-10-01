import { useContext } from "react";
import "./SearchBar.css";
import React from "react";
import { useEffect } from "react";
import { useRef } from "react";
import QueryContext from "../../services/context/QueryContext";
import LikedMoviesContext from "../../services/context/LikedMoviesContext";
import MoviesContext from "../../services/context/MoviesContext";
function SearchBar({ showLikedMovies, setShowLikedMovies }) {
  // const { showLikedMovies, setShowLikedMovies } =
  // useContext(LikedMoviesContext);
  const { setQuery } = useContext(QueryContext);
  const { setFoundMovie } = useContext(MoviesContext);
  const { isHamburgerActive, setIsHamburgerActive } =
    useContext(LikedMoviesContext);
  const inputEl = useRef(null);

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.code === "Enter") {
        e.preventDefault(); // Prevent the default form submit behavior
        setQuery(""); // Clear the query state
        inputEl.current.value = ""; // Clear the input field
        setFoundMovie(false);
        inputEl.current.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [setQuery]);

  function handleSearch(e) {
    e.preventDefault();
    setQuery(e.target.value);

    if (showLikedMovies) setShowLikedMovies(false);
    if (isHamburgerActive) setIsHamburgerActive(false);
  }

  return (
    <div className="search-container">
      <input
        className="search"
        type="text"
        placeholder="Search a movie"
        onChange={(e) => handleSearch(e)}
        ref={inputEl}
      ></input>
      {/* <Button className="search-bar-btn">Search</Button> */}
    </div>
  );
}

export default SearchBar;
