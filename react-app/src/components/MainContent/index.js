import "./MainContent.css";
import OneServer from "../OneServer";
import ProtectedRoute from "../auth/ProtectedRoute";
import { Switch } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { DmRoomViewContext } from "../../context/DmRoomViewContext";
import Wampus from "../Wampus";
import DmChannels from "../DmChannels";

const MainContent = ({ user }) => {
  const { dmRoomsView, setDmRoomsView } = useContext(DmRoomViewContext);
  const [loaded, setLoaded] = useState(false);
  let url = useLocation();

  useEffect(() => {
    let isActive = true;
    isActive && setLoaded(false);
    isActive && url.pathname.includes("@me")
      ? setDmRoomsView(true)
      : setDmRoomsView(false);
    setLoaded(true);
    return () => (isActive = false);
  }, [setDmRoomsView, url.pathname, dmRoomsView]);

  return (
    loaded && (
      <>
        <Switch>
          <ProtectedRoute path="/channels/@me/:dmRoomId(\d+)" exact={true}>
            <DmChannels />
          </ProtectedRoute>
          <ProtectedRoute path="/channels/:serverId(\d+)">
            <OneServer />
          </ProtectedRoute>
          <ProtectedRoute path="/channels/wampus/404" exact={true}>
            <Wampus />
          </ProtectedRoute>
          <ProtectedRoute path="/channels/*">
            <Wampus />
          </ProtectedRoute>
        </Switch>
      </>
    )
  );
};

export default MainContent;
