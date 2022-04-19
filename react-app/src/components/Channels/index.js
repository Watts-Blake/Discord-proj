import "./Channels.css";
import { NavLink } from "react-router-dom";
import CreateChannelModal from "../AddChannel/AddChannelModal";
import { getOneChannel } from "../../store/channels";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import EditChannelModal from "../EditChannel/EditChannelModal";

const Channels = ({ setDmRoomsView, dmRoomsView }) => {
  const { channelId, dmRoomId } = useParams();

  const [ownerId, setOwnerId] = useState();
  const [currentChannelId, setCurrentChannelId] = useState(channelId);
  const [hoverId, setHoverId] = useState(null);
  const [channels, setChannels] = useState();
  // const [showServerOptions, setShowServerOptions] = useState(false)
  const user = useSelector((state) => state.session.user);
  const currentServer = useSelector((state) => state.servers.currentServer);
  const channelsObj = useSelector((state) => state.channels);
  let url = useLocation();
  useEffect(() => {
    setCurrentChannelId(channelId);
    if (currentServer) {
      setOwnerId(currentServer?.owner?.id);
    }
    url.pathname.includes("@me") ? setDmRoomsView(true) : setDmRoomsView(false);
  }, [
    channelId,
    currentServer,
    setOwnerId,
    dmRoomId,
    url.pathname,
    dmRoomsView,
    setDmRoomsView,
  ]);

  const dispatch = useDispatch();
  const handleChannelChange = async (channelId) => {
    url.pathname.includes("@me") ? setDmRoomsView(true) : setDmRoomsView(false);
    await dispatch(getOneChannel(channelId)).then(() =>
      setCurrentChannelId(channelId)
    );
  };
  return (
    <div className="channels">
      <div className="channels_header">
        {!dmRoomsView && <h4>TEXT CHANNELS</h4>}
        {dmRoomsView && <h4>DIRECT MESSAGES</h4>}
        <CreateChannelModal user={user} />
      </div>
      {!dmRoomsView &&
        Object.values(channelsObj?.channels).map((channel) => (
          <NavLink
            key={channel.id}
            to={`/channels/${channel.serverId}/${channel.id}`}
            onClick={() => handleChannelChange(channel.id)}
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
                (ownerId === user.id && hoverId === channel.id)) &&
                channel.name !== "General" && (
                  <div className="channel_right">
                    <img src="/svgs/addMemb.svg" alt="add" />
                    <EditChannelModal channel={channel} user={user} />
                  </div>
                )}
            </div>
          </NavLink>
        ))}
      {dmRoomsView &&
        Object.values(channelsObj?.userDmChannels)?.map((channel) => (
          <NavLink
            key={channel.id}
            to={`/channels/@me/${channel.id}`}
            onClick={() => handleChannelChange(channel.id)}
          >
            <div
              className="channel"
              onMouseEnter={() => setHoverId(channel.id)}
              onMouseLeave={() => setHoverId(null)}
            >
              <div className="channel_left">
                <img
                  className="direct_message_icon"
                  src={
                    Object.keys(channel?.members).length > 2
                      ? "/svgs/group-message-ico.svg"
                      : Object.values(channel.members)[0]?.profilePicture
                  }
                  alt="people"
                />
                {Object.values(channel.members).map((member) => (
                  <p key={member.id}>{member.username}</p>
                ))}
              </div>
              {((ownerId === user.id && currentChannelId * 1 === channel.id) ||
                (ownerId === user.id && hoverId === channel.id)) &&
                channel.name !== "General" && (
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
