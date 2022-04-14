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

const OneServer = () => {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  const { serverId, channelId } = useParams();
  const serversObj = useSelector((state) => state.servers);
  const user = useSelector((state) => state.session.user);
  const channelsObj = useSelector((state) => state.channels);

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

  return (
    loaded && (
      <div className="one_server">
        <div className="header">
          <div className="server_options">{serversObj.currentServer.name}</div>
          <div className="channel_header">
            #{channelsObj.currentChannel.name}
          </div>
        </div>
        <div className="one_channel_container">
          <div className="channels_container">
            <Channels channels={channelsObj} className="channels" />
            <LoggedInUserTab user={user} />
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
