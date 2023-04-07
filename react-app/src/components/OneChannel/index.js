import "./OneChannel.css";
import Messages from "../Messages";
import ChatInput from "../ChatInput";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { getOneChannel } from "../../store/channels";
import { io } from "socket.io-client";

import {
  sendMessage,
  updateMessage,
  deleteMessage,
} from "../../store/messages";

import { checkChannel, checkDmRoom, checkServer } from "../../utils";
let socket;

const OneChannel = () => {
  const { serverId, channelId, dmRoomId } = useParams();
  const [loaded, setLoaded] = useState(false);
  const [prevRoom, setPrevRoom] = useState(`channel${channelId || dmRoomId}`);
  const [socketRoom, setSocketRoom] = useState();
  // const [messages, setMessages] = useState([]);

  const currentServer = useSelector((state) => state.servers.currentServer);
  const currentChannel = useSelector((state) => state.channels.currentChannel);
  // const messages = useSelector((state) => state.messages);
  const serverChannels = useSelector((state) => state.channels.channels);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    let isActive = true;
    if (isActive) {
      setLoaded(false);
      if (checkDmRoom(dmRoomId)) {
        dispatch(getOneChannel(dmRoomId));
        setSocketRoom(`channel : ${dmRoomId}`);
      } else if (checkChannel(channelId, currentChannel)) {
        dispatch(getOneChannel(channelId));
        setSocketRoom(`channel : ${channelId}`);
      } else if (
        checkServer(serverId, serverChannels, currentServer) &&
        channelId !== "undefined"
      ) {
        setSocketRoom(`channel : ${channelId}`);
        history.push(`/channels/${serverId}/${currentServer.generalChannelId}`);
      }
    }

    setLoaded(true);
    return () => {
      isActive = false;
    };
    // eslint-disable-next-line
  }, [dmRoomId, channelId, dispatch]);

  useEffect(() => {
    socket = io();

    const sendSockMessage = (data) => {
      dispatch(sendMessage(data.message));
    };

    const updateSockMessage = (data) => {
      dispatch(updateMessage(data.message));
    };

    const deleteSockMessage = (data) => {
      dispatch(deleteMessage(data.messageId));
    };

    socket.on("send_message", sendSockMessage);

    socket.on("update_message", updateSockMessage);

    socket.on("delete_message", deleteSockMessage);

    return () => {
      socket.off("send_message");
      socket.off("update_message");
      socket.off("delete_message");
      socket.disconnect();
    };
  }, [dispatch]);

  const leaveRoom = (oldRoom) => {
    socket.emit("leave_room", { room: oldRoom });
  };

  const joinRoom = (newRoom) => {
    socket.emit("join_room", { room: newRoom });
  };

  useEffect(() => {
    let isActive = true;
    isActive && leaveRoom(prevRoom);
    isActive && joinRoom(socketRoom);
    isActive && setPrevRoom(socketRoom);
    return () => (isActive = false);
  }, [prevRoom, socketRoom]);

  const handleSendMessage = (message) => {
    socket.timeout(5000).emit("send_message", {
      message: { ...message, channel_id: channelId || dmRoomId },
      room: socketRoom,
    });
  };

  const handleUpdateMessage = (message) => {
    socket.emit("update_message", {
      message: { ...message, channel_id: channelId || dmRoomId },
      room: socketRoom,
    });
  };

  const handleDeleteMessage = async (messageId) => {
    socket.emit("delete_message", { message_id: messageId, room: socketRoom });
  };

  if (loaded) {
    return (
      <>
        {currentChannel?.messages && (
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
