import React from "react";
import { NavLink } from "react-router-dom";
import LogoutButton from "./auth/LogoutButton";
import { useSelector } from "react-redux";
const NavBar = () => {
  const user = useSelector((state) => state.session.user);
  return (
    <nav className="home_nav">
      <NavLink
        to="/"
        exact={true}
        activeClassName="active"
        className="home_link"
      >
        <img src="/svgs/gray-disc-home.svg" alt="home" />
        <h3>Diss-cord</h3>
      </NavLink>
      <div>
        {!user && (
          <div className="user_actions">
            <NavLink
              to="/login"
              exact={true}
              className="log_btn"
              activeClassName="active"
            >
              Login
            </NavLink>
            <NavLink to="/signup" exact={true} className="signup_btn">
              Sign Up
            </NavLink>
          </div>
        )}

        {user && <LogoutButton />}
      </div>
    </nav>
  );
};

export default NavBar;
