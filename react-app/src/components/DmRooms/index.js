import "../OneServer/OneServer.css";
import Members from "../Members";
import Channels from "../Channels";
import OneChannel from "../OneChannel";
import LoggedInUserTab from "../LoggedInUserTab";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect, useContext } from "react";
import { useParams, useLocation } from "react-router-dom";
import { DmRoomViewContext } from "../../context/DmRoomViewContext";

import { getOneServer } from "../../store/servers";
import { getOneChannel } from "../../store/channels";
import ServerOptions from "../ServerOptions";
import EditServerModal from "../EditServer/EditServerModal";

const OneServer = () => {
  const { dmRoomsView, setDmRoomsView } = useContext(DmRoomViewContext);
  const [loaded, setLoaded] = useState(false);
  const { dmRoomId } = useParams();
  const [channelLoaded, setChannelLoaded] = useState(false);
  const [prevRoom, setPrevRoom] = useState();

  const [showModal, setShowModal] = useState(false);
  const [showServerOptions, setShowServerOptions] = useState(false);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const channelsObj = useSelector((state) => state.channels);

  useEffect(() => {
    if (window.location.href.includes("@me")) {
      setDmRoomsView(true);
      if (dmRoomId && dmRoomId * 1 !== prevRoom) {
        setLoaded(false);
        setChannelLoaded(false);
        dispatch(getOneChannel(dmRoomId)).then(() => setPrevRoom(dmRoomId));
      }
      setChannelLoaded(true);
      setLoaded(true);
    }
  }, [dispatch, dmRoomId, dmRoomsView, prevRoom, setDmRoomsView]);

  const handleCloseServerOpts = (e) => {
    if (!showServerOptions) return;
    if (!e.target.id.includes("server_opts")) {
      setShowServerOptions(false);
    }
    let leftNav = document.getElementById("left_nav");
    leftNav.addEventListener("click", (e) => {
      if (!e.target.id.includes("server_opts")) {
        setShowServerOptions(false);
      }
    });
  };

  return (
    loaded && (
      <div
        className="one_server"
        id="one_server"
        onClick={handleCloseServerOpts}
      >
        <div className="header">
          <div className="server_options">
            <h2 className="server_options_name">{user.username}</h2>

            {!showServerOptions && (
              <img
                src="/svgs/downCarrotSharp.svg"
                alt="downCarrot"
                className="sever_opt_button"
                id="open_server_opts"
                onClick={() => setShowServerOptions(true)}
              />
            )}
            {showServerOptions && (
              <img
                src="/svgs/XX.svg"
                alt="x"
                className="sever_opt_button"
                onClick={() => setShowServerOptions(false)}
              />
            )}
          </div>

          {channelLoaded && (
            <div className="channel_header">{user.username}'s </div>
          )}
        </div>
        <div className="one_channel_container">
          <div className="channels_container">
            <Channels channels={channelsObj} className="channels" />
            <LoggedInUserTab user={user} />
            {showServerOptions && (
              <ServerOptions
                setShowModal={setShowModal}
                channelsObj={channelsObj}
                user={user}
              />
            )}
          </div>

          <div className="one_channel">
            {channelLoaded && (
              <OneChannel channelsObj={channelsObj} className="one_channel" />
            )}
          </div>

          <div className="members_container">
            {channelLoaded && (
              <Members channelssObj={channelsObj} className="members" />
            )}
          </div>
        </div>
        <EditServerModal
          showModal={showModal}
          setShowModal={setShowModal}
          channelsObj={channelsObj}
          user={user}
        />
      </div>
    )
  );
};

export default DmRooms;
