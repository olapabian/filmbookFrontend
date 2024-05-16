import React, { useState, useEffect } from "react";
import { getUsername } from "../../Helpers/axios_helper";
import "./home.scss";
import { FaHome } from "react-icons/fa";
import { BiCameraMovie } from "react-icons/bi";
import { IoMdPerson, IoMdSettings } from "react-icons/io";
import Home2 from "./Home2/home2";
import MovieSearch from "./MovieSearch/movieSearch";
import PeopleSearch from "./PeopleSearch/peopleSearch";
import Settings from "./Settings/settings";
import { useLocation, useNavigate } from "react-router-dom";
import {
  getUserImageByUsername,
  UserInfo,
} from "../../Helpers/user_info_helper";
import manImage from "../../imgs/men.jpg";
import womanImage from "../../imgs/women.jpg";
import customImage from "../../imgs/neutral.jpg";
const Home = ({
  isOtherPage,
  isMyPage,
}: {
  isOtherPage: boolean;
  isMyPage: boolean;
}) => {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [activeTab, setActiveTab] = useState<string>("home");
  const location = useLocation();
  const navigate = useNavigate();
  const [userImage, setUserImage] = useState<string | null>(null);

  useEffect(() => {
    const showedPage = (location.state && location.state.showedPage) || "home";
    setActiveTab(showedPage);
    fetchUserData();
  }, [location]);

  useEffect(() => {
    if (user !== null) {
      fetchUserImage();
    }
  }, [user]);

  const fetchUserData = () => {
    getUsername()
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        setUser(null);
      });
  };

  const fetchUserImage = () => {
    if (user !== null) {
      getUserImageByUsername(user.username)
        .then((response) => {
          setUserImage(URL.createObjectURL(response.data));
        })
        .catch((error) => {
          console.error("Error fetching user image: ", error);
        });
    } else {
      console.log("user jest nullem");
    }
  };

  const handleMyUsernameClick = () => {
    if (user && user.username) {
      navigate(`../userPage/${user.username}`);
    }
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    navigate(`/home`, { state: { showedPage: tab }, replace: true });
  };

  return (
    <>
      <div className="main-div">
        <header>
          <div className="logo">
            <img src="src\imgs\logos\mini_logo.png" alt="" />
            <h1>Filmbook</h1>
          </div>
          <nav>
            <div
              className={`home ${
                !isOtherPage && activeTab === "home" ? "active" : ""
              }`}
              onClick={() => handleTabChange("home")}
            >
              <FaHome />
            </div>
            <div
              className={`movies-search ${
                activeTab === "movies-search" ? "active" : ""
              }`}
              onClick={() => handleTabChange("movies-search")}
            >
              <BiCameraMovie />
            </div>
            <div
              className={`people-search ${
                activeTab === "people-search" ? "active" : ""
              }`}
              onClick={() => handleTabChange("people-search")}
            >
              <IoMdPerson />
            </div>
            <div
              className={`settings ${activeTab === "settings" ? "active" : ""}`}
              onClick={() => handleTabChange("settings")}
            >
              <IoMdSettings />
            </div>
          </nav>
          {!isMyPage && (
            <div className="my-profile">
              <div className="column">
                <h4>Twój profil</h4>
                {user && <p onClick={handleMyUsernameClick}>{user.username}</p>}
                {!user && (
                  <p onClick={handleMyUsernameClick}>Loading username...</p>
                )}
              </div>
              {userImage ? (
                <img src={userImage} alt="" onClick={handleMyUsernameClick} />
              ) : (
                <img
                  src={
                    user?.gender === "Male"
                      ? manImage
                      : user?.gender === "Female"
                      ? womanImage
                      : customImage
                  }
                  alt=""
                  onClick={handleMyUsernameClick}
                />
              )}
            </div>
          )}
        </header>
        {activeTab === "home" && <Home2 isOtherPage={isOtherPage} />}
        {activeTab === "movies-search" && <MovieSearch />}
        {activeTab === "people-search" && <PeopleSearch />}
        {activeTab === "settings" && <Settings />}
      </div>
    </>
  );
};

export default Home;
