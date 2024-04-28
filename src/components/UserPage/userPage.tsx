import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  getUserInfo,
  UserInfo,
  insertUserImageById,
  deleteUserImageById,
  getUserImageByUsername,
} from "../../Helpers/user_info_helper";
import "./userPage.scss";
import Home from "../Home/home";
import manImage from "../../imgs/men.jpg";
import womanImage from "../../imgs/women.jpg";
import customImage from "../../imgs/neutral.jpg";
import UserFollowing from "./UserFollowing/userFollowing";
import Reviews from "../Reviews/reviews";
import { FaCamera } from "react-icons/fa";
import AddPhoto from "./AddPhoto/addPhoto";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { getUsername } from "../../Helpers/axios_helper";
import { addFollow, removeFollow } from "../../Helpers/follow_helper";
const UserPage: React.FC = () => {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [selectedTab, setSelectedTab] = useState<string>("reviews");
  const [isAddPhotoComponentShowed, setIsAddPhotoComponentShowed] =
    useState<boolean>(false);
  const [userImage, setUserImage] = useState<string | null>(null);
  const { username } = useParams<{ username: string }>();
  useEffect(() => {
    if (username) {
      fetchLoggedUser();
      fetchUserInfo();
      fetchUserImage();
      setSelectedTab("reviews");
    }
  }, [username]);

  const fetchLoggedUser = () => {
    getUsername()
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  };
  const fetchUserInfo = () => {
    if (username) {
      getUserInfo(username!)
        .then((response) => {
          setUserInfo(response.data);
          fetchUserImage();
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

  const handleAddUserImage = (image: Blob) => {
    if (userInfo) {
      insertUserImageById(userInfo.userId, image)
        .then(() => {
          fetchUserInfo();
          fetchUserImage();
          fetchLoggedUser();
        })
        .catch((error) => {
          console.error("Error adding user image: ", error);
        });
    }
  };
  const handleDeleteIconClick = async () => {
    if (userInfo) {
      const confirmDelete = window.confirm(
        "Czy na pewno chcesz usunąć zdjęcie?"
      );
      if (confirmDelete) {
        try {
          await deleteUserImageById(userInfo.userId).then((response) => {
            fetchUserInfo();
            fetchLoggedUser();
            fetchUserImage();
            alert(response); // Wyświetl wiadomość z potwierdzeniem
          });
        } catch (error) {
          console.error("Błąd podczas usuwania zdjęcia użytkownika: ", error);
        }
      }
    }
  };

  const followed = (): boolean => {
    if (userInfo && user && typeof userInfo.followersIds === "string") {
      const followersArray = userInfo.followersIds.split(";");
      for (const followerId of followersArray) {
        if (followerId === user.userId.toString()) {
          return true;
        }
      }
    }
    return false;
  };

  const handleFollowButton = async () => {
    console.log("follow button");
    try {
      await fetchLoggedUser();
      await fetchUserInfo();
      if (userInfo && user) {
        await addFollow(user.userId, userInfo.userId)
          .then(() => {
            fetchUserInfo();
            fetchUserImage();
            fetchLoggedUser();
          })
          .catch((error) => {
            console.log("Error follow: ", error);
          });
        console.log("Obserwowanie użytkownika udane!");
      }
    } catch (error) {
      console.log("Obserwowanie użytkownika nie udane!");
      console.error("Błąd podczas follow użytkownika:", error);
    }
  };

  const handleRemoveFollowButton = async () => {
    console.log("follow button");
    try {
      await fetchLoggedUser();
      await fetchUserInfo();
      if (userInfo && user) {
        await removeFollow(user.userId, userInfo.userId)
          .then(() => {
            fetchUserInfo();
            fetchLoggedUser();
          })
          .catch((error) => {
            console.log("Error follow: ", error);
          });
        console.log("Usuniecie obserwowania użytkownika udane!");
      }
    } catch (error) {
      console.log(" unObserwowanie użytkownika nie udane!");
      console.error("Błąd podczas unfollow użytkownika:", error);
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
      {userInfo && user && (
        <>
          <Home isOtherPage={true} isMyPage={userInfo.userId === user.userId} />
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
                    {user?.username !== null &&
                      user?.username === userInfo.username && (
                        <div
                          className="icon-div"
                          onClick={handleCamerIconClick}
                        >
                          <FaCamera className="camera-icon" />
                        </div>
                      )}

                    {user?.username !== null &&
                      user?.username === userInfo.username &&
                      userImage && (
                        <div
                          className="delete-photo-icon-div"
                          onClick={handleDeleteIconClick}
                        >
                          <IoMdCloseCircleOutline className="delete-icon" />
                        </div>
                      )}
                  </div>
                  <div className="basic-info">
                    <h4>
                      <div className="first-last-name">
                        {userInfo.firstName} {userInfo.lastName}
                      </div>

                      <div className="napis-obserwujesz">
                        {user?.username !== null &&
                          user?.username !== userInfo.username &&
                          followed() && <p>(Obserwujesz)</p>}
                      </div>
                    </h4>

                    <p>{userInfo.username}</p>
                    <p>Obserwatorzy: {userInfo.followersCount}</p>
                    <p>Obserwowani: {userInfo.followingCount}</p>
                  </div>
                </div>
                <div className="buttons">
                  {user?.username !== null &&
                    user?.username === userInfo.username && (
                      <button>Edytuj profil</button>
                    )}
                  {user?.username !== null &&
                    user?.username !== userInfo.username &&
                    !followed() && (
                      <button onClick={handleFollowButton}>Obserwuj</button>
                    )}
                  {user?.username !== null &&
                    user?.username !== userInfo.username &&
                    followed() && (
                      <button
                        className="obserwujesz"
                        onClick={handleRemoveFollowButton}
                      >
                        Przestań obserwować
                      </button>
                    )}
                </div>
              </div>
              <div className="user-info">
                <div className="user-info-nav">
                  <button
                    className={selectedTab === "followers" ? "active" : ""}
                    onClick={() => handleTabClick("followers")}
                  >
                    Obserwujący
                  </button>
                  <button
                    className={selectedTab === "following" ? "active" : ""}
                    onClick={() => handleTabClick("following")}
                  >
                    Obserwowani
                  </button>
                  <button
                    className={selectedTab === "reviews" ? "active" : ""}
                    onClick={() => handleTabClick("reviews")}
                  >
                    Recenzje użytkownika
                  </button>
                </div>
                <div className="display-info">
                  {selectedTab === "followers" && (
                    <UserFollowing following={userInfo.followersIds} />
                  )}
                  {selectedTab === "reviews" && <Reviews />}
                  {selectedTab === "following" && (
                    <UserFollowing following={userInfo.followingIds} />
                  )}
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
