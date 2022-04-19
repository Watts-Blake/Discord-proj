import "./LeftNavBar.css";
import Servers from "../Servers";
import { NavLink } from "react-router-dom";
import CreateServerModal from "../CreateServer/CreateServerModal";

const LeftNavBar = ({ userServers, user, dmRoomsView, setDmRoomsView }) => {
  return (
    user && (
      <div className="left_side" id="left_nav">
        <NavLink to={`/channels/@me/`} onClick={() => setDmRoomsView(true)}>
          <img
            className="left_side_icon"
            src="/svgs/gray-disc-home.svg"
            alt="home"
          ></img>
        </NavLink>
        <Servers
          userServers={userServers}
          setDmRoomsView={setDmRoomsView}
          dmRoomsView={dmRoomsView}
        ></Servers>
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
