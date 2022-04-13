import "./OneServer.css";
import Members from "../Members";
import Messages from "../Messages";
import Channels from "../Channels";
import OneChannel from "../OneChannel";

const OneServer = () => {
  return (
    <>
      <Channels className="channels" />
      <OneChannel className="one_channel" />
      <Members className="members" />
    </>
  );
};

export default OneServer;
