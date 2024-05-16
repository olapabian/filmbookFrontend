import { FC, useState, useEffect } from "react";
import {
  UserInfo,
  getUserImageByUsername,
} from "../../../../Helpers/user_info_helper";
import { useLocation, useNavigate } from "react-router-dom";
import Home from "../../home";
import "../../../UserPage/userPage.scss";
import "./resultPage.scss";
import manImage from "../../../../imgs/men.jpg";
import womanImage from "../../../../imgs/women.jpg";
import customImage from "../../../../imgs/neutral.jpg";
import { getUsername } from "../../../../Helpers/axios_helper";
interface ResultsProps {}

const ResultPage: FC<ResultsProps> = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const results: UserInfo[] = location.state?.results || [];
  const [user, setUser] = useState<UserInfo | null>(null);
  const [userImages, setUserImages] = useState<{
    [userId: number]: string | null;
  }>({});
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
  const followed = (result: UserInfo): boolean => {
    if (result && user && typeof result.followersIds === "string") {
      const followersArray = result.followersIds.split(";");
      for (const followerId of followersArray) {
        if (followerId === user.userId.toString()) {
          return true;
        }
      }
    }
    return false;
  };
  return (
    <>
      <Home isOtherPage={true} isMyPage={false} />
      <main>
        <div className="left-user-page"></div>
        <div className="main-div-user-page-resultPage">
          {results.map((result) => (
            <div key={result.userId} className="result-item-resultPage">
              <div
                className="result-content-resultPage"
                onClick={() => goToUserPage(result)}
              >
                {getUserImage(result.userId, result.username) ? (
                  <img
                    src={getUserImage(result.userId, result.username)!}
                    alt=""
                  />
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
                <div className="text-fields-resultPage">
                  <div className="firstName-lastName-resultPage">
                    <p>{result.firstName}</p>
                    <p>{result.lastName}</p>
                  </div>
                  <div className="username-results-resultPage">
                    <p>{result.username}</p>
                  </div>
                  <div className="followers">
                    <p>Obserwujący: {result.followersCount}</p>
                  </div>
                  <div className="following">
                    <p>Obserwowani:{result.followingCount}</p>
                  </div>
                  <div className="znajomy">
                    <p>
                      {user &&
                        (result.userId === user.userId
                          ? "Ty"
                          : followed(result)
                          ? "Obserwujesz"
                          : "Nie obserwujesz")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="rigth-user-page"></div>
      </main>
    </>
  );
};

export default ResultPage;
