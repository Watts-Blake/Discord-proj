import "./OneChannel.css";
import Messages from "../Messages";
import ChatInput from "../ChatInput";
import { postMessage } from "../../store/channels";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  deleteChannelMessage,
  putChannelMessage,
  getOneChannel,
} from "../../store/channels";
import { io } from "socket.io-client";
let socket;

const OneChannel = () => {
  const { serverId, channelId } = useParams();
  const [loaded, setLoaded] = useState(false);
  const [prevRoom, setPrevRoom] = useState(`channel${channelId}`);
  const [socketRoom, setSocketRoom] = useState();
  const [messages, setMessages] = useState([]);

  const currentChannel = useSelector((state) => state.channels.currentChannel);
  const dispatch = useDispatch();

  useEffect(() => {
    setLoaded(false);
    dispatch(getOneChannel(channelId));
    setSocketRoom(`channel${channelId}`);
    setLoaded(true);
    //eslint-disable-next-line
  }, [channelId]);

  useEffect(() => {
    let isActive = true;
    const channelMessagesObj = currentChannel?.messages;

    if (channelMessagesObj && isActive)
      setMessages(Object.values(channelMessagesObj));

    return () => (isActive = false);
  }, [currentChannel]);

  useEffect(() => {
    socket = io();
    socket.on("message", (data) => {
      setMessages((messages) => [...messages, data["message"]]);
    });

    return () => {
      socket.disconnect();
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

  const sendMessage = async (formData) => {
    await dispatch(postMessage(channelId, formData)).then((message) =>
      socket.send({ message, room: socketRoom })
    );
  };

  const handleUpdateMessage = async (messageId, formData) => {
    let messageToUpdate = messages.find((message) => message.id === messageId);
    let updatedMessage = await dispatch(
      putChannelMessage(channelId, messageId, formData)
    );
    let newMessages = [...messages];
    newMessages[newMessages.indexOf(messageToUpdate)] = updatedMessage;
    setMessages(newMessages);
  };

  const handleDeleteMessage = async (channelId, messageId) => {
    await dispatch(deleteChannelMessage(channelId, messageId));
    let deletedMessage = messages.find((message) => message.id === messageId);
    setMessages(messages.filter((message) => message !== deletedMessage));
  };

  return (
    loaded && (
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
    )
  );
};

export default OneChannel;
