import "./Channels.css";
import { NavLink } from "react-router-dom";

import { getOneChannel } from "../../store/channels";
import { useDispatch } from "react-redux";
// import { useState } from "react";

const Channels = ({ channels }) => {
  const channelsArr = Object.values(channels.channels);
  // const [showServerOptions, setShowServerOptions] = useState(false)
  const dispatch = useDispatch();
  const handleChannelChange = async (serverId, channelId) => {
    await dispatch(getOneChannel(serverId, channelId));
  };

  return (
    <div className="channels">
      {channelsArr?.map((channel) => (
        <NavLink
          key={`${channel.id}`}
          to={`/channels/${channel.serverId}/${channel.id}`}
          onClick={() => handleChannelChange(channel.serverId, channel.id)}
        >
          <span># {channel.name}</span>
        </NavLink>
      ))}
    </div>
  );
};

export default Channels;
