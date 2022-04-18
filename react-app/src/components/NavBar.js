import React from "react";
import { NavLink } from "react-router-dom";
import LogoutButton from "./auth/LogoutButton";
import { useSelector } from "react-redux";
const NavBar = () => {
  const user = useSelector((state) => state.session.user);
  return (
    <nav>
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
          <div>
            <NavLink to="/login" exact={true} activeClassName="active">
              Login
            </NavLink>
            <NavLink to="/sign-up" exact={true} activeClassName="active">
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
