import "./OneServer.css";
import Members from "../Members";
import Channels from "../Channels";
import OneChannel from "../OneChannel";
import LoggedInUserTab from "../LoggedInUserTab";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect, useContext } from "react";
import { useParams, useLocation } from "react-router-dom";
import { DmRoomViewContext } from "../../context/DmRoomViewContext";
import { leaveUserServer } from "../../store/servers";
import { clearCurrentServer } from "../../store/servers";
import { clearCurrentChannel } from "../../store/channels";
import { getOneServer } from "../../store/servers";
import { getOneChannel } from "../../store/channels";
import ServerOptions from "../ServerOptions";
import EditServerModal from "../EditServer/EditServerModal";

import { useHistory } from "react-router-dom";

const OneServer = () => {
  const [loaded, setLoaded] = useState(false);
  const { dmRoomsView, setDmRoomsView } = useContext(DmRoomViewContext);
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
  const currentChannel = channelsObj.currentChannel;
  let url = useLocation();
  const currentServer = serversObj?.currentServer;
  const membersObj = currentServer?.members;

  let history = useHistory();
  const [member, setMember] = useState(false);
  useEffect(() => {
    let membersArr;
    if (membersObj) membersArr = Object.values(membersObj);
    if (membersArr)
      setMember(membersArr.find((member) => member.userId === user.id));
    setLoaded(true);
  }, [membersObj, user.id, history]);

  useEffect(() => {
    let isActive = true;
    setChannelLoaded(false);
    if (window.location.href.includes("@me") && isActive) {
      if (dmRoomId && dmRoomId * 1 !== prevRoom && !prevRoom && isActive) {
        setChannelLoaded(false);
        dispatch(getOneChannel(dmRoomId))
          .then(() => setPrevRoom(dmRoomId))
          .catch((error) => console.log(error.message));
      }
    } else {
      if (
        isActive &&
        (serverId || channelId) &&
        serverId * 1 !== prevServerId &&
        !prevServerId
      ) {
        setChannelLoaded(false);
        dispatch(getOneServer(serverId))
          .then(() => setPrevServerId(serverId))
          .then(() => setPrevRoom(channelId))
          .catch((error) => console.log(error.message));

        if (channelId * 1 !== prevRoom && !prevRoom && isActive) {
          setChannelLoaded(false);
          dispatch(getOneChannel(channelId)).catch((error) =>
            console.log(error.message)
          );
        }
      }
    }
    setChannelLoaded(true);
    setLoaded(true);
    return () => {
      isActive = false;
      setLoaded(null);
    };
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

  const handleLeave = async () => {
    await dispatch(leaveUserServer(currentServer.id, member.id))
      .then(() => dispatch(clearCurrentServer()))
      .then(() => dispatch(clearCurrentChannel()))
      .then(() => setDmRoomsView(false));
  };

  return (
    loaded && (
      <div
        className="one_server"
        id="one_server"
        onClick={handleCloseServerOpts}
      >
        <div className="header">
          {currentChannel?.serverId ? (
            <div className="server_options">
              <h2 className="server_options_name">
                {serversObj.currentServer?.name}
              </h2>

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
          ) : (
            <div className="server_options">
              <h2 className="server_options_name">{user.username}</h2>
            </div>
          )}
          {channelLoaded &&
            (!dmRoomsView ? (
              <div className="channel_header">
                <img src="/svgs/pound.svg" alt="#" />
                {channelsObj.currentChannel?.name}
              </div>
            ) : (
              dmRoomsView && (
                <div className="channel_header">{user.username}'s </div>
              )
            ))}
        </div>
        <div className="one_channel_container">
          <div className="channels_container">
            {!dmRoomsView && (
              <Channels channels={channelsObj} className="channels" />
            )}
            {dmRoomsView && (
              <Channels
                channels={channelsObj}
                dmRoomsView={dmRoomsView}
                className="channels"
              />
            )}
            <LoggedInUserTab user={user} />
            {showServerOptions && (
              <ServerOptions
                setShowModal={setShowModal}
                serversObj={serversObj}
                user={user}
                handleLeave={handleLeave}
                member={member}
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
              <Members
                serversObj={serversObj}
                channelsObj={channelsObj}
                className="members"
              />
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
