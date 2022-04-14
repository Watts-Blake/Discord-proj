import "./LoggedInUserTab.css";

const LoggedInUserTab = ({ user }) => {
  return (
    <div className="logged_user_container">
      <img
        className="logged_user_img"
        src={user.profilePicture}
        alt="pfp"
      ></img>
      <p>{user.username}</p>
      <img src="/svgs/svgexport-67.svg" alt="settings" />
    </div>
  );
};

export default LoggedInUserTab;
