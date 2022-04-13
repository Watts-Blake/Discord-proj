import "./Servers.css";
import { useState } from "react";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { getOneServer } from "../../store/servers";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getOneChannel } from "../../store/channels";
const Servers = ({ userServers }) => {
  const [loaded, setLoaded] = useState(false);
  const servers = Object.values(userServers);

  const grabFirstChannelId = (channels) => {
    let newChannels = Object.values(channels);
    return newChannels[0].id;
  };

  let history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    setLoaded(true);
  }, [userServers]);

  const handleServerClick = async (channelId, serverId) => {
    await dispatch(getOneServer(serverId)).then(() =>
      dispatch(getOneChannel(serverId, channelId))
    );
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
