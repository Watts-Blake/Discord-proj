import "./OneServer.css";
import Members from "../Members";
import Channels from "../Channels";
import OneChannel from "../OneChannel";
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
      <>
        <Channels channels={channelsObj} className="channels" />

        <OneChannel channelsObj={channelsObj} className="one_channel" />

        <Members serversObj={serversObj} className="members" />
      </>
    )
  );
};

export default OneServer;
