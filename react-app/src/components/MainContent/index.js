import "./MainContent.css";
import OneServer from "../OneServer";
import { BrowserRouter } from "react-router-dom";
import ProtectedRoute from "../auth/ProtectedRoute";
import { Switch } from "react-router-dom";
import { useState } from "react";

const MainContent = ({ user, dmRoomsView, setDmRoomsView }) => {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <ProtectedRoute path="/channels/@me/:dmRoomId" exact={true}>
            <OneServer
              setDmRoomsView={setDmRoomsView}
              dmRoomsView={dmRoomsView}
            />
          </ProtectedRoute>
          <ProtectedRoute path="/channels/:serverId?/:channelId" exact={true}>
            {!dmRoomsView && (
              <OneServer setDmRoomsView={setDmRoomsView} dmRoomsView={false} />
            )}
          </ProtectedRoute>
        </Switch>
      </BrowserRouter>
    </>
  );
};

export default MainContent;
