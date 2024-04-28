import React, { FC, useState } from "react";
import Home from "../../home";
import { useNavigate, useLocation } from "react-router-dom";
import { MovieInfoDto } from "../../../../Helpers/search_helper";
import "./resultPageMovie.scss";
import { getMoviePosterById } from "../../../../Helpers/movie_helper";
interface ResultPageMovieProps {}

const ResultPageMovie: FC<ResultPageMovieProps> = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const results: MovieInfoDto[] = location.state?.results || [];
  const [moviePosters, setMoviePosters] = useState<{
    [movieId: string]: string | null;
  }>({});
  const fetchMoviePoster = (movieId: string) => {
    if (movieId) {
      getMoviePosterById(movieId)
        .then((response) => {
          setMoviePosters((prevState) => ({
            ...prevState,
            [movieId]: URL.createObjectURL(
              new Blob([response.data], { type: "image/jpeg" })
            ),
          }));
        })
        .catch((error) => {
          console.error("Error fetching movie poster: ", error);
        });
    }
  };

  const getMoviePoster = (movieId: number) => {
    if (!moviePosters[movieId.toString()]) {
      fetchMoviePoster(movieId.toString());
    }
    return moviePosters[movieId.toString()];
  };
  const goToMoviePage = (result: MovieInfoDto) => {
    const movieId = result.movieId; // Check if movieId exists
    if (movieId) {
      navigate(`../moviePage/${movieId}`);
    } else {
      console.error("MovieId is missing in the result:", result);
    }
  };

  return (
    <>
      <Home isOtherPage={true} isMyPage={false} />
      <main>
        <div className="left-user-page"></div>
        <div className="main-div-user-page-resultPage">
          {results.map((result) => (
            <div
              key={result.movieId}
              className="result-item-resultPage"
              onClick={() => goToMoviePage(result)}
            >
              <div className="result-content-movie-result-page">
                <img src={getMoviePoster(result.movieId) || ""} alt="" />
                <div className="text-fields-resultPage">
                  <div className="movie-title">
                    <p>{result.title}</p>
                  </div>
                  <div className="movie-release-year">
                    <p>{result.releaseYear}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="right-user-page"></div>
      </main>
    </>
  );
};

export default ResultPageMovie;
