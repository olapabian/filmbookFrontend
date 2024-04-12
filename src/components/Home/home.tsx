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
import { useNavigate } from "react-router-dom";
const Home = ({ showedPage }: { showedPage: string }) => {
  const [user, setUser] = useState<{ username: string } | null>(null);
  const [activeTab, setActiveTab] = useState<string>(showedPage);
  const navigate = useNavigate();
  useEffect(() => {
    fetchUserData();
  }, []);

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

  const handleTabChange = (tab: string) => {
    if (showedPage === "userPage") {
      navigate(`home`);
    } else {
      setActiveTab(tab);
    }
  };
  const handleMyUsernameClick = () => {
    if (user && user.username) {
      navigate(`userPage/${user.username}`);
    }
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
              className={`home ${activeTab === "home" ? "active" : ""}`}
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
          {
            <div className="my-profile">
              <div className="column">
                <h4>Twój profil</h4>
                {user && <p onClick={handleMyUsernameClick}>{user.username}</p>}
                {!user && (
                  <p onClick={handleMyUsernameClick}>Loading username...</p>
                )}
              </div>
              <img src="src\imgs\logos\czlek.jpg" alt="" />
            </div>
          }
        </header>
        {activeTab === "home" && <Home2 />}
        {activeTab === "movies-search" && <MovieSearch />}
        {activeTab === "people-search" && <PeopleSearch />}
        {activeTab === "settings" && <Settings />}
      </div>
    </>
  );
};

export default Home;
