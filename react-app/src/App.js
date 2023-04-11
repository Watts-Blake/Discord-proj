import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import User from "./components/User";
import { authenticate } from "./store/session";

import Home from "./components/Home";

import LoggedApp from "./components/LoggedApp";
import Wampus from "./components/Wampus";

// import { io } from "socket.io-client";
// let socket;

function App() {
  const [loaded, setLoaded] = useState(false);
  const [loggedAppLoaded, setLoggedAppLoaded] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  // const onlineUsers = useSelector((state) => state.users);
  // const [deactiveTimeOutId, setDeactiveTimeOutId] = useState();
  // const [idleTimeOutId, setIdleTimeOutId] = useState();
  // const [runSocket, setRunSocket] = useState(false);
  // const [userId, setUserId] = useState();
  // const history = useHistory();

  // useEffect(() => {
  //   socket = io();
  // }, []);
  // const handleUserActivity = () => {
  //   clearTimeout(idleTimeOutId);
  //   clearTimeout(deactiveTimeOutId);

  //   if (user && onlineUsers[user.id] === "idle") {
  //     const idleId = setTimeout(() => {
  //       socket.emit("set_idle_user");
  //     }, 300000);
  //     setIdleTimeOutId(idleId);
  //   } else if (
  //     user &&
  //     onlineUsers[user.id] &&
  //     onlineUsers[user.id].activity !== "idle"
  //   ) {
  //     const deactiveId = setTimeout(() => {
  //       socket.emit("deactivate_user");
  //       clearTimeout(idleTimeOutId);
  //     }, 1800000);
  //     setDeactiveTimeOutId(deactiveId);
  //   } else {
  //     if (user) {
  //       socket.emit("activate_user");
  //     }
  //   }
  // };

  useEffect(() => {
    (async () =>
      await dispatch(authenticate()).then(() => {
        setLoaded(true);
      }))();

    // dispatch(authenticate());
  }, [dispatch]);

  if (!loaded) {
    return <h1>Loading...</h1>;
  }

  return (
    loaded && (
      <div>
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
              {user && (
                <LoggedApp
                  setLoggedAppLoaded={setLoggedAppLoaded}
                  loggedAppLoaded={loggedAppLoaded}
                  user={user}
                />
              )}
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
