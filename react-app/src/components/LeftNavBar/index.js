import "./LeftNavBar.css";
import Servers from "../Servers";
import { NavLink } from "react-router-dom";
import CreateServerModal from "../CreateServer/CreateServerModal";

const LeftNavBar = ({ userServers }) => {
  return (
    <div className="left_side">
      <NavLink to={`/home/dm-groups`}>
        <img
          className="left_side_icon"
          src="../../../public/images/svgexport-4.png"
          alt="home"
        ></img>
      </NavLink>
      <Servers userServers={userServers}></Servers>
      <CreateServerModal></CreateServerModal>
      <NavLink to="/home/guild-discovery">
        <img
          className="left_side_icon"
          src="../../../public/images/svgexport-16.png"
          alt="explore"
        ></img>
      </NavLink>
    </div>
  );
};

export default LeftNavBar;
