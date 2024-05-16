import React, { useState, useEffect } from "react";
import "./moviePoster.scss";
import posterImage from "../../../../src/imgs/plakat.jpg";
import {
  getMovieInfoById,
  getMoviePosterById,
} from "../../../Helpers/movie_helper";
const MoviePoster = ({ movieId }) => {
  const [posterUrl, setPosterUrl] = useState(null);
  const fetchMoviePoster = (
    movieIdAsNumber: number
  ): Promise<string | undefined> => {
    return getMoviePosterById(movieIdAsNumber.toString())
      .then((response) => {
        const imageUrl = URL.createObjectURL(response.data);
        return imageUrl;
      })
      .catch((error) => {
        console.error("Error fetching movie poster: ", error);
        return undefined; // Return a placeholder value in case of an error
      });
  };

  useEffect(() => {
    const fetchPoster = async () => {
      try {
        const url = await fetchMoviePoster(movieId);
        setPosterUrl(url);
      } catch (error) {
        console.error("Error fetching movie poster: ", error);
        // Optionally handle error here
      }
    };

    fetchPoster();
  }, [movieId]);

  return (
    <>
      {" "}
      {posterUrl ? (
        <img src={posterUrl} alt="Movie Poster" className="poster" />
      ) : (
        <img src={posterImage} alt="Movie Poster" className="poster" />
      )}
    </>
  );
};
export default MoviePoster;
