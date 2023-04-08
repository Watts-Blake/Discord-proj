import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import User from "./components/User";
import {
  setActiveUsers,
  activateUser,
  deactivateUser,
  setUserIdle,
} from "./store/users";
import { authenticate } from "./store/session";

import Home from "./components/Home";

import LoggedApp from "./components/LoggedApp";
import Wampus from "./components/Wampus";

import { io } from "socket.io-client";
let socket;

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const onlineUsers = useSelector((state) => state.users);
  const [deactiveTimeOutId, setDeactiveTimeOutId] = useState();
  const [idleTimeOutId, setIdleTimeOutId] = useState();

  useEffect(() => {
    socket = io();

    socket.on("retrieve_active_users", (data) =>
      dispatch(setActiveUsers(data))
    );
    socket.on("activate_user", (user) => {
      dispatch(activateUser(user));
    });
    socket.on("set_idle_user", (data) => {
      dispatch(setUserIdle(data));
    });
    socket.on("deactivate_user", (data) => dispatch(deactivateUser(data)));

    return () => {
      socket.off("retrieve_active_users");
      socket.off("activate_user");
      socket.off("set_idle_user");
      socket.off("deactive_user");
      // socket.disconnect();
    };
    //eslint-disable-next-line
  }, []);

  const handleUserActivity = () => {
    clearTimeout(idleTimeOutId);
    clearTimeout(deactiveTimeOutId);

    if (user && onlineUsers[user.id]) {
      const idleId = setTimeout(() => {
        // console.log("i want to idle");
        socket.emit("set_idle_user");
      }, 900000);
      const deactiveId = setTimeout(() => {
        // console.log("i want to idle");
        socket.emit("deactivate_user");
      }, 1800000);
      setIdleTimeOutId(idleId);
      setDeactiveTimeOutId(deactiveId);
    } else {
      socket.emit("activate_user");
    }
  };

  // useEffect(() => {
  //   window.addEventListener("mousemove", handleUserActivity);

  //   return () => {
  //     window.removeEventListener("mousemove", handleUserActivity);
  //   };
  //   //eslint-disable-next-line
  // }, []);

  // const [mousePosition, setMousePosition] = useState({ x: null, y: null });

  // const handleMouseMove = (e) => {
  //   setMousePosition({ x: e.clientX, y: e.clientY });
  // };
  useEffect(() => {
    (async () => {
      socket.emit("activate_user");
      socket.emit("retrieve_active_users");
      await dispatch(authenticate()).then(() => setLoaded(true));
    })();
  }, [dispatch]);

  if (!loaded) {
    return <h1>Loading...</h1>;
  }

  return (
    loaded && (
      <div onMouseMove={handleUserActivity}>
        <BrowserRouter>
          <Switch>
            <Route path="/login" exact={true}>
              <LoginForm />
            </Route>
            <Route path="/signup" exact={true}>
              <SignUpForm />
            </Route>
            <ProtectedRoute path="/users" exact={true}>
              <UsersList />
            </ProtectedRoute>
            <ProtectedRoute path="/users/:userId" exact={true}>
              <User />
            </ProtectedRoute>
            <Route path="/" exact={true}>
              <Home />
            </Route>
            <ProtectedRoute
              path={[
                "/channels",
                "/channels/@me/:dmRoomId",
                "/channels/:serverId/:channelId",
                "/guild-discovery",
              ]}
            >
              <LoggedApp />
            </ProtectedRoute>
            <Route path="/*" exact={true}>
              <Wampus />
            </Route>
          </Switch>
        </BrowserRouter>
      </div>
    )
  );
}

export default App;
