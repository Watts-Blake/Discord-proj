import "./OneChannel.css";
import Messages from "../Messages";
import ChatInput from "../ChatInput";
import { useState, useEffect } from "react";
import { io } from "socket.io-client";
let socket;
const OneChannel = ({ channelsObj }) => {
  const currentChannel = channelsObj?.currentChannel;
  const channelId = currentChannel?.id;
  const [prevRoom, setPrevRoom] = useState(`channel${channelId}`);
  const [socketRoom, setSocketRoom] = useState();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setSocketRoom(`channel${channelId}`);
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
      setMessages((messages) => [...messages, data]);
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
    leaveRoom(prevRoom);
    joinRoom(socketRoom);
    setPrevRoom(socketRoom);
  }, [prevRoom, socketRoom]);

  const sendMessage = async (e) => {
    e.preventDefault();
  };

  return (
    <>
      {currentChannel?.messages && <Messages messages={messages} />}

      <ChatInput className="chat_input" />
    </>
  );
};

export default OneChannel;
