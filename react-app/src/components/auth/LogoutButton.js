import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import { useSelector } from "react-redux";

const LogoutButton = () => {
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const onLogout = async (e) => {
    await dispatch(logout());
  };

  return user && <button onClick={onLogout}>Logout</button>;
};

export default LogoutButton;
