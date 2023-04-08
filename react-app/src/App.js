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
      dispatch(setUserIdle(data.userId));
    });
    socket.on("deactivate_user", (data) =>
      dispatch(deactivateUser(data.userId))
    );

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

    if (user) {
      const idleId = setTimeout(() => {
        console.log("i want to idle");
        socket.emit("set_idle_user");
      }, 5000);
      const deactiveId = setTimeout(() => {
        socket.emit("deactivate_user");
      }, 1800000);
      setIdleTimeOutId(idleId);
      setDeactiveTimeOutId(deactiveId);
    }
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleUserActivity);

    return () => {
      window.removeEventListener("mousemove", handleUserActivity);
    };
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    (async () => {
      socket.emit("activate_user");
      socket.emit("retrieve_active_users");
      await dispatch(authenticate()).then(() => setLoaded(true));
    })();
  }, [dispatch]);

  // useEffect(() => {
  //   // socket.emit("retrieve_active_users");
  //   socket.emit("activate_user");
  //   //eslint-disable-next-line
  // }, []);
  if (!loaded) {
    return <h1>Loading...</h1>;
  }

  return (
    loaded && (
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
    )
  );
}

export default App;
