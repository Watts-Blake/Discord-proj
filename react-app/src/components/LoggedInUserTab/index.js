import "./LoggedInUserTab.css";

const LoggedInUserTab = ({ user }) => {
  return (
    <div className="logged_user_container">
      <div className="logged_user_left">
        <img
          className="logged_user_img"
          src={user.profilePicture}
          alt="pfp"
        ></img>
        <p>{user.username}</p>
      </div>
      <div className="logged_user_right">
        <img src="/svgs/svgexport-67.svg" alt="settings" />
      </div>
    </div>
  );
};

export default LoggedInUserTab;
