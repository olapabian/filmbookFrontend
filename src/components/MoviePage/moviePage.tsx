import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { MovieInfoDto } from "../../Helpers/search_helper";
import {
  getMovieInfoById,
  getMoviePosterById,
} from "../../Helpers/movie_helper";
import "./moviePage.scss";
import Home from "../Home/home";
import MoviePhotos from "./MoviePhotos/moviePhotos";
const MoviePage: React.FC = () => {
  const { movieId } = useParams<{ movieId: string }>();
  const [movieInfo, setMovieInfo] = useState<MovieInfoDto | null>(null);
  const [moviePoster, setMoviePoster] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchMovieInfo = async () => {
    if (movieId) {
      try {
        const response = await getMovieInfoById(movieId);
        setMovieInfo(response.data);
        setError(null);
      } catch (error) {
        console.error("Error fetching movie data:", error);
        setError("Error fetching movie data");
      }
    }
  };

  const fetchMoviePoster = () => {
    if (movieId) {
      getMoviePosterById(movieId)
        .then((response) => {
          setMoviePoster(URL.createObjectURL(response.data));
        })
        .catch((error) => {
          console.error("Error fetching movie poster: ", error);
        });
    }
  };

  useEffect(() => {
    fetchMovieInfo();
    fetchMoviePoster();
  }, [movieId]);

  return (
    <>
      <Home isOtherPage={true} isMyPage={false} />
      <div className="main-div-movie-page">
        <div className="left-side"></div>
        <div className="movie-page-container">
          <div className="movie-info">
            {moviePoster && (
              <img className="movie-poster" src={moviePoster} alt="" />
            )}
            <div className="movie-details">
              {movieInfo ? (
                <div>
                  <h2>{movieInfo.title}</h2>
                  <h3>{movieInfo.releaseYear}</h3>
                  <p>{movieInfo.overview}</p>
                </div>
              ) : (
                <p>Loading...</p>
              )}
            </div>
          </div>
          <MoviePhotos />
          <div className="reviews-nav"></div>
          {/* komponent z recenzajmi znajomych i wszystimi */}
        </div>
        <div className="right-side"></div>
      </div>
    </>
  );
};

export default MoviePage;
