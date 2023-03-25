import "./Channels.css";
import { NavLink } from "react-router-dom";
import CreateChannelModal from "../AddChannel/AddChannelModal";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const Channels = () => {
  const { serverId } = useParams();

  const [hoverId, setHoverId] = useState(null);
  const [channels, setChannels] = useState();

  const user = useSelector((state) => state.session.user);
  const servers = useSelector((state) => state.servers.userServers);
  useEffect(() => {
    setChannels(Object.values(servers[serverId].channels));
    //eslint-disable-next-line
  }, [serverId]);

  return (
    <div className="channels">
      <div className="channels_header">
        <h4>TEXT CHANNELS</h4>
        {servers && user.id === servers[serverId]?.owner.id && (
          <CreateChannelModal user={user} />
        )}
      </div>

      {channels?.map((channel) => (
        <NavLink
          key={channel.id}
          to={`/channels/${channel.serverId}/${channel.id}`}
          onMouseEnter={() => setHoverId(channel.id)}
          onMouseLeave={() => setHoverId(null)}
          activeClassName="active_channel"
          className={
            hoverId === channel.id ? "channel hover_channel" : "channel"
          }
        >
          <div className="channel_left">
            <img className="channel_name_pound" src="/svgs/pound.svg" alt="#" />{" "}
            <p>{channel.name}</p>
          </div>
        </NavLink>
      ))}
    </div>
  );
};

export default Channels;
