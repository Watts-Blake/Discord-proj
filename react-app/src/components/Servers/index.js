import "./Servers.css";
import { useState } from "react";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { getOneServer } from "../../store/servers";
import { getOneChannel } from "../../store/channels";
import { useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { useContext } from "react";
import { DmRoomViewContext } from "../../context/DmRoomViewContext";

const Servers = ({ userServers }) => {
  const [loaded, setLoaded] = useState(false);
  const { setDmRoomsView } = useContext(DmRoomViewContext);

  const dispatch = useDispatch();
  useEffect(() => {
    setLoaded(true);
  }, [userServers]);

  const handleServerClick = async (serverId, channelId) => {
    await dispatch(getOneServer(serverId))
      .then(() => dispatch(getOneChannel(channelId)))
      .then(() => setDmRoomsView(false));

    return <Redirect to={`/channels/${serverId}/${channelId}`} />;
  };

  return (
    loaded && (
      <div className="server_container">
        {userServers?.map((server) => (
          <NavLink
            to={`/channels/${server.id}/${server.firstChannelId}`}
            onClick={() => handleServerClick(server.id, server.firstChannelId)}
            key={server.id}
          >
            <img
              className="left_side_server_icon"
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
