import "./LeftNavBar.css";
import Servers from "../Servers";
import { NavLink } from "react-router-dom";
import CreateServerModal from "../CreateServer/CreateServerModal";

import { Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useContext } from "react";
import { DmRoomViewContext } from "../../context/DmRoomViewContext";
import { getOneChannel } from "../../store/channels";

const LeftNavBar = ({ userServers, user }) => {
  const dispatch = useDispatch();
  const { dmRoomsView, setDmRoomsView } = useContext(DmRoomViewContext);
  const userDmRooms = useSelector((state) => state.channels.userDmChannels);
  console.log(userDmRooms);
  const handleHomeClick = async (channelId) => {
    setDmRoomsView(true);
    await dispatch(getOneChannel(channelId));
  };
  return (
    user && (
      <div className="left_side" id="left_nav">
        <NavLink
          to={`/channels/@me/${Object.values(userDmRooms)[0].id}`}
          onClick={() => handleHomeClick(Object.values(userDmRooms)[0].id)}
        >
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
