// UserPage.js
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getUserInfo, UserInfo } from "../../Helpers/user_info_helper";
import "./usePage.scss";
import Home from "../Home/home";

const UserPage: React.FC = () => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const { username } = useParams<{ username: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    if (username) {
      fetchUserInfo();
    }
  }, [username]);

  const fetchUserInfo = () => {
    if (username) {
      getUserInfo(username!)
        .then((response) => {
          setUserInfo(response.data);
        })
        .catch((error) => {
          console.error("Error fetching user info: ", error);
        });
      console.log(username);
    }
  };

  return (
    <>
      {userInfo && (
        <>
          <Home isOtherPage={true} />
          <p>Username: {userInfo.username}</p>
          <p>First name: {userInfo.firstName}</p>
          <p>Last name: {userInfo.lastName}</p>
          <p>Gender: {userInfo.gender}</p>
          <p>FriendsIds: {userInfo.friendsIds}</p>
        </>
      )}
    </>
  );
};

export default UserPage;
