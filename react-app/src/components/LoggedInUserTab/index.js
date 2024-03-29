import "./LoggedInUserTab.css";
import { useSelector } from "react-redux";
import UserSettingsModal from "../UserSettingsModal/UserSettingsModal";
import UserActivity from "../UserActivity";
const LoggedInUserTab = () => {
  const user = useSelector((state) => state.session.user);

  return (
    <div className="logged_user_container">
      <div className="logged_user_left">
        <img
          className="logged_user_img"
          src={user.profilePicture}
          alt="pfp"
        ></img>
        <UserActivity userId={user.id} />
        <p>{user.username}</p>
      </div>
      <UserSettingsModal />
    </div>
  );
};

export default LoggedInUserTab;
