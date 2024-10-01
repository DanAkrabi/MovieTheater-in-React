import AppLayout from "./pages/AppLayout.jsx";
import PageNotFound from "../services/ui/PageNotFound.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import useMovies from "../services/custom-hooks/useMovies.jsx";
import React from "react";
import { useLocalStorageState } from "../services/custom-hooks/useLocalStorageState.jsx";
import MoviesContext from "../services/context/MoviesContext.jsx";
import QueryContext from "../services/context/QueryContext.jsx";
import LikedMoviesContext from "../services/context/LikedMoviesContext.jsx";
import StarContext from "../services/context/StarContext.jsx";
import MovieList from "./components/MovieList.jsx";
function App() {
  const [isActive, setIsActive] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [showLikedMovies, setShowLikedMovies] = useState(false);
  const [likedButton, setLikedButton] = useState(false); //maybe we should do it inside DetailsBox.jsx
  const [starRating, setStarRating] = useLocalStorageState({}, "movieRating");
  const [isHamburgerActive, setIsHamburgerActive] = useState(false);

  const [likedMovieID, setLikedMovieID] = useState(null);
  const { movies, isLoading, setMovies, foundMovie, setFoundMovie } =
    useMovies(query); //custom hook
  const [likedMovies, setLikedMovies] = useLocalStorageState([], "likedMovies"); //for liked button
  function handleSelectMovie(id) {
    console.log(id);
    setSelectedId((selectedId) => (id == selectedId ? null : id));
  }

  function handleCloseMovie() {
    console.log("activated");
    if (selectedId !== null) {
      setSelectedId(null);
    }

    if (likedMovieID !== null) {
      setLikedMovieID(null);
    }
  }

  function closeLikedMovie() {
    setLikedMovieID(null);
  }

  function handleAddLikedMovies(movie) {
    //this handle func is for liked button to determined if to show '+' or'-""
    //if the id already exist in the array, statement will return true and will enter the scope
    if (likedMovies.some((likedMovie) => likedMovie.imdbID === movie.imdbID)) {
      console.log(`removing ${movie} from liked list`);
      setLikedMovies((prevLikedMovies) =>
        prevLikedMovies.filter(
          (likedMovie) => likedMovie.imdbID !== movie.imdbID
        )
      );
      setLikedButton(!likedButton); //we should maybe do it inside of DetailsBox.jsx
      closeLikedMovie();
      return;
    }
    setLikedButton(!likedButton); //we should maybe do it inside of DetailsBox.jsx
    console.log(movie);
    setLikedMovies((prevLikedMovies) => [...prevLikedMovies, movie]);
  }
  function handleStarRating(movieID, rating) {
    setStarRating((prevRatings) => {
      if (prevRatings[movieID] === rating) {
        const newRatings = { ...prevRatings };
        delete newRatings[movieID];
        return newRatings;
      }
      return {
        ...prevRatings,
        [movieID]: rating,
      };
    });
  }

  function handleSelectLikedMovie(id) {
    console.log(id);
    setLikedMovieID((likedMovieID) => (id == likedMovieID ? null : id));
    console.log(likedMovieID);
  }

  function onDeleteAllMovies() {
    setLikedMovies([]);
  }

  return (
    <StarContext.Provider value={{ starRating, handleStarRating }}>
      <LikedMoviesContext.Provider
        value={{
          handleAddLikedMovies,
          handleSelectLikedMovie,
          likedMovies,
          likedButton,
          likedMovieID,
          setLikedButton,
          onDeleteAllMovies,
          setIsHamburgerActive,
          isHamburgerActive,
        }}
      >
        <QueryContext.Provider value={{ query, setQuery }}>
          <MoviesContext.Provider
            value={{
              movies,
              isActive,
              setIsActive,
              foundMovie,
              setMovies,
              selectedId,
              handleSelectMovie,
              handleCloseMovie,
              setFoundMovie,
            }}
          >
            <BrowserRouter basename="/MovieTheater-in-React">
              <Routes>
                {/* <Route path="/" element={<Homepage />} /> */}
                <Route
                  path="/"
                  element={
                    <AppLayout
                      className="app-layout"
                      isLoading={isLoading}
                      showLikedMovies={showLikedMovies}
                      setShowLikedMovies={setShowLikedMovies}
                    />
                  }
                >
                  <Route path="movies" element={<MovieList />} />
                </Route>
                <Route path="*" element={<PageNotFound />} />
                <Route />
              </Routes>
            </BrowserRouter>
          </MoviesContext.Provider>
        </QueryContext.Provider>
      </LikedMoviesContext.Provider>
    </StarContext.Provider>
  );
}

export default App;
