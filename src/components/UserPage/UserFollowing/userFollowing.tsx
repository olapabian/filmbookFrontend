import React, { useState, useEffect } from "react";
import "./userFollowing.scss";
import {
  UserInfo,
  getUserInfoById,
  getUserImageByUsername,
} from "../../../Helpers/user_info_helper";
import manImage from "../../../imgs/men.jpg";
import womanImage from "../../../imgs/women.jpg";
import customImage from "../../../imgs/neutral.jpg";
import { useNavigate, useLocation } from "react-router-dom";
import { Navigate } from "react-router-dom";
interface UserFollowingProps {
  following: string;
}

const UserFollowing: React.FC<UserFollowingProps> = ({ following }) => {
  const navigate = useNavigate();
  const [followingUsersInfo, setFollowingUsersInfo] = useState<UserInfo[]>([]);
  const [userImages, setUserImages] = useState<{
    [userId: number]: string | null;
  }>({});
  useEffect(() => {
    fetchFollowingUsersInfo();
  }, [following]);

  const fetchUserInfo = (userId: number) => {
    console.log(userId);
    return getUserInfoById(userId)
      .then((response) => {
        console.log(response.data);
        return response.data;
      })
      .catch((error) => {
        console.error("Error fetching user info: ", error);
        throw error;
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
  const fetchFollowingUsersInfo = async () => {
    if (typeof following === "string") {
      const followingArray: string[] = following.split(";");
      const usersInfoPromises: Promise<UserInfo | null>[] = followingArray.map(
        (followingId) => {
          const parsedId: number = parseInt(followingId, 10);
          if (!isNaN(parsedId)) {
            return fetchUserInfo(parsedId);
          }
          return Promise.resolve(null);
        }
      );

      try {
        const usersInfo: (UserInfo | null)[] = await Promise.all(
          usersInfoPromises
        );
        const filteredUsersInfo: UserInfo[] = usersInfo.filter(
          (info) => info !== null
        ) as UserInfo[];
        setFollowingUsersInfo(filteredUsersInfo);
      } catch (error) {
        console.error("Error fetching following users info: ", error);
      }
    }
  };
  const goToUserPage = (result: UserInfo) => {
    navigate(`../userPage/${result.username}`);
  };
  return (
    <div className="friend-profile-container">
      <div className="info-view-following">
        {followingUsersInfo.map((userInfo, index) => (
          <div
            key={index}
            className="result-item-following"
            onClick={() => goToUserPage(userInfo)}
          >
            <div className="result-content">
              {getUserImage(userInfo.userId, userInfo.username) ? (
                <img
                  src={getUserImage(userInfo.userId, userInfo.username)!}
                  alt=""
                />
              ) : (
                <img
                  src={
                    userInfo.gender === "Male"
                      ? manImage
                      : userInfo.gender === "Female"
                      ? womanImage
                      : customImage
                  }
                  alt=""
                />
              )}
              <div className="text-fields">
                <div className="firstName-lastName">
                  <p>{userInfo.firstName}</p>
                  <p>{userInfo.lastName}</p>
                </div>
                <div className="username-results">
                  <p>{userInfo.username}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserFollowing;
