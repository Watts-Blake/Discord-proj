import "./OneServer.css";
import Members from "../Members";
import Channels from "../Channels";
import OneChannel from "../OneChannel";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { BrowserRouter, Switch } from "react-router-dom";
import ProtectedRoute from "../auth/ProtectedRoute";

const OneServer = () => {
  const [loaded, setLoaded] = useState(false);
  const { serverId, channelId } = useParams();
  const dispatch = useDispatch();
  const serversObj = useSelector((state) => state.servers);
  const channelsObj = useSelector((state) => state.channels);
  return (
    <>
      <Channels channels={channelsObj} className="channels" />
      <OneChannel channelsObj={channelsObj} className="one_channel" />
      <Members serversObj={serversObj} className="members" />
    </>
  );
};

export default OneServer;
