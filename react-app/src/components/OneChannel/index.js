import "./OneChannel.css";
import Messages from "../Messages";
import ChatInput from "../ChatInput";
import { postMessage } from "../../store/channels";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  deleteChannelMessage,
  putChannelMessage,
  getOneChannel,
} from "../../store/channels";
import { io } from "socket.io-client";
let socket;

const OneChannel = () => {
  const { serverId, channelId, dmRoomId } = useParams();
  const [loaded, setLoaded] = useState(false);
  const [prevRoom, setPrevRoom] = useState(`channel${channelId || dmRoomId}`);
  const [socketRoom, setSocketRoom] = useState();
  const [messages, setMessages] = useState([]);

  const currentServer = useSelector((state) => state.servers.currentServer);
  const currentChannel = useSelector((state) => state.channels.currentChannel);
  const serverChannels = useSelector((state) => state.channels.channels);
  console.log("messages", messages);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    let isActive = true;

    if (isActive) {
      setLoaded(false);
      if (dmRoomId) {
        dispatch(getOneChannel(dmRoomId));
        setSocketRoom(`channel${dmRoomId}`);
      } else if (
        channelId &&
        channelId !== "null" &&
        channelId !== "undefined" &&
        parseInt(channelId) !== parseInt(currentChannel?.id)
      ) {
        dispatch(getOneChannel(channelId));
        setSocketRoom(`channel${channelId}`);
      } else if (
        serverId !== "null" &&
        serverChannels &&
        serverId !== currentServer.id
      ) {
        const generalChannel = Object.values(serverChannels).find(
          (channel) => channel.name === "General"
        );
        setSocketRoom(`channel${channelId}`);
        history.push(`/channels/${serverId}/${generalChannel?.id}`);
      }
    }

    setLoaded(true);
    return () => {
      isActive = false;
    };
    // eslint-disable-next-line
  }, [dmRoomId, channelId, dispatch]);

  useEffect(() => {
    let isActive = true;
    const channelMessagesObj = currentChannel?.messages;

    if (channelMessagesObj && isActive) setMessages(channelMessagesObj);

    return () => (isActive = false);
    // socket.emit("get_messages");
  }, [currentChannel]);

  useEffect(() => {
    socket = io();
    const sendMessage = (data) => {
      setMessages((prevMessages) => {
        const newMessages = { ...prevMessages };
        newMessages[data.message.id] = data.message;
        return newMessages;
      });
    };

    const updateMessage = (data) => {
      setMessages((prevMessages) => {
        const newMessages = { ...prevMessages };

        prevMessages[data.message.id].content = data.message.content;
        prevMessages[data.message.id].updatedAt = data.message.updatedAt;

        return newMessages;
      });
    };

    socket.on("send_message", sendMessage);

    socket.on("update_message", updateMessage);

    // setLoaded(true);
    return () => {
      socket.off("send_message");
      socket.off("update_message");
    };
  }, []);

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

  const sendMessage = (formData) => {
    socket.timeout(5000).emit("send_message", {
      message: { ...formData, channel_id: channelId || dmRoomId },
      room: socketRoom,
    });
  };

  const handleUpdateMessage = (message) => {
    socket.emit("update_message", {
      message: { ...message, channel_id: channelId || dmRoomId },
      room: socketRoom,
    });
  };

  const handleDeleteMessage = async (channelId, messageId) => {
    await dispatch(deleteChannelMessage(channelId, messageId));
    let deletedMessage = messages.find((message) => message.id === messageId);
    setMessages(messages.filter((message) => message !== deletedMessage));
  };

  if (loaded) {
    return (
      <>
        {currentChannel?.messages && (
          <Messages
            messages={messages}
            handleDeleteMessage={handleDeleteMessage}
            handleUpdateMessage={handleUpdateMessage}
          />
        )}

        <ChatInput sendMessage={sendMessage} className="chat_input" />
      </>
    );
  }

  return <h1>loading...</h1>;
};

export default OneChannel;
