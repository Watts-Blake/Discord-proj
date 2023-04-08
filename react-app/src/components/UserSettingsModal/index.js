import "./UserSettings.css";

import React from "react";

import { logout } from "../../store/session";
import { useDispatch } from "react-redux";
import { io } from "socket.io-client";
let socket;

const UserSettings = ({ setShowModal }) => {
  const dispatch = useDispatch();
  const handleLogout = async (e) => {
    socket = io();
    socket.emit("deactivate_user");
    setShowModal(false);
    await dispatch(logout());
  };

  return (
    <div className="user_settings_modal" id="uset_container">
      <div
        className="logout_button"
        onClick={(e) => handleLogout(e)}
        id="uset_logout_btn"
      >
        <h4 id="uset_logout">Logout</h4>
        <img
          id="uset_img"
          src="/svgs/logout.svg"
          alt="logout"
          className="logout_img"
        />
      </div>
    </div>
  );
};

export default UserSettings;
