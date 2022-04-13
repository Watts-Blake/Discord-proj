import "./LeftNavBar.css";
import Servers from "../Servers";
import { NavLink, Redirect } from "react-router-dom";
import CreateServerModal from "../CreateServer/CreateServerModal";
import { useEffect, useState } from "react";
const LeftNavBar = ({ userServers, user }) => {
  return (
    user && (
      <div className="left_side">
        <NavLink to={`/home/dm-groups`}>
          <img
            className="left_side_icon"
            src="/svgs/svgexport-4.svg"
            alt="home"
          ></img>
        </NavLink>
        <Servers userServers={userServers}></Servers>
        <CreateServerModal></CreateServerModal>
        <NavLink to="/home/guild-discovery">
          <img
            className="left_side_icon"
            src="/svgs/svgexport-16.svg"
            alt="explore"
          ></img>
        </NavLink>
      </div>
    )
  );
};

export default LeftNavBar;
