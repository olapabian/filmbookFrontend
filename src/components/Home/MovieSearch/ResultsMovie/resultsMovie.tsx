import React, { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MovieInfoDto } from "../../../../Helpers/search_helper";
import { getMoviePosterById } from "../../../../Helpers/movie_helper";
import "./resultsMovie.scss";
interface ResultMoviesProps {
  results: MovieInfoDto[];
}

const ResultMovies: FC<ResultMoviesProps> = ({ results }) => {
  const navigate = useNavigate();
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
    navigate(`../moviePage/${result.movieId}`);
  };

  return (
    <div className="results-container">
      <div className="search-inside-separator"></div>
      {results.map((result, index) => (
        <div
          key={index}
          className="result-item"
          onClick={() => goToMoviePage(result)}
        >
          <div className="result-content-results-movie">
            <img src={getMoviePoster(result.movieId) || ""} alt="" />
            <div className="text-fields">
              <div className="title">
                <p>{result.title}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ResultMovies;
