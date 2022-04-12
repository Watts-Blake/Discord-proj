import "./MainContent.css";
import OneDmRoom from "../OneDmRoom";
import OneServer from "../OneServer";
import DmRooms from "../DmRooms";
import { BrowserRouter } from "react-router-dom";
import ProtectedRoute from "../auth/ProtectedRoute";
import { Switch } from "react-router-dom";

const MainContent = () => {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <ProtectedRoute path="/home/dm-rooms">
            <DmRooms />
          </ProtectedRoute>
          <ProtectedRoute path="/home/dm-rooms/:dmRoomId">
            <OneDmRoom />
          </ProtectedRoute>
          <ProtectedRoute path="/home/servers/:serverId" exact={true}>
            <OneServer />
          </ProtectedRoute>
        </Switch>
      </BrowserRouter>
    </>
  );
};

export default MainContent;
