import LeftNavBar from "../LeftNavBar";
import ProtectedRoute from "../auth/ProtectedRoute";
import MainContent from "../MainContent";
import AllServers from "../AllServers";
import { useSelector } from "react-redux";

const LoggedApp = () => {
  const user = useSelector((state) => state.session.user);
  const servers = useSelector((state) => state.servers);
  const userServers = Object.values(servers.userServers);

  return (
    <div className="logged_app">
      <LeftNavBar userServers={userServers} user={user} />

      <ProtectedRoute path="/channels">
        <MainContent className="main_content" user={user} />
      </ProtectedRoute>
      <ProtectedRoute path="/guild-discovery">
        <AllServers className="main_content" user={user} />
      </ProtectedRoute>
    </div>
  );
};

export default LoggedApp;
