import React, { useState, useEffect } from "react";
import "./home2.scss";

import { getUsername } from "../../../Helpers/axios_helper";
import { UserInfo } from "../../../Helpers/user_info_helper";
import Reviews from "../../Reviews/reviews";
const Home2 = ({ isOtherPage }: { isOtherPage: boolean }) => {
  const [user, setUser] = useState<UserInfo | null>(null);
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
  return (
    !isOtherPage && (
      <main>
        {/* <div className="left-side"></div> */}
        <div className="middle-home2">
          <Reviews
            reviewType={"followingReviews"}
            showMovie={true}
            userId={user?.userId}
            movieId={undefined}
            showUsers={true}
          />
        </div>

        {/* <div className="right-side">
          <h1>Obserwowani</h1>
          <div className="friends-separator"></div>
          <div className="friend-view">
            <img src="src\imgs\logos\czlek.jpg" alt="" />
            <div>
              <p>Krzysiu</p>
            </div>
          </div>
        </div> */}
      </main>
    )
  );
};

export default Home2;
