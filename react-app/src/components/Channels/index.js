import "./Channels.css";
import { NavLink } from "react-router-dom";
import CreateChannelModal from "../AddChannel/AddChannelModal";
import EditChannelModal from "../EditChannel/EditChannelModal";
import { useSelector } from "react-redux";

import { useState } from "react";

const Channels = () => {
  const [hoverId, setHoverId] = useState(null);
  // const [channels, setChannels] = useState();

  const user = useSelector((state) => state.session.user);
  const channels = useSelector((state) =>
    Object.values(state.channels.channels)
  );
  const server = useSelector((state) => state.servers.currentServer);

  return (
    <div className="channels">
      <div className="channels_header">
        <h4 className="channels_header_txt">TEXT CHANNELS</h4>
        {server && user.id === server?.owner?.id && (
          <CreateChannelModal user={user} />
        )}
      </div>

      {channels?.map((channel) => (
        <NavLink
          key={channel.id * 4}
          to={`/channels/${channel.serverId}/${channel.id}`}
          onMouseEnter={() => setHoverId(channel.id)}
          onMouseLeave={() => setHoverId(null)}
          activeClassName="active_channel"
          className={
            hoverId === channel.id ? "channel hover_channel" : "channel"
          }
        >
          <div className="channel_left">
            <img className="channel_name_pound" src="/svgs/pound.svg" alt="#" />
            <span className="channel_name_channels">{channel.name}</span>
          </div>
          {hoverId === channel.id &&
            server.owner.id === user.id &&
            channel.name !== "General" && (
              <EditChannelModal channel={channel} user={user} />
            )}
        </NavLink>
      ))}
    </div>
  );
};

export default Channels;
