import "./MainContent.css";
import OneServer from "../OneServer";
import ProtectedRoute from "../auth/ProtectedRoute";
import { Switch } from "react-router-dom";
import LoggedHome from "../LoggedHome";
import Wampus from "../Wampus";

const MainContent = ({ user }) => {
  return (
    <>
      <Switch>
        <ProtectedRoute path="/channels/@me">
          <LoggedHome />
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
  );
};

export default MainContent;
