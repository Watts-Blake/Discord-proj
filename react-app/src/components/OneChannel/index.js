import "./OneChannel.css";
import Messages from "../Messages";
import ChatInput from "../ChatInput";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { getOneChannel } from "../../store/channels";
import { setMessages } from "../../store/messages";

import { checkChannel, checkDmRoom, checkServer } from "../../utils";
import { io } from "socket.io-client";
let socket;

const OneChannel = () => {
  const { serverId, channelId, dmRoomId } = useParams();
  const [loaded, setLoaded] = useState(false);
  // const [prevRoom, setPrevRoom] = useState(`channel${channelId || dmRoomId}`);
  // const [socketRoom, setSocketRoom] = useState();
  // const [messages, setMessages] = useState([]);

  const currentServer = useSelector((state) => state.servers.currentServer);
  const currentChannel = useSelector((state) => state.channels.currentChannel);
  const messages = useSelector((state) => state.messages);
  const serverChannels = useSelector((state) => state.channels.channels);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    let isActive = true;
    if (isActive) {
      setLoaded(false);
      if (checkDmRoom(dmRoomId)) {
        (async () =>
          await dispatch(getOneChannel(dmRoomId))
            .then((channel) =>
              dispatch(
                setMessages(channel.messages, channel.id, channel.serverId)
              )
            )
            .then(() => setLoaded(true)))();
        // setSocketRoom(`channel : ${dmRoomId}`);
      } else if (checkChannel(channelId, currentChannel)) {
        (async () =>
          await dispatch(getOneChannel(channelId))
            .then((channel) =>
              dispatch(
                setMessages(channel.messages, channel.id, channel.serverId)
              )
            )
            .then(() => setLoaded(true)))();

        // setSocketRoom(`channel : ${channelId}`);
      } else if (
        checkServer(serverId, serverChannels, currentServer) &&
        channelId !== "undefined"
      ) {
        // setSocketRoom(`channel : ${channelId}`);
        history.push(`/channels/${serverId}/${currentServer.generalChannelId}`);
      }
    }

    return () => {
      isActive = false;
    };
    // eslint-disable-next-line
  }, [dmRoomId, channelId, dispatch]);

  useEffect(() => {
    socket = io();

    // const sendSockMessage = (data) => {
    //   dispatch(sendMessage(data.message));
    // };

    // const updateSockMessage = (data) => {
    //   dispatch(updateMessage(data.message));
    // };

    // const deleteSockMessage = (data) => {
    //   dispatch(deleteMessage(data.messageId));
    // };

    // socket.on("send_message", sendSockMessage);

    // socket.on("update_message", updateSockMessage);

    // socket.on("delete_message", deleteSockMessage);

    // return () => {
    //   socket.off("send_message");
    //   socket.off("update_message");
    //   socket.off("delete_message");
    //   socket.disconnect();
    // };
  }, [dispatch]);

  const handleSendMessage = (message) => {
    socket.emit("send_message", {
      message: { ...message, channel_id: channelId || dmRoomId },
      room: `channel room : ${channelId}`,
      channel_id: channelId,
      server_id: serverId,
    });
  };

  const handleUpdateMessage = (message) => {
    socket.emit("update_message", {
      message: { ...message, channel_id: channelId || dmRoomId },
      room: `channel room : ${channelId}`,
      channel_id: channelId,
      server_id: serverId,
    });
  };

  const handleDeleteMessage = async (messageId) => {
    socket.emit("delete_message", {
      message_id: messageId,
      room: `channel room : ${channelId}`,
      channel_id: channelId,
      server_id: serverId,
    });
  };

  if (loaded) {
    return (
      <>
        {messages && (
          <Messages
            handleDeleteMessage={handleDeleteMessage}
            handleUpdateMessage={handleUpdateMessage}
          />
        )}

        <ChatInput
          handleSendMessage={handleSendMessage}
          className="chat_input"
        />
      </>
    );
  }

  return <h1>loading...</h1>;
};

export default OneChannel;
