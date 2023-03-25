import "./OneServer.css";
import Members from "../Members";
import Channels from "../Channels";
import OneChannel from "../OneChannel";
import LoggedInUserTab from "../LoggedInUserTab";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect, useContext } from "react";
import { useParams, useLocation, Redirect, useHistory } from "react-router-dom";

import { leaveUserServer } from "../../store/servers";
import { clearCurrentServer } from "../../store/servers";
import { clearCurrentChannel } from "../../store/channels";
import { getOneServer } from "../../store/servers";
import ServerOptions from "../ServerOptions";
import EditServerModal from "../EditServer/EditServerModal";
import { checkMember } from "../../utils";
import ProtectedRoute from "../auth/ProtectedRoute";

const OneServer = () => {
  const [loaded, setLoaded] = useState(false);
  const [validated, setValidated] = useState(true);

  const { serverId, channelId } = useParams();
  const [channelLoaded, setChannelLoaded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showServerOptions, setShowServerOptions] = useState(false);

  const dispatch = useDispatch();
  const currentServer = useSelector((state) => state.servers.currentServer);
  const user = useSelector((state) => state.session.user);
  const currentChannel = useSelector((state) => state.channels.currentChannel);

  useEffect(() => {
    setLoaded(false);
    dispatch(getOneServer(serverId));
    setLoaded(true);
  }, [serverId, dispatch]);

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

  // const handleLeave = async () => {
  //   await dispatch(leaveUserServer(currentServer.id, member.id))
  //     .then(() => dispatch(clearCurrentServer()))
  //     .then(() => dispatch(clearCurrentChannel()));
  // };
  if (!validated) return <Redirect to="/channels/wampus/404" />;
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
              <h2 className="server_options_name">{currentServer?.name}</h2>

              {!showServerOptions && (
                <img
                  src="/svgs/downCarrotSharp.svg"
                  alt="downCarrot"
                  className="sever_opt_button"
                  id="open_server_opts"
                  onClick={() => setShowServerOptions(true)}
                  style={{ cursor: "pointer" }}
                />
              )}
              {showServerOptions && (
                <img
                  src="/svgs/XX.svg"
                  alt="x"
                  className="sever_opt_button"
                  onClick={() => setShowServerOptions(false)}
                  style={{ cursor: "pointer" }}
                />
              )}
            </div>
          ) : (
            <div className="server_options">
              <h2 className="server_options_name">{user.username}</h2>
            </div>
          )}
          {channelLoaded && (
            <div className="channel_header">
              <img src="/svgs/pound.svg" alt="#" />
              {currentChannel?.name}
            </div>
          )}
        </div>
        <div className="one_channel_container">
          <div className="channels_container">
            <Channels channels={currentServer.channels} className="channels" />

            <LoggedInUserTab user={user} />
            {showServerOptions && (
              <ServerOptions
                setShowModal={setShowModal}
                // serversObj={serversObj}
                // user={user}
                // handleLeave={handleLeave}
                // member={member}
              />
            )}
          </div>

          <ProtectedRoute path="/channels/:serverId(\d+)/:channelId(\d+)">
            <div className="one_channel">
              <OneChannel className="one_channel" />
            </div>

            <div className="members_container">
              <Members
                // serversObj={serversObj}
                channelsObj={currentServer.channels}
                className="members"
              />
            </div>
          </ProtectedRoute>
        </div>
        <EditServerModal
          showModal={showModal}
          setShowModal={setShowModal}
          // serversObj={serversObj}
          user={user}
        />
      </div>
    )
  );
};

export default OneServer;
