import React, { Component } from "react";
import "./home2.scss";
import { AiTwotoneLike } from "react-icons/ai";
import { FaCommentDots, FaHome } from "react-icons/fa";

class Home2 extends Component<{}> {
  render() {
    return (
      <main>
        <div className="left-side"></div>

        <div className="middle">
          <div className="review">
            <div className="review-head">
              <div className="profile-picture">
                <img src="src\imgs\logos\czlek.jpg" alt="" />
              </div>
              <div className="info">
                <div className="username">
                  <p>Basia</p>
                </div>
                <div className="time-ago">
                  <p>50 min temu</p>
                </div>
              </div>
              <div className="head-separator"></div>

              <div className="go-to-review-btn">
                <button>Do recenzji</button>
              </div>
            </div>
            <div className="up-to-head-main-separator">
              <div className="head-main-separator"></div>
            </div>

            <div className="review-main">
              <div className="movie">
                <p className="title">Tytuł</p>
                <div className="poster">
                  <img src="src\imgs\logos\poster.jpg" alt="" />
                </div>
              </div>
              <div className="review-content">
                <h2 className="review-title">Bardzo fajny film kochani</h2>
                <p className="review-text">
                  orem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. It has survived not only five centuries, but
                  also the leap into electronic typesetting, remaining
                  essentially unchanged. It was popularised in the 1960s with
                  the release of Letraset sheets containing Lorem
                </p>
              </div>
            </div>

            <div className="review-reactions">
              <div className="likes-count">
                <AiTwotoneLike />
                <p>4</p>
              </div>
              <div className="comment-count">
                <FaCommentDots />
                <p>2</p>
              </div>
            </div>

            <div className="up-to-head-main-separator">
              <div className="react-separator"></div>
            </div>
          </div>
        </div>

        <div className="right-side">
          <h1>Znajomi</h1>
          <div className="friends-separator"></div>
          <div className="friend-view">
            <img src="src\imgs\logos\czlek.jpg" alt="" />
            <div>
              <p>Krzysiu</p>
            </div>
          </div>
        </div>
      </main>
    );
  }
}
export default Home2;
