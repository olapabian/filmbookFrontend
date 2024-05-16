import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./scss/index.scss";
import Login from "./components/Login/login.tsx";
import Home from "./components/Home/home.tsx";
import UserPage from "./components/UserPage/userPage.tsx";
import ResultPage from "./components/Home/PeopleSearch/ResultPage/resultPage.tsx";
import MovieResultPage from "./components/Home/MovieSearch/ResultsPageMovie/resultPageMovie";
import MoviePage from "./components/MoviePage/moviePage.tsx";
import ReviewPage from "./components/ReviewPage/reviewPage.tsx";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";

const AppRouter = () => {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route
            path="/home"
            element={<Home isOtherPage={false} isMyPage={false} />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/userPage/:username" element={<UserPage />} />
          <Route path="/moviePage/:movieId" element={<MoviePage />} />
          <Route path="/peopleResult" element={<ResultPage />} />
          <Route path="/movieResult" element={<MovieResultPage />} />
          <Route path="/review/:reviewId" element={<ReviewPage />} />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(<AppRouter />);
