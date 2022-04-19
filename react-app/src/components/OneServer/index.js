import "./OneServer.css";
import Members from "../Members";
import Channels from "../Channels";
import OneChannel from "../OneChannel";
import LoggedInUserTab from "../LoggedInUserTab";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";

import { getOneServer } from "../../store/servers";
import { getOneChannel } from "../../store/channels";
import ServerOptions from "../ServerOptions";
import EditServerModal from "../EditServer/EditServerModal";
import { clearCurrentChannel } from "../../store/channels";

const OneServer = ({ setDmRoomsView, dmRoomsView }) => {
  const [loaded, setLoaded] = useState(false);
  const { serverId, channelId, dmRoomId } = useParams();
  const [channelLoaded, setChannelLoaded] = useState(false);
  const [prevRoom, setPrevRoom] = useState();
  const [prevServerId, setPrevServerId] = useState();
  const [showModal, setShowModal] = useState(false);
  const [showServerOptions, setShowServerOptions] = useState(false);

  const dispatch = useDispatch();
  const serversObj = useSelector((state) => state.servers);
  const user = useSelector((state) => state.session.user);
  const channelsObj = useSelector((state) => state.channels);
  let url = useLocation();

  useEffect(() => {
    console.log("urlllllllllll", dmRoomsView);
    setChannelLoaded(false);
    if (dmRoomsView) {
      if (dmRoomId && dmRoomId * 1 !== prevRoom) {
        setChannelLoaded(false);
        dispatch(getOneChannel(dmRoomId))
          .then(() => setPrevRoom(dmRoomId))
          .then(() => setLoaded(true));
      }
    } else {
      if (serverId && channelId) {
        if (serverId * 1 !== prevServerId) {
          setChannelLoaded(false);
          dispatch(getOneServer(serverId))
            .then(() => setPrevServerId(serverId))
            .then(() => setPrevRoom(channelId))
            .then(() => setLoaded(true));
          if (channelId * 1 !== prevRoom) {
            setChannelLoaded(false);
            dispatch(getOneChannel(channelId));
          }
        }
      }
    }
    setChannelLoaded(true);
    setLoaded(true);
  }, [
    dispatch,
    dmRoomId,
    channelId,
    prevRoom,
    prevServerId,
    serverId,
    url.pathname,
  ]);

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
          {serverId && (
            <div className="server_options">
              {!dmRoomsView && (
                <h2 className="server_options_name">
                  {serversObj.currentServer.name}
                </h2>
              )}
              {dmRoomsView && (
                <h2 className="server_options_name">{user.username}</h2>
              )}
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
          )}
          {channelLoaded &&
            (!dmRoomsView ? (
              <div className="channel_header">
                <img src="/svgs/pound.svg" alt="#" />
                {channelsObj.currentChannel?.name}
              </div>
            ) : (
              <div className="channel_header">{user.username}'s </div>
            ))}
        </div>
        <div className="one_channel_container">
          <div className="channels_container">
            {!dmRoomsView && (
              <Channels
                channels={channelsObj}
                dmRoomsView={dmRoomsView}
                setDmRoomsView={setDmRoomsView}
                className="channels"
              />
            )}
            {dmRoomsView && (
              <Channels
                channels={channelsObj}
                dmRoomsView={dmRoomsView}
                setDmRoomsView={setDmRoomsView}
                className="channels"
              />
            )}
            <LoggedInUserTab user={user} />
            {showServerOptions && (
              <ServerOptions
                setShowModal={setShowModal}
                serversObj={serversObj}
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
              <Members serversObj={serversObj} className="members" />
            )}
          </div>
        </div>
        <EditServerModal
          showModal={showModal}
          setShowModal={setShowModal}
          serversObj={serversObj}
          user={user}
        />
      </div>
    )
  );
};

export default OneServer;
