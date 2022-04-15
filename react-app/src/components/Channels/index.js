import "./Channels.css";
import { NavLink } from "react-router-dom";
import CreateChannelModal from "../AddChannel/AddChannelModal";
import { getOneChannel } from "../../store/channels";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import EditChannelModal from "../EditChannel/EditChannelModal";
const Channels = ({ channels }) => {
  const channelsArr = Object.values(channels.channels);
  const { channelId } = useParams();

  const [currentChannelId, setCurrentChannelId] = useState(channelId);
  const [hoverId, setHoverId] = useState(null);
  // const [showServerOptions, setShowServerOptions] = useState(false)
  const user = useSelector((state) => state.session.user);
  const ownerId = useSelector((state) => state.servers.currentServer.owner.id);

  useEffect(() => {
    setCurrentChannelId(channelId);
  }, [channelId]);

  const dispatch = useDispatch();
  const handleChannelChange = async (serverId, channelId) => {
    await dispatch(getOneChannel(serverId, channelId)).then(() =>
      setCurrentChannelId(channelId)
    );
  };
  return (
    <div className="channels">
      <div className="channels_header">
        <h4>TEXT CHANNELS</h4>
        <CreateChannelModal user={user} />
      </div>
      {channelsArr?.map((channel) => (
        <NavLink
          key={`${channel.id}`}
          to={`/channels/${channel.serverId}/${channel.id}`}
          onClick={() => handleChannelChange(channel.serverId, channel.id)}
        >
          <div
            className="channel"
            onMouseEnter={() => setHoverId(channel.id)}
            onMouseLeave={() => setHoverId(null)}
          >
            {" "}
            <div className="channel_left">
              <img src="/svgs/pound.svg" alt="#" /> <p>{channel.name}</p>
            </div>
            {((ownerId === user.id && currentChannelId * 1 === channel.id) ||
              (ownerId === user.id && hoverId === channel.id)) && (
              <div className="channel_right">
                <img src="/svgs/addMemb.svg" alt="add" />
                <EditChannelModal channel={channel} user={user} />
              </div>
            )}
          </div>
        </NavLink>
      ))}
    </div>
  );
};

export default Channels;
