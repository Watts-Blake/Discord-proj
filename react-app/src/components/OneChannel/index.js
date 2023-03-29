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
  const [prevRoom, setPrevRoom] = useState(`channel${channelId}`);
  const [socketRoom, setSocketRoom] = useState();
  const [messages, setMessages] = useState([]);

  const currentServer = useSelector((state) => state.servers.currentServer);
  const currentChannel = useSelector((state) => state.channels.currentChannel);
  const serverChannels = useSelector((state) => state.channels.channels);

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

  // const leaveRoom = (oldRoom) => {
  //   socket.emit("leave_room", { room: oldRoom });
  // };

  const joinRoom = (newRoom) => {
    socket.emit("join_room", { room: newRoom });
  };

  useEffect(() => {
    let isActive = true;
    // isActive && leaveRoom(prevRoom);
    isActive && joinRoom(socketRoom);
    isActive && setPrevRoom(socketRoom);
    return () => (isActive = false);
  }, [prevRoom, socketRoom]);

  const sendMessage = async (formData) => {
    await dispatch(
      postMessage(channelId ? channelId : dmRoomId, formData)
    ).then((message) => socket.send({ message, room: socketRoom }));
  };

  const handleUpdateMessage = async (messageId, formData) => {
    let messageToUpdate = messages.find((message) => message.id === messageId);
    let updatedMessage = await dispatch(
      putChannelMessage(channelId ? channelId : dmRoomId, messageId, formData)
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
