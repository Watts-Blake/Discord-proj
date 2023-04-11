import LeftNavBar from "../LeftNavBar";
import ProtectedRoute from "../auth/ProtectedRoute";
import MainContent from "../MainContent";
import AllServers from "../AllServers";
// import { logout } from "../../store/session";
import {
  setActiveUsers,
  activateUser,
  deactivateUser,
  setUserIdle,
} from "../../store/users";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
// import { useHistory } from "react-router-dom";
import { io } from "socket.io-client";
let socket;

const LoggedApp = ({ user, loggedAppLoaded, setLoggedAppLoaded }) => {
  // const user = useSelector((state) => state.session.user);
  // const history = useHistory();
  const dispatch = useDispatch();
  const servers = useSelector((state) => state.servers);
  const userServers = Object.values(servers.userServers);
  const onlineUsers = useSelector((state) => state.users);
  // const [currUserActive, setCurrUserActive] = useState(false);
  const [deactiveTimeOutId, setDeactiveTimeOutId] = useState();
  const [idleTimeOutId, setIdleTimeOutId] = useState();
  // const [socket, setSocket] = useState(io());

  useEffect(() => {
    socket = io();
    socket.on("connect", (data) => {
      console.log("right here ------->", data);
      if (data) {
        dispatch(activateUser(data));
        setLoggedAppLoaded(true);
      }

      // if (data.activatedUser.user.id === user.id) {
      //   setCurrUserActive(true);
      //   setLoggedAppLoaded(true);
      // }
    });
    socket.on("retrieve_active_users", (data) => {
      dispatch(setActiveUsers(data));
    });
    socket.on("set_idle_user", (data) => {
      dispatch(setUserIdle(data));
      // if (data.activatedUser.user.id === user.id) {
      //   setCurrUserActive(false);
      // }
    });
    socket.on("deactivate_user", async (data) => {
      dispatch(deactivateUser(data));
    });

    return () => {
      socket.off("retrieve_active_users");
      socket.off("activate_user");
      socket.off("set_idle_user");
      socket.off("deactive_user");
      socket.off("connect");
      socket.off("join_room");
      socket.disconnect();
    };
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    console.log("im runnning");
    socket.emit("join_room", { room: `user: ${user.id}` });
    socket.emit("retrieve_active_users", { room: `user: ${user.id}` });
    //eslint-disable-next-line
  }, []);
  const handleUserActivity = () => {
    clearTimeout(idleTimeOutId);
    clearTimeout(deactiveTimeOutId);

    if (user && onlineUsers[user.id] === "idle") {
      const idleId = setTimeout(() => {
        socket.emit("set_idle_user");
      }, 300000);
      setIdleTimeOutId(idleId);
    } else if (
      user &&
      onlineUsers[user.id] &&
      onlineUsers[user.id].activity !== "idle"
    ) {
      const deactiveId = setTimeout(() => {
        socket.emit("deactivate_user");
        clearTimeout(idleTimeOutId);
      }, 1800000);
      setDeactiveTimeOutId(deactiveId);
    } else {
      if (user) {
        socket.emit("activate_user");
      }
    }
  };

  return (
    loggedAppLoaded && (
      <div className="logged_app" onMouseMove={handleUserActivity}>
        <LeftNavBar userServers={userServers} user={user} />

        <ProtectedRoute path="/channels">
          <MainContent className="main_content" user={user} />
        </ProtectedRoute>
        <ProtectedRoute path="/guild-discovery">
          <AllServers className="main_content" user={user} />
        </ProtectedRoute>
      </div>
    )
  );
};

export default LoggedApp;
