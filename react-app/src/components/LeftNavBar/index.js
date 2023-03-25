import "./LeftNavBar.css";
import Servers from "../Servers";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import CreateServerModal from "../CreateServer/CreateServerModal";

import { useSelector, useDispatch } from "react-redux";
import { useContext } from "react";
import { DmRoomViewContext } from "../../context/DmRoomViewContext";
import { getOneChannel } from "../../store/channels";

const LeftNavBar = ({ userServers, user }) => {
  const [hover, setHover] = useState(false);
  const dispatch = useDispatch();
  const { dmRoomsView, setDmRoomsView } = useContext(DmRoomViewContext);
  const userDmRooms = useSelector((state) => state.channels.userDmChannels);

  const handleHomeClick = async (channelId) => {
    await dispatch(getOneChannel(channelId)).then(() => setDmRoomsView(true));
  };
  return (
    user && (
      <div className="left_side" id="left_nav">
        <NavLink
          className="home_dm_btn"
          to={`/channels/@me/${Object.values(userDmRooms)[0].id}`}
          onClick={() => handleHomeClick(Object.values(userDmRooms)[0].id)}
        >
          <div className="icon_container">
            <img
              className="left_side_icon"
              src="/svgs/gray-disc-home.svg"
              alt="home"
            ></img>
          </div>
        </NavLink>
        <span className="home_seperator" />
        <Servers
          userServers={userServers}
          setDmRoomsView={setDmRoomsView}
          dmRoomsView={dmRoomsView}
        ></Servers>
        <CreateServerModal></CreateServerModal>
        <NavLink
          to="/guild-discovery"
          onMouseEnter={() => setHover("guild")}
          onMouseLeave={() => setHover(null)}
        >
          <div
            className={
              hover === "guild" ? "hover icon_container" : "icon_container"
            }
          >
            <img
              className="left_side_icon"
              src={
                hover === "guild"
                  ? "/svgs/svgexport-16-white.svg"
                  : "/svgs/svgexport-16.svg"
              }
              alt="explore"
            ></img>
          </div>
        </NavLink>
        <a href="https://github.com/Watts-Blake/Discord-proj">
          <div className="icon_container">
            <img
              className="left_side_icon"
              src="/svgs/github.svg"
              alt="github"
            />
          </div>{" "}
        </a>
        <a href="https://www.linkedin.com/in/blake-watts-b91428123/">
          {" "}
          <div className="icon_container">
            <img
              className="left_side_icon"
              src="/svgs/LinkedIn.svg"
              alt="linkedin"
            />
          </div>
        </a>
      </div>
    )
  );
};

export default LeftNavBar;
