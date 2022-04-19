import "./Servers.css";
import { useState } from "react";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { getOneServer } from "../../store/servers";
import { useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";

import { getOneChannel } from "../../store/channels";
const Servers = ({ userServers, dmRoomsView, setDmRoomsView }) => {
  const [loaded, setLoaded] = useState(false);

  const grabFirstChannelId = (channels) => {
    let newChannels = Object.values(channels);
    return newChannels[0].id;
  };

  const dispatch = useDispatch();
  useEffect(() => {
    setLoaded(true);
  }, [userServers]);

  const handleServerClick = async (channelId, serverId) => {
    await dispatch(getOneServer(serverId)).then(() =>
      dispatch(getOneChannel(channelId)).then(() => setDmRoomsView(false))
    );
    return <Redirect to={`/channels/${serverId}/${channelId}`} />;
  };

  return (
    loaded && (
      <div className="server_container">
        {userServers?.map((server) => (
          <NavLink
            to={`/channels/${server.id}/${grabFirstChannelId(server.channels)}`}
            onClick={() =>
              handleServerClick(grabFirstChannelId(server.channels), server.id)
            }
            key={server.id}
          >
            <img
              className="left_side_icon"
              src={server.picture}
              alt="server icon"
            />
          </NavLink>
        ))}
      </div>
    )
  );
};

export default Servers;
