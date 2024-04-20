import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  getUserInfo,
  UserInfo,
  insertUserImageById,
  getUserImageById,
  deleteUserImageById,
  getUserImageByUsername,
} from "../../Helpers/user_info_helper";
import "./userPage.scss";
import Home from "../Home/home";
import czlekImage from "../../imgs/logos/czlek.jpg";
import manImage from "../../imgs/men.jpg";
import womanImage from "../../imgs/women.jpg";
import customImage from "../../imgs/neutral.jpg";
import UserFriends from "./UserFriends/userFriends";
import UserReviews from "./UserReviews/userReviews";
import { FaCamera } from "react-icons/fa";
import AddPhoto from "./AddPhoto/addPhoto";
import { IoMdCloseCircleOutline } from "react-icons/io";

const UserPage: React.FC = () => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [selectedTab, setSelectedTab] = useState<string>("friends");
  const [isAddPhotoComponentShowed, setIsAddPhotoComponentShowed] =
    useState<boolean>(false);
  const [userImage, setUserImage] = useState<string | null>(null);
  const { username } = useParams<{ username: string }>();
  useEffect(() => {
    if (username) {
      fetchUserInfo();
      fetchUserImage();
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
    }
  };

  const handleTabClick = (tab: string) => {
    setSelectedTab(tab);
  };

  const handleCamerIconClick = () => {
    setIsAddPhotoComponentShowed(true);
  };

  const handleCloseAddPhoto = () => {
    setIsAddPhotoComponentShowed(false);
  };

  const fetchUserImage = () => {
    if (username) {
      getUserImageByUsername(username)
        .then((response) => {
          setUserImage(URL.createObjectURL(response.data));
        })
        .catch((error) => {
          console.error("Error fetching user image: ", error);
        });
    } else {
      console.log("username nie ma");
    }
  };

  // Funkcja do przesyłania obrazka użytkownika
  const handleAddUserImage = (image: Blob) => {
    if (userInfo) {
      insertUserImageById(userInfo.userId, image)
        .then(() => {
          fetchUserInfo();
        })
        .catch((error) => {
          console.error("Error adding user image: ", error);
        });
    }
  };
  const handleDeleteIconClick = () => {
    if (userInfo) {
      deleteUserImageById(userInfo.userId)
        .then(() => {
          // Zaktualizuj dane użytkownika po przesłaniu obrazka
          fetchUserInfo();
        })
        .catch((error) => {
          console.error("Error deleting user image: ", error);
        });
    }
  };

  return (
    <>
      {isAddPhotoComponentShowed && (
        <AddPhoto
          onClose={handleCloseAddPhoto}
          onAddImage={handleAddUserImage}
        />
      )}{" "}
      {/* Dodaj prop onAddImage do komponentu AddPhoto */}
      {userInfo && (
        <>
          <Home isOtherPage={true} />
          <main>
            <div className="left-user-page"></div>
            <div className="main-div-user-page">
              <div className="my-profile-header">
                <div className="user-container">
                  <div className="profile-picture-container">
                    {userImage ? (
                      <img src={userImage} alt="" />
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

                    <div className="icon-div" onClick={handleCamerIconClick}>
                      <FaCamera className="camera-icon" />
                    </div>
                    <div
                      className="delete-photo-icon-div"
                      onClick={handleDeleteIconClick}
                    >
                      <IoMdCloseCircleOutline className="delete-icon" />
                    </div>
                  </div>
                  <div className="basic-info">
                    <h4>
                      {userInfo.firstName} {userInfo.lastName}
                    </h4>
                    <p>{userInfo.username}</p>
                  </div>
                </div>
                <div className="buttons">
                  {/* jesli to moj profil */}
                  <button>Edytuj profil</button>

                  {/* jesli to kogos profil */}
                  {/* jesli juz jest znajomym to napis "Twoj znajomy" 
                    albo "oczekuje na akceptacje" 
                    Może tez roziniecie w dol i usun ze znajomych*/}
                  <button>Zaproś znajomego</button>
                </div>
              </div>
              <div className="user-info">
                <div className="user-info-nav">
                  <button
                    className={selectedTab === "friends" ? "active" : ""}
                    onClick={() => handleTabClick("friends")}
                  >
                    Znajomi
                  </button>
                  <button
                    className={selectedTab === "reviews" ? "active" : ""}
                    onClick={() => handleTabClick("reviews")}
                  >
                    Recenzje użytkownika
                  </button>
                </div>
                <div className="display-info">
                  {selectedTab === "friends" && <UserFriends />}
                  {selectedTab === "reviews" && <UserReviews />}
                </div>
              </div>
            </div>
            <div className="rigth-user-page"></div>
          </main>
        </>
      )}
    </>
  );
};

export default UserPage;
