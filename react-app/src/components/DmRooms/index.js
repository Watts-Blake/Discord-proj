import "./DmRooms.css";

import { useSelector } from "react-redux";
import DmRoom from "../DmRoom";

const DmRooms = () => {
  const dmRooms = useSelector((state) =>
    Object.values(state.channels.userDmChannels)
  );

  return (
    <nav className="direct_message_rooms">
      {dmRooms.map((room) => (
        <DmRoom room={room} key={room.id} />
      ))}
    </nav>
  );
};

export default DmRooms;
