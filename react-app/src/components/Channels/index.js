import "./Channels.css";
import { NavLink } from "react-router-dom";
import CreateChannelModal from "../AddChannel/AddChannelModal";
import { getOneChannel } from "../../store/channels";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import EditChannelModal from "../EditChannel/EditChannelModal";
import { useContext } from "react";
import { DmRoomViewContext } from "../../context/DmRoomViewContext";

const Channels = () => {
  const { dmRoomsView, setDmRoomsView } = useContext(DmRoomViewContext);
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
  const dispatch = useDispatch();
  useEffect(() => {
    let isActive = true;
    window.location.href.includes("@me") && isActive
      ? setDmRoomsView(true)
      : setDmRoomsView(false);
    isActive && setCurrentChannelId(channelId || dmRoomId);
    if (currentServer && isActive) {
      setOwnerId(currentServer?.owner?.id);
    }
    dmRoomsView && isActive
      ? setChannels(Object.values(channelsObj.userDmChannels))
      : setChannels(Object.values(channelsObj.channels));
    return () => (isActive = false);
  }, [
    dispatch,
    currentServer,
    setOwnerId,
    channelsObj,
    channelId,
    channelsObj.userDmChannels,
    dmRoomsView,
    dmRoomId,
    setDmRoomsView,
  ]);

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

      {channels?.map((channel) => (
        <NavLink
          key={channel.id}
          to={
            dmRoomsView
              ? `/channels/@me/${channel.id}`
              : `/channels/${channel.serverId}/${channel.id}`
          }
          onClick={() => handleChannelChange(channel.id)}
        >
          <div
            className="channel"
            onMouseEnter={() => setHoverId(channel.id)}
            onMouseLeave={() => setHoverId(null)}
          >
            <div className="channel_left">
              <img
                className={`${dmRoomsView && "direct_message_icon"}`}
                src={
                  dmRoomsView
                    ? Object.keys(channel?.members).length > 2
                      ? "/svgs/group-message-ico.svg"
                      : Object.values(channel.members)[0]?.profilePicture
                    : "/svgs/pound.svg"
                }
                alt="#"
              />{" "}
              {dmRoomsView ? (
                Object.values(channel.members).map((member) => (
                  <p key={member.id}>{member.username}</p>
                ))
              ) : (
                <p>{channel.name}</p>
              )}
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
