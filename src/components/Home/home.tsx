import { Component } from "react";
import { getUserInfo } from "../../Helpers/axios_helper";
import "./home.scss";
import { FaHome } from "react-icons/fa";
import { BiCameraMovie } from "react-icons/bi";
import { IoMdPerson, IoMdSettings } from "react-icons/io";
import Home2 from "./Home2/home2";
import MovieSearch from "./MovieSearch/movieSearch";

interface State {
  user: { username: string } | null;
  activeTab: string;
}

interface Review {
  id: number;
  title: string;
  content: string;
  images: string[];
}

interface ReviewProps {
  reviews: Review[];
}

class Home extends Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      user: null,
      activeTab: "home", // Ustawienie początkowej aktywnej zakładki
    };
  }

  componentDidMount() {
    this.fetchUserData();
  }

  fetchUserData() {
    getUserInfo()
      .then((response) => {
        this.setState({ user: response.data });
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        this.setState({ user: null });
      });
  }

  handleTabChange(tab: string) {
    this.setState({ activeTab: tab });
  }

  render() {
    const { user, activeTab } = this.state;
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
                onClick={() => this.handleTabChange("home")}
              >
                <FaHome />
              </div>
              <div
                className={`movies-search ${
                  activeTab === "movies-search" ? "active" : ""
                }`}
                onClick={() => this.handleTabChange("movies-search")}
              >
                <BiCameraMovie />
              </div>
              <div
                className={`people-search ${
                  activeTab === "people-search" ? "active" : ""
                }`}
                onClick={() => this.handleTabChange("people-search")}
              >
                <IoMdPerson />
              </div>
              <div
                className={`settings ${
                  activeTab === "settings" ? "active" : ""
                }`}
                onClick={() => this.handleTabChange("settings")}
              >
                <IoMdSettings />
              </div>
            </nav>
            <div className="my-profile">
              <div className="column">
                <p>Twój profil</p>
                {user && <p>{user.username}</p>}
                {!user && <p>Loading username...</p>}
              </div>
              <img src="src\imgs\logos\czlek.jpg" alt="" />
            </div>
          </header>
          {activeTab === "home" && <Home2 />}{" "}
          {activeTab === "movies-search" && <MovieSearch />}{" "}
          {/* {activeTab === "people-search" && <PeopleSearch />}{" "}
          {activeTab === "settings" && <Settings />}{" "} */}
        </div>
      </>
    );
  }
}

export default Home;
