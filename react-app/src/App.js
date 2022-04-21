import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import User from "./components/User";
import { authenticate } from "./store/session";
import LeftNavBar from "./components/LeftNavBar";
import MainContent from "./components/MainContent";
import Home from "./components/Home";
import AllServers from "./components/AllServers";
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
          <>
            <div className="logged_app">
              <LeftNavBar userServers={userServers} user={user} />

              <ProtectedRoute path="/channels">
                <MainContent className="main_content" user={user} />
              </ProtectedRoute>
              <ProtectedRoute path="/guild-discovery">
                <AllServers className="main_content" user={user} />
              </ProtectedRoute>
            </div>
          </>
        </Switch>
      </BrowserRouter>
    )
  );
}

export default App;
