// import ContentBox from "C:\\Users\\avner\\OneDrive\\Desktop\\ReactProjects\\MovieTheater\\services\\ui\\ContentBox.jsx";
import ContentBox from "../../services/ui/ContentBox.jsx";
import Header from "../../services/ui/Header.jsx";
import SearchBar from "../../src/features/SearchBar";
import { useState, useContext } from "react";
import Button from "../../services/ui/Button.jsx";
import "../../services/ui/Button.css";
import { useNavigate } from "react-router-dom";
import "./AppLayout.css";
import React from "react";
import MoviesContext from "../../services/context/MoviesContext.jsx";
import LikedMoviesContext from "../../services/context/LikedMoviesContext.jsx";

function AppLayout({ isLoading, showLikedMovies, setShowLikedMovies }) {
  const { isActive, setIsActive } = useContext(MoviesContext);
  const {
    onDeleteAllMovies,
    likedMovies,
    isHamburgerActive,
    setIsHamburgerActive,
  } = useContext(LikedMoviesContext); //to delete all liked movies
  const navigate = useNavigate();

  return (
    <div className="app-layout">
      <Header className="title">
        {showLikedMovies ? "• Your Movies •" : "Movie Theater"}
      </Header>

      {isActive && (
        <>
          <nav
            className="btn btn-liked-movies"
            title={
              showLikedMovies ? "hide your movies list" : "show your movie list"
            }
            onClick={() => {
              setShowLikedMovies(!showLikedMovies);
              setIsHamburgerActive(!isHamburgerActive); // Toggle hamburger button state
            }}
          >
            {/* {showLikedMovies ? "Hide My Movies" : "Show My Movies"} */}
            <div
              className={`hamburger-button ${
                isHamburgerActive ? "active" : ""
              }`}
            >
              <span></span>
              <span></span>
              <span></span>
            </div>
          </nav>
          {showLikedMovies && likedMovies.length > 0 && (
            <button
              className="btn btn-delete-liked-movies-icon"
              onClick={() => onDeleteAllMovies()}
              title="delete your movie list"
            >
              <div className="lid"></div>
              <div className="lidcap"></div>
              <div className="bin">
                <div className="c cut1"></div>
                <div className="c cut2"></div>
              </div>
            </button>
          )}
          <SearchBar
            className="search-bar"
            showLikedMovies={showLikedMovies}
            setShowLikedMovies={setShowLikedMovies}
          />
          <ContentBox
            className="container-box"
            isLoading={isLoading}
            showLikedMovies={showLikedMovies}
          />
          {/*transfering isLoading as a prop for optimization*/}
        </>
      )}
      {!isActive && (
        <>
          <p className="web-desc">
            MovieTheater.com lets you explore all kind of movies, enjoy 😊
          </p>

          <Button
            onClick={() => (setIsActive(!isActive), navigate("/movies"))}
            className={"btn-start"}
          >
            ✨ Explore Movies ✨
          </Button>
        </>
      )}
    </div>
  );
}

export default AppLayout;
