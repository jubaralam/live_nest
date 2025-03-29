import React from "react";
import { Route, Routes } from "react-router-dom";
import SignUp from "../pages/SignUp";
import Login from "../pages/Login";
import Home from "../pages/Home";
import LobbyScreen from "../pages/LobbyScreen";
import RoomPage from "../pages/RoomPage";
const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LobbyScreen />} />
      <Route path="/room/:roomId" element={<RoomPage />} />

      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  );
};

export default PublicRoutes;
