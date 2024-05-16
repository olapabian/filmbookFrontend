import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { MovieInfoDto } from "../../Helpers/search_helper";
import Rating from "@mui/material/Rating";
import {
  getMovieInfoById,
  getMoviePosterById,
  getMovieAverageRating,
} from "../../Helpers/movie_helper";
import "./moviePage.scss";
import Home from "../Home/home";
import MoviePhotos from "./MoviePhotos/moviePhotos";
import Reviews from "../Reviews/reviews";
import AddReview from "./AddReview/addReview";
import { isUserReviewedThisMovie } from "../../Helpers/review_helper";
import { UserInfo } from "../../Helpers/user_info_helper";
import { getUsername } from "../../Helpers/axios_helper";
const MoviePage: React.FC = () => {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [ratingAvg, setRatingAvg] = useState<number | null>(null);
  const { movieId } = useParams<{ movieId: string }>();
  const [movieInfo, setMovieInfo] = useState<MovieInfoDto | null>(null);
  const [moviePoster, setMoviePoster] = useState<string | null>(null);
  const [selectedTab, setSelectedTab] = useState<string>("allMovieReviews");
  const [userReviewed, setUserReviewed] = useState(false);
  const [isAddReviewComponentShowed, setIsAddReviewComponentShowed] =
    useState<boolean>(false);

  useEffect(() => {
    fetchLoggedUser();
    fetchMovieInfo();
    fetchMoviePoster();
    fetchAvgRating();
  }, [movieId]);

  useEffect(() => {
    if (user) {
      getIsUserReviewedThisMovie();
    }
  }, [user, movieId]);
  const getIsUserReviewedThisMovie = async () => {
    if (movieId && user?.userId) {
      try {
        const response = await isUserReviewedThisMovie(
          movieId,
          user.userId.toString()
        );
        setUserReviewed(response);
        console.log(response);
      } catch (error) {
        console.error(
          "Błąd podczas sprawdzania, czy użytkownik ocenił film: ",
          error
        );
      }
    }
  };
  const fetchLoggedUser = () => {
    getUsername()
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  };
  const fetchMovieInfo = async () => {
    if (movieId) {
      try {
        const response = await getMovieInfoById(movieId);
        if (response.data.overview !== null) {
          const cleanedOverview = response.data.overview.replace(/\[|\]/g, "");
          setMovieInfo({ ...response.data, overview: cleanedOverview });
        } else {
          setMovieInfo({ ...response.data });
        }

        // Ustaw stan movieInfo z oczyściłym tekstem overview
      } catch (error) {
        console.error("Error fetching movie data:", error);
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
  const fetchAvgRating = () => {
    if (movieId) {
      getMovieAverageRating(movieId)
        .then((averageRating) => {
          setRatingAvg(averageRating);
        })
        .catch((error) => {
          console.error("Błąd:", error);
        });
    }
  };
  const handleTabClick = (tab: string) => {
    setSelectedTab(tab);
  };
  const handleAddReviewButtonClick = () => {
    getIsUserReviewedThisMovie();
    setIsAddReviewComponentShowed(!isAddReviewComponentShowed);
  };
  return (
    <>
      <Home isOtherPage={true} isMyPage={false} />
      {isAddReviewComponentShowed && (
        <AddReview
          onClose={handleAddReviewButtonClick}
          movieId={movieInfo ? movieInfo.movieId : 0}
        />
      )}
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
                  <div className="top-info">
                    <div className="title-release-year">
                      <h2>{movieInfo.title}</h2>
                      <h3>{movieInfo.releaseYear}</h3>
                    </div>{" "}
                    {ratingAvg && (
                      <div className="stars-rating">
                        <Rating
                          name="simple-controlled"
                          value={ratingAvg}
                          size="large"
                          max={10}
                          sx={{
                            "& .MuiRating-iconEmpty": {
                              color: "#737373",
                            },
                          }}
                          readOnly
                        />
                      </div>
                    )}
                  </div>

                  <p>{movieInfo.overview}</p>
                </div>
              ) : (
                <p>Loading...</p>
              )}
            </div>
          </div>
          <div className="add-review-buuton">
            {!userReviewed && (
              <button
                className="add-review-btn"
                onClick={handleAddReviewButtonClick}
              >
                Dodaj recenzję
              </button>
            )}
            {/* jak jest dodana recenzja przez ciebie to */}
            {/* <button>Zobacz swoją recenzje</button> */}
          </div>
          <MoviePhotos />
          <div className="reviews-nav">
            <button
              className={selectedTab === "allMovieReviews" ? "active" : ""}
              onClick={() => handleTabClick("allMovieReviews")}
            >
              Wszystkie Recenzje
            </button>
            <button
              className={
                selectedTab === "followingMovieReviews" ? "active" : ""
              }
              onClick={() => handleTabClick("followingMovieReviews")}
            >
              Recenzje obserwowanych
            </button>
            {userReviewed && (
              <button
                className={selectedTab === "myMovieReview" ? "active" : ""}
                onClick={() => handleTabClick("myMovieReview")}
              >
                Moja Recenzja
              </button>
            )}
          </div>
          {/* komponent z recenzajmi znajomych i wszystimi */}
          <div className="revievs-component">
            {/* i tu bede dawac recenzje jako props do Reviews */}
            {selectedTab === "allMovieReviews" && (
              <Reviews
                reviewType={"allMovieReviews"}
                showMovie={false}
                userId={undefined}
                movieId={movieId}
                showUsers={true}
              />
            )}
            {/* i tu bede dawac recenzje jako props do Reviews */}
            {selectedTab === "followingMovieReviews" && (
              <Reviews
                reviewType={"followingMovieReviews"}
                showMovie={false}
                userId={undefined}
                movieId={movieId}
                showUsers={true}
              />
            )}
            {/* i tu bede dawac recenzje jako props do Reviews */}
            {selectedTab === "myMovieReview" && (
              <Reviews
                reviewType={"myMovieReview"}
                showMovie={false}
                userId={user?.userId}
                movieId={movieId}
                showUsers={true}
              />
            )}
          </div>
        </div>

        <div className="right-side"></div>
      </div>
    </>
  );
};

export default MoviePage;
