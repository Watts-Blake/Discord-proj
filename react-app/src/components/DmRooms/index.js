import "./DmRooms.css";

import Members from "../Members";
import Channels from "../Channels";
import OneChannel from "../OneChannel";
import LoggedInUserTab from "../LoggedInUserTab";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { getOneServer } from "../../store/servers";
import { getOneChannel } from "../../store/channels";
import ServerOptions from "../ServerOptions";
import EditServerModal from "../EditServer/EditServerModal";
import DmChannels from "../DmChannels.js";

const DmRooms = () => {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  const { dmRoomId } = useParams();
  const [showModal, setShowModal] = useState(false);
  const serversObj = useSelector((state) => state.servers);
  const user = useSelector((state) => state.session.user);
  const channelsObj = useSelector((state) => state.dmRooms.userDmRooms);

  const [showServerOptions, setShowServerOptions] = useState(false);

  useEffect(() => {
    if (channelsObj.currentChannel.channel === null) {
      dispatch(getOneChannel(dmRoomId)).then(() => setLoaded(true));
    } else {
      setLoaded(true);
    }
  }, [
    dispatch,
    channelsObj.currentChannel,
    serversObj.currentServer,
    dmRoomId,
  ]);

  const handleCloseServerOpts = (e) => {
    if (!showServerOptions) return;
    if (!e.target.id.includes("server_opts")) {
      setShowServerOptions(false);
    }
    let leftNav = document.getElementById("left_nav");
    leftNav.addEventListener("click", (e) => {
      if (!e.target.id.includes("server_opts")) {
        setShowServerOptions(false);
      }
    });
  };

  return loaded && <DmChannels />;
};

export default DmRooms;
