import "./LoggedHome.css";
import LoggedUserTab from "../LoggedInUserTab";

const LoggedHome = () => {
  return (
    <div className="logged_home_container">
      <div className="logged_home_header">
        <div className="logged_home_header_left">
          <input className="dm_search"></input>
        </div>

        <nav className="logged_home_top_nav"></nav>
      </div>

      <div className="logged_home_main_content">
        <div className="logged_home_left_nav_container">
          <div className="friends"></div>
          <div className="new_direct_message_button"></div>
          <nav className="direct_message_rooms">
            <div className="direct_message_room"></div>
          </nav>
          <LoggedUserTab />
        </div>

        <div className="logged_home_messages">
          <div className="logged_home_message"></div>
        </div>
      </div>
    </div>
  );
};

export default LoggedHome;
