import LeftNavBar from "../LeftNavBar";
import ProtectedRoute from "../auth/ProtectedRoute";
import MainContent from "../MainContent";
import AllServers from "../AllServers";
import {
  receiveMessage,
  updateMessage,
  deleteMessage,
} from "../../store/messages";

import {
  setActiveUsers,
  activateUser,
  deactivateUser,
  setUserIdle,
} from "../../store/users";

import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

import { io } from "socket.io-client";
let socket;

const LoggedApp = ({ user, loggedAppLoaded, setLoggedAppLoaded }) => {
  const dispatch = useDispatch();
  const servers = useSelector((state) => state.servers);
  const userServers = Object.values(servers.userServers);
  const onlineUsers = useSelector((state) => state.users);
  const [deactiveTimeOutId, setDeactiveTimeOutId] = useState();
  const [idleTimeOutId, setIdleTimeOutId] = useState();

  useEffect(() => {
    socket = io();
    socket.on("connect", (data) => {
      if (data) {
        dispatch(activateUser(data));
        setLoggedAppLoaded(true);
      }
    });
    socket.on("retrieve_active_users", (data) => {
      dispatch(setActiveUsers(data));
    });
    socket.on("set_rooms", (data) => {});
    socket.on("join_room", (data) => {});
    socket.on("leave_room", (data) => {});
    socket.on("room_notification", (data) => {});
    socket.on("clear_room_notifications", (data) => {});
    socket.on("set_idle_user", (data) => {
      dispatch(setUserIdle(data));
    });
    socket.on("deactivate_user", async (data) => {
      dispatch(deactivateUser(data));
    });

    socket.on("receive_message", (data) => {
      const { message, channelId, serverId } = data;
      dispatch(receiveMessage(message, channelId, serverId));
    });

    return () => {
      socket.off("retrieve_active_users");
      socket.off("activate_user");
      socket.off("set_idle_user");
      socket.off("deactive_user");
      socket.off("connect");
      socket.off("set_rooms");
      socket.off("join_room");
      socket.off("leave_room");
      socket.off("room_notification");
      socket.off("clear_room_notifications");
      socket.disconnect();
    };
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    socket.emit("join_room", { room: `user room: ${user.id}` });
    socket.emit("retrieve_active_users", { room: `user: ${user.id}` });
    socket.emit("join_rooms");
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
