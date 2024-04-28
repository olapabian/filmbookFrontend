import React, { FC, useState } from "react";
import "./results.scss";
import manImage from "../../../../imgs/men.jpg";
import womanImage from "../../../../imgs/women.jpg";
import customImage from "../../../../imgs/neutral.jpg";
import { useNavigate } from "react-router-dom";
import {
  UserInfo,
  getUserImageByUsername,
} from "../../../../Helpers/user_info_helper";

interface ResultsProps {
  results: UserInfo[];
}

const Results: FC<ResultsProps> = ({ results }) => {
  const navigate = useNavigate();
  const [userImages, setUserImages] = useState<{
    [userId: number]: string | null;
  }>({});

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
  return (
    <div className="results-container">
      <div className="search-inside-separator"></div>
      {results.map((result, index) => (
        <div
          key={index}
          className="result-item"
          onClick={() => goToUserPage(result)}
        >
          <div className="result-content">
            {getUserImage(result.userId, result.username) ? (
              <img src={getUserImage(result.userId, result.username)!} alt="" />
            ) : (
              <img
                src={
                  result.gender === "Male"
                    ? manImage
                    : result.gender === "Female"
                    ? womanImage
                    : customImage
                }
                alt=""
              />
            )}
            <div className="text-fields">
              <div className="firstName-lastName">
                <p>{result.firstName}</p>
                <p>{result.lastName}</p>
              </div>
              <div className="username-results">
                <p>{result.username}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Results;
