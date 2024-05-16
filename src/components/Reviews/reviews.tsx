import React, { useState, useEffect } from "react";
import manImage from "../../imgs/men.jpg";
import womanImage from "../../imgs/women.jpg";
import customImage from "../../imgs/neutral.jpg";
import "./reviews.scss";
import MoviePoster from "./MoviePoster/moviePoster.";
import Rating from "@mui/material/Rating";
import { useNavigate } from "react-router-dom";
import { AiTwotoneLike } from "react-icons/ai";
import { FaCommentDots } from "react-icons/fa";
import { getUsername } from "../../Helpers/axios_helper";
import {
  getReviewsByUsersIds,
  getReviewsByUserId,
  getReviewsByMovieId,
  getReviewsByMovieIdAndUsersIds,
  ReviewInfoDto,
} from "../../Helpers/review_helper";
import {
  UserInfo,
  getUserImageByUsername,
} from "../../Helpers/user_info_helper";

import { MovieInfoDto } from "../../Helpers/search_helper";
interface ReviewsProps {
  reviewType: string;
  showMovie: boolean;
  userId: number | undefined;
  movieId: string | undefined;
  showUsers: boolean;
}
const Reviews: React.FC<ReviewsProps> = ({
  reviewType,
  showMovie,
  userId,
  movieId,
  showUsers,
}) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserInfo | null>(null);
  const [reviews, setReviews] = useState<ReviewInfoDto[] | null>(null);
  const [userImages, setUserImages] = useState<{
    [userId: number]: string;
  }>({});
  useEffect(() => {
    if (user === undefined || user === null) {
      fetchLoggedUser();
    }
    if (reviewType === "userReviews") {
      fetchUserReviews();
    } else if (reviewType === "allMovieReviews") {
      fetchMovieReviews();
    } else if (reviewType === "followingMovieReviews") {
      fetchMovieFriendsReviews();
    } else if (reviewType === "myMovieReview") {
      fetchMovieMyReview();
    } else if (reviewType == "followingReviews") {
      fetchFriendsReviews();
    }
  }, [user]);
  const fetchUserReviews = async () => {
    if (userId) {
      try {
        const reviews: ReviewInfoDto[] | null = await getReviewsByUserId(
          userId.toString()
        );
        setReviews(reviews);
      } catch (error) {
        console.error("Błąd podczas pobierania recenzji użytkownika: ", error);
        throw error;
      }
    }
  };

  const fetchMovieReviews = async () => {
    if (movieId) {
      try {
        const reviews: ReviewInfoDto[] | null = await getReviewsByMovieId(
          movieId
        );
        setReviews(reviews);
      } catch (error) {
        console.error("Błąd podczas pobierania recenzji użytkownika: ", error);
        throw error;
      }
    }
  };
  const fetchMovieFriendsReviews = async () => {
    if (movieId) {
      try {
        if (user && user.followingIds) {
          // Dzielimy ciąg ID na tablicę stringów za pomocą średnika jako separatora
          const followingIdsArray = user.followingIds
            .split(";")
            .filter((id) => id.trim() !== "");
          const reviews: ReviewInfoDto[] | null =
            await getReviewsByMovieIdAndUsersIds(movieId, followingIdsArray);
          setReviews(reviews);
          console.log(reviews);
        } else {
          console.error(
            "Brak danych użytkownika lub ID obserwowanych użytkowników."
          );
        }
      } catch (error) {
        console.error("Błąd podczas pobierania recenzji użytkowników: ", error);
        throw error;
      }
    }
  };

  const fetchFriendsReviews = async () => {
    try {
      if (user && user.followingIds) {
        const followingIdsArray = user.followingIds
          .split(";")
          .filter((id) => id.trim() !== "");
        const reviews: ReviewInfoDto[] | null = await getReviewsByUsersIds(
          followingIdsArray
        );
        setReviews(reviews);
        console.log(reviews);
      } else {
        console.error(
          "Brak danych użytkownika lub ID obserwowanych użytkowników."
        );
      }
    } catch (error) {
      console.error("Błąd podczas pobierania recenzji użytkowników: ", error);
      throw error;
    }
  };

  const fetchMovieMyReview = async () => {
    if (movieId) {
      try {
        let idArray = [];
        if (user) {
          idArray = [user.userId.toString()];
          const reviews: ReviewInfoDto[] | null =
            await getReviewsByMovieIdAndUsersIds(movieId, idArray);
          setReviews(reviews);
        } else {
          console.error(
            "Brak danych użytkownika lub ID obserwowanych użytkowników."
          );
        }
      } catch (error) {
        console.error("Błąd podczas pobierania recenzji użytkowników: ", error);
        throw error;
      }
    }
  };

  const fetchLoggedUser = () => {
    getUsername()
      .then((response) => {
        setUser(response.data);
        // Ustaw userId na response.data.userId, jeśli response.data.userId istnieje, w przeciwnym razie zostaw wartość domyślną (0)
        setUser(response.data || 0);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  };
  const fetchUserImage = (userId: number, username: string) => {
    getUserImageByUsername(username)
      .then((response) => {
        setUserImages((prevState) => ({
          ...prevState,
          [userId]: URL.createObjectURL(response.data),
        }));
      })
      .catch((error) => {
        console.error("Error fetching user image: ", error);
      });
  };
  const getUserImage = (userId: number, username: string) => {
    if (!userImages[userId]) {
      fetchUserImage(userId, username);
    }
    return userImages[userId];
  };

  const goToUserPage = (result: UserInfo) => {
    navigate(`../userPage/${result.username}`);
  };
  const goToMoviePage = (result: MovieInfoDto) => {
    navigate(`../moviePage/${result.movieId}`);
  };
  const getTimeAgoString = (dateTimeString: string) => {
    const currentDate = new Date();
    const pastDate = new Date(dateTimeString);
    const timeDifference = currentDate.getTime() - pastDate.getTime();
    const secondsDifference = Math.floor(timeDifference / 1000);
    const minutesDifference = Math.floor(secondsDifference / 60);
    const hoursDifference = Math.floor(minutesDifference / 60);
    const daysDifference = Math.floor(hoursDifference / 24);
    const weeksDifference = Math.floor(daysDifference / 7);
    const monthsDifference = Math.floor(daysDifference / 30);

    if (monthsDifference > 0) {
      return `${monthsDifference} ${
        monthsDifference === 1 ? "miesiąc" : "miesiące"
      } temu`;
    } else if (weeksDifference > 0) {
      return `${weeksDifference} ${
        weeksDifference === 1 ? "tydzień" : "tygodnie"
      } temu`;
    } else if (daysDifference > 0) {
      return `${daysDifference} ${daysDifference === 1 ? "dzień" : "dni"} temu`;
    } else if (hoursDifference > 0) {
      return `${hoursDifference} ${
        hoursDifference === 1
          ? "godzinę"
          : hoursDifference === 2 ||
            hoursDifference === 3 ||
            hoursDifference === 4
          ? "godziny"
          : "godzin"
      } temu`;
    } else if (minutesDifference > 0) {
      return `${minutesDifference} ${
        minutesDifference === 1
          ? "minutę"
          : minutesDifference === 2 ||
            minutesDifference === 3 ||
            minutesDifference === 4
          ? "minuty"
          : "minut"
      } temu`;
    } else {
      return "Przed chwilą";
    }
  };
  const handleGoToReviewBtnClick = (reviewId: number) => {
    navigate(`/review/${reviewId}`);
  };
  // jeszcze dodac gwiazdki
  return (
    <div className="middle">
      {reviews &&
        reviews.map((review) => (
          <div className="review" key={review.reviewId}>
            <div className="review-head">
              {showUsers && (
                <div className="profile-picture">
                  {getUserImage(review.user.userId, review.user.username) ? (
                    <img
                      src={getUserImage(
                        review.user.userId,
                        review.user.username
                      )}
                      alt=""
                      onClick={() => goToUserPage(review.user)}
                    />
                  ) : (
                    <img
                      src={
                        review.user.gender === "Male"
                          ? manImage
                          : review.user.gender === "Female"
                          ? womanImage
                          : customImage
                      }
                      alt=""
                      onClick={() => goToUserPage(review.user)}
                    />
                  )}
                </div>
              )}
              <div className="info">
                {showUsers && (
                  <div className="username">
                    <p onClick={() => goToUserPage(review.user)}>
                      {review.user.username}
                    </p>
                  </div>
                )}
                <div className="time-ago">
                  <p>
                    {getTimeAgoString(
                      review.updatedDate && review.updatedTime
                        ? review.updatedDate.toString() +
                            "T" +
                            review.updatedTime.toString() // Jeśli są aktualizowane data i czas
                        : review.createdDate.toString() +
                            "T" +
                            review.createdTime.toString() // Jeśli nie ma aktualizacji, użyj daty i czasu utworzenia
                    )}
                  </p>
                </div>
              </div>
              <Rating
                name="simple-controlled"
                className="stars"
                value={review.stars}
                size="large"
                max={10}
                sx={{
                  "& .MuiSvgIcon-root": {
                    backgroundColor: "#F0EBCA",
                  },
                }}
                readOnly
                // disabled
              />
              <div className="go-to-review-btn">
                <button
                  onClick={() => handleGoToReviewBtnClick(review.reviewId)}
                >
                  Do recenzji
                </button>
              </div>
            </div>
            <div className="up-to-head-main-separator">
              <div className="head-main-separator"></div>
            </div>
            {/*  */}
            <div className="review-main">
              {showMovie && (
                <div className="movie">
                  <p
                    className="title"
                    onClick={() => goToMoviePage(review.movieInfo)}
                  >
                    {review.movieInfo.title}
                  </p>

                  <div
                    className="poster"
                    onClick={() => goToMoviePage(review.movieInfo)}
                  >
                    <MoviePoster movieId={review.movieInfo.movieId} />
                  </div>
                </div>
              )}
              <div className="review-content">
                <p className="review-text">
                  {review.content.length > 1400
                    ? `${review.content.slice(0, 1400)}...`
                    : review.content}
                </p>
              </div>
            </div>
            {/*  */}
            <div className="review-reactions">
              <div className="likes-count">
                <p>{review.likes}</p>
                <AiTwotoneLike />
              </div>
              <div className="comment-count">
                <p>{review.commentsCount}</p>
                <FaCommentDots />
              </div>
            </div>
            <div className="up-to-head-main-separator">
              <div className="react-separator"></div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Reviews;
