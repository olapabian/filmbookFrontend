import React, { useState, useEffect } from "react";
import "./reviewPage.scss";
import Rating from "@mui/material/Rating";
import Home from "../Home/home";
import { useParams } from "react-router-dom";
import {
  getReviewByReviewId,
  ReviewInfoDto,
  deleteReviewById,
  editReviewById,
} from "../../Helpers/review_helper";
import manImage from "../../imgs/men.jpg";
import womanImage from "../../imgs/women.jpg";
import customImage from "../../imgs/neutral.jpg";
import {
  getUserImageByUsername,
  UserInfo,
} from "../../Helpers/user_info_helper";
import { getMoviePosterById } from "./../../Helpers/movie_helper";
import posterImage from "./../../imgs/plakat.jpg";
import { getUsername } from "../../Helpers/axios_helper";
import { useNavigate } from "react-router-dom";
import { MovieInfoDto } from "../../Helpers/search_helper";
import EditPage from "./EditPage/editPage";
const ReviewPage: React.FC = () => {
  const navigate = useNavigate();
  const [loggedUser, setLoggedUser] = useState<UserInfo | null>(null);
  const [review, setReview] = useState<ReviewInfoDto | null>(null);
  const [userImage, setUserImage] = useState<string | null>(null);
  const [moviePoster, setMoviePoster] = useState<string | null>(null);
  const { reviewId } = useParams<{ reviewId: string }>();
  const [isEditReviewComponentShowed, setIsEditReviewComponentShowed] =
    useState<boolean>(false); // State to control edit review component visibility

  useEffect(() => {
    const fetchReview = async () => {
      try {
        if (reviewId) {
          const reviewData = await getReviewByReviewId(reviewId);
          setReview(reviewData);
          fetchUserImage(reviewData.user.username);
          fetchMoviePoster(reviewData.movieInfo.movieId);
          fetchLoggedUser();
        }
      } catch (error) {
        console.error("Błąd podczas pobierania recenzji: ", error);
      }
    };

    const fetchMoviePoster = (movieId: string) => {
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

    const fetchUserImage = async (username: string) => {
      try {
        const response = await getUserImageByUsername(username);
        setUserImage(URL.createObjectURL(response.data));
      } catch (error) {
        console.error("Błąd podczas pobierania obrazu użytkownika: ", error);
        return null;
      }
    };

    fetchReview();
  }, [reviewId]);

  const fetchLoggedUser = () => {
    getUsername()
      .then((response) => {
        setLoggedUser(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  };
  const goToUserPage = (result: UserInfo) => {
    navigate(`../userPage/${result.username}`);
  };
  const goToMoviePage = (result: MovieInfoDto) => {
    navigate(`../moviePage/${result.movieId}`);
  };
  const deleteReview = () => {
    if (reviewId) {
      const confirmation = window.confirm(
        "Czy na pewno chcesz usunąć tą recenzje?"
      );
      if (confirmation) {
        deleteReviewById(reviewId)
          .then(() => {
            navigate(`../home`);
          })
          .catch((error) => {
            console.error("Error deleting review: ", error);
          });
      }
    }
  };
  const toggleEditReviewComponent = () => {
    setIsEditReviewComponentShowed(!isEditReviewComponentShowed);
  };
  const displayEditView = () => {
    toggleEditReviewComponent();
  };
  return (
    <>
      <Home isOtherPage={true} isMyPage={false} />
      {isEditReviewComponentShowed && review && (
        <EditPage onClose={toggleEditReviewComponent} review={review} />
      )}

      {review && (
        <div className="main-div-review-page">
          <div className="left-side"></div>
          <div className="middle-review">
            <div className="top-info-review">
              <div className="user-container">
                <div
                  className="profile-picture-container"
                  onClick={() => goToUserPage(review.user)}
                >
                  {userImage ? (
                    <img
                      className="user-img"
                      src={userImage}
                      alt="User profile"
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
                      alt="Default profile"
                    />
                  )}
                </div>
                <div className="basic-info">
                  <h4>
                    <div
                      className="first-last-name"
                      onClick={() => goToUserPage(review.user)}
                    >
                      {review.user.firstName} {review.user.lastName}
                    </div>
                  </h4>
                  <p onClick={() => goToUserPage(review.user)}>
                    {review.user.username}
                  </p>
                </div>
              </div>
              <div className="movie-container">
                {moviePoster && (
                  <img
                    className="movie-poster"
                    src={moviePoster}
                    alt=""
                    onClick={() => goToMoviePage(review.movieInfo)}
                  />
                )}
                {!moviePoster && (
                  <img
                    className="movie-poster"
                    src={posterImage}
                    alt=""
                    onClick={() => goToMoviePage(review.movieInfo)}
                  />
                )}
                <div className="movie-details">
                  {review.movieInfo ? (
                    <div>
                      <div className="top-info">
                        <div className="title-release-year">
                          <h2 onClick={() => goToMoviePage(review.movieInfo)}>
                            {review.movieInfo.title}
                          </h2>
                        </div>{" "}
                      </div>
                    </div>
                  ) : (
                    <p>Loading...</p>
                  )}
                </div>
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
                  backgroundColor: "#340c43",
                },
                "& .MuiRating-iconEmpty": {
                  color: "#737373",
                },
              }}
              readOnly
              // disabled
            />
            <div className="review-reviewPage">
              <p>{review.content}</p>
            </div>
            {review.user.username === loggedUser?.username && (
              <div className="operations-buttons-reviewPage">
                <button onClick={displayEditView}>Edytuj Recenzje</button>
                <button onClick={deleteReview}>Usuń Recenzje</button>
              </div>
            )}
            <div className=""></div>
          </div>

          <div className="right-side"></div>
        </div>
      )}
    </>
  );
};

export default ReviewPage;
