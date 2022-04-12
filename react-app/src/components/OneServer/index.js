import "./OneServer.css";
import Members from "../Members";
import Messages from "../Messages";
import Channels from "../Channels";
import OneChannel from "../OneChannel";

const OneServer = () => {
  return (
    <>
      <Channels />
      <OneChannel />
      <Members />
    </>
  );
};

export default OneServer;
