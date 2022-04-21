import "../OneServer/OneServer.css";
import Members from "../Members";
import Channels from "../Channels";
import OneChannel from "../OneChannel";
import LoggedInUserTab from "../LoggedInUserTab";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect, useContext } from "react";
import { useParams, useLocation } from "react-router-dom";

import { getOneChannel } from "../../store/channels";

const OneServer = () => {
  const [loaded, setLoaded] = useState(false);

  const { serverId, channelId, dmRoomId } = useParams();
  const [channelLoaded, setChannelLoaded] = useState(false);
  const [prevRoom, setPrevRoom] = useState();

  const dispatch = useDispatch();
  const serversObj = useSelector((state) => state.servers);
  const user = useSelector((state) => state.session.user);
  const channelsObj = useSelector((state) => state.channels);
  let url = useLocation();

  useEffect(() => {
    let isActive = true;
    setChannelLoaded(false);
    if (dmRoomId && dmRoomId * 1 !== prevRoom && !prevRoom && isActive) {
      setChannelLoaded(false);
      dispatch(getOneChannel(dmRoomId))
        .then(() => setPrevRoom(dmRoomId))
        .catch((error) => console.log(error.message));
    }
    setChannelLoaded(true);
    setLoaded(true);
    return () => (isActive = false);
  }, [dispatch, dmRoomId, channelId, prevRoom, serverId, url.pathname]);

  return (
    loaded && (
      <div className="one_server" id="one_server">
        <div className="header">
          <div className="server_options">
            <h2 className="server_options_name">{user.username}</h2>
          </div>

          {channelLoaded && (
            <div className="channel_header">{user.username}'s </div>
          )}
        </div>
        <div className="one_channel_container">
          <div className="channels_container">
            <Channels channels={channelsObj} className="channels" />

            <LoggedInUserTab user={user} />
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
      </div>
    )
  );
};

export default OneServer;
