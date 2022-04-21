import "./MainContent.css";
import OneServer from "../OneServer";
import { BrowserRouter } from "react-router-dom";
import ProtectedRoute from "../auth/ProtectedRoute";
import { Switch } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { DmRoomViewContext } from "../../context/DmRoomViewContext";

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
        <BrowserRouter>
          <Switch>
            <ProtectedRoute path="/channels/@me/:dmRoomId" exact={true}>
              <OneServer />
            </ProtectedRoute>
            <ProtectedRoute path="/channels/:serverId?/:channelId" exact={true}>
              <OneServer />
            </ProtectedRoute>
          </Switch>
        </BrowserRouter>
      </>
    )
  );
};

export default MainContent;
