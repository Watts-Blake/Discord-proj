import "./UserActivity.css";
import { useSelector } from "react-redux";

const UserActivity = ({ userId, fromDmRooms }) => {
  const userActivity = useSelector((state) => state.users[userId]);
  return (
    <div
      className={
        fromDmRooms ? "online_status dm_room_channel_activity" : "online_status"
      }
    >
      <div
        className={
          userActivity
            ? userActivity.activity === "online"
              ? "online"
              : "idle"
            : "offline"
        }
      ></div>
    </div>
  );
};

export default UserActivity;
