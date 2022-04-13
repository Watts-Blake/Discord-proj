import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import User from "./components/User";
import { authenticate } from "./store/session";
import LeftNavBar from "./components/LeftNavBar";
import MainContent from "./components/MainContent";

import { useParams } from "react-router-dom";

import { useSelector } from "react-redux";

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const servers = useSelector((state) => state.servers);
  const userServers = Object.values(servers?.userServers);
  useEffect(() => {
    (async () => {
      await dispatch(authenticate()).then(() => setLoaded(true));
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    loaded && (
      <BrowserRouter>
        <NavBar />
        <Switch>
          <Route path="/login" exact={true}>
            <LoginForm />
          </Route>
          <Route path="/sign-up" exact={true}>
            <SignUpForm />
          </Route>
          <ProtectedRoute path="/users" exact={true}>
            <UsersList />
          </ProtectedRoute>
          <ProtectedRoute path="/users/:userId" exact={true}>
            <User />
          </ProtectedRoute>
          <ProtectedRoute path="/" exact={true}>
            <h1>My Home Page</h1>
          </ProtectedRoute>
          <ProtectedRoute path="/channels">
            <div className="all">
              <LeftNavBar
                className="left_nav"
                userServers={userServers}
                user={user}
              />
              <MainContent className="main_content" user={user} />
            </div>
          </ProtectedRoute>
        </Switch>
      </BrowserRouter>
    )
  );
}

export default App;
