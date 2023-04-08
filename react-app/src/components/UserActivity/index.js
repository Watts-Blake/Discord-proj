import "./UserActivity.css";
import { useSelector } from "react-redux";

const UserActivity = ({ userId }) => {
  const userActivity = useSelector((state) => state.users[userId]);
  return (
    <div className="online_status">
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
