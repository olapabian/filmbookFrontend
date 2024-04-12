import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./scss/index.scss";
import Login from "./components/Login/login.tsx";
import Home from "./components/Home/home.tsx";
import UserPage from "./components/UserPage/userPage.tsx";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home isOtherPage={false} />} />
        <Route path="/login" element={<Login />}></Route>
        <Route path="/home/userPage/:username" element={<UserPage />}></Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
