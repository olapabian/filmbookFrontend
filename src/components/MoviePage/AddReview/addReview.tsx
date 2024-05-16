import React, { useState, useEffect } from "react";
import { FaWindowClose } from "react-icons/fa";
import Rating from "@mui/material/Rating";
import "./addReview.scss";
import { addReview, ReviewInfoResponse } from "../../../Helpers/review_helper";
import { getUsername } from "../../../Helpers/axios_helper";
import { UserInfo } from "../../../Helpers/user_info_helper";

interface AddReviewProps {
  onClose: () => void;
  movieId: number;
}

const AddReview: React.FC<AddReviewProps> = ({ onClose, movieId }) => {
  const [starValue, setStarValue] = useState<number>(0);
  const [reviewText, setReviewText] = useState<string>("");
  const [user, setUser] = useState<UserInfo | null>(null);

  useEffect(() => {
    fetchLoggedUser();
  }, []);

  const fetchLoggedUser = () => {
    getUsername()
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  };

  const handleAddReviewClick = async () => {
    if (!reviewText.trim()) {
      alert("Proszę wpisać treść recenzji");
    } else if (starValue === 0) {
      alert("Proszę zaznaczyć ilość gwiazdek");
    } else if (reviewText.length > 10000) {
      alert(
        "Treść recenzji jest zbyt długa. Maksymalna liczba znaków to 10 000."
      );
    } else {
      try {
        await addReview({
          movieId: movieId,
          userId: user?.userId || 0,
          stars: starValue,
          content: reviewText,
        });
        onClose();
      } catch (error) {
        console.error("Błąd podczas dodawania recenzji: ", error);
      }
    }
  };

  return (
    <>
      <div className="overlay-signup-add-photo"></div>
      <div className="signup-add-photo">
        <div className="signup-container-add-photo">
          <div className="signup-top-add-photo">
            <div className="signup-header-add-photo">
              <h1>Dodaj recenzję</h1>
            </div>
            <div className="close-icon-div-add-photo" onClick={onClose}>
              <FaWindowClose className="close-icon-add-photo" />
            </div>
          </div>
          <div className="signup-separator-add-photo"></div>
          <div className="add-photo-section">
            <div className="star-rating-div">
              <Rating
                name="simple-controlled"
                value={starValue}
                size="large"
                max={10}
                sx={{
                  "& .MuiSvgIcon-root": {
                    color: "rgb(217, 212, 82)",
                  },
                }}
                onChange={(event, newValue) => {
                  setStarValue(newValue);
                }}
              />
            </div>
            <div className="review-input-div">
              <textarea
                required
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
              ></textarea>
            </div>
            <div className="add-review-button">
              <button onClick={handleAddReviewClick}>Dodaj</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddReview;
