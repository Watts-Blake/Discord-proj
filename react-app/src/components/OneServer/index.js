import "./OneServer.css";
import Members from "../Members";
import Channels from "../Channels";
import OneChannel from "../OneChannel";
import LoggedInUserTab from "../LoggedInUserTab";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { getOneServer } from "../../store/servers";
import { getOneChannel } from "../../store/channels";
import ServerOptions from "../ServerOptions";

const OneServer = () => {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  const { serverId, channelId } = useParams();
  const serversObj = useSelector((state) => state.servers);
  const user = useSelector((state) => state.session.user);
  const channelsObj = useSelector((state) => state.channels);
  const [showServerOptions, setShowServerOptions] = useState(false);

  useEffect(() => {
    if (
      serversObj.currentServer.server === null ||
      channelsObj.currentChannel.channel === null
    ) {
      console.log("inside ifffffff");
      dispatch(getOneServer(serverId)).then(() =>
        dispatch(getOneChannel(serverId, channelId)).then(() => setLoaded(true))
      );
    } else {
      setLoaded(true);
    }
  }, [
    dispatch,
    channelsObj.currentChannel,
    serversObj.currentServer,
    serverId,
    channelId,
  ]);

  const handleCloseServerOpts = (e) => {
    if (!e.target.id.includes("server_opts")) {
      setShowServerOptions(false);
    }
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
            <h2 className="server_options_name">
              {serversObj.currentServer.name}
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
          <div className="channel_header">
            <img src="/svgs/pound.svg" alt="#" />
            {channelsObj.currentChannel.name}
          </div>
        </div>
        <div className="one_channel_container">
          <div className="channels_container">
            <Channels channels={channelsObj} className="channels" />
            <LoggedInUserTab user={user} />
            {showServerOptions && <ServerOptions />}
          </div>

          <div className="one_channel">
            <OneChannel channelsObj={channelsObj} className="one_channel" />
          </div>

          <div className="members_container">
            <Members serversObj={serversObj} className="members" />
          </div>
        </div>
      </div>
    )
  );
};

export default OneServer;
