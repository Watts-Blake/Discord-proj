import "./MainContent.css";
import OneDmRoom from "../OneDmRoom";
import OneServer from "../OneServer";
import DmRooms from "../DmRooms";
import { BrowserRouter } from "react-router-dom";
import ProtectedRoute from "../auth/ProtectedRoute";
import { Switch } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setUserServers } from "../../store/servers";

const MainContent = ({ user }) => {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <ProtectedRoute path="/home/@me">
            <DmRooms />
          </ProtectedRoute>
          <ProtectedRoute path="/home/@me/:dmRoomId">
            <OneDmRoom />
          </ProtectedRoute>
          <ProtectedRoute path="/channels">
            <OneServer />
          </ProtectedRoute>
        </Switch>
      </BrowserRouter>
    </>
  );
};

export default MainContent;
