import React, { useState, useEffect } from "react";
import Home from "../Home/home";
import { useParams } from "react-router-dom";
import {
  getReviewByReviewId,
  ReviewInfoDto,
} from "../../Helpers/review_helper";

const ReviewPage: React.FC = () => {
  const [review, setReview] = useState<ReviewInfoDto | null>(null);
  const { reviewId } = useParams<{ reviewId: string }>();

  useEffect(() => {
    const fetchReview = async () => {
      try {
        if (reviewId) {
          const reviewData = await getReviewByReviewId(reviewId);
          setReview(reviewData);
        }
      } catch (error) {
        console.error("Błąd podczas pobierania recenzji: ", error);
      }
    };

    fetchReview();
  }, [reviewId]);

  return (
    <>
      <Home isOtherPage={true} isMyPage={false} />
      <p>ReviewPage</p>
      {review && (
        <div>
          <p>{review.content}</p>
        </div>
      )}
    </>
  );
};

export default ReviewPage;
