import "./LoggedHome.css";
import LoggedUserTab from "../LoggedInUserTab";
import OneChannel from "../OneChannel";
import ProtectedRoute from "../auth/ProtectedRoute";
import DmRooms from "../DmRooms";

import { useParams, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const LoggedHome = () => {
  const [loaded, setLoaded] = useState(false);
  const { dmRoomId } = useParams();
  const history = useHistory();
  const user = useSelector((state) => state.session.user);

  useEffect(() => {
    setLoaded(false);
    const firstDmChannelId = Object.values(user.dmChannelMember)[0].id;
    if (dmRoomId === "null") {
      history.push(`/channels/@me/${firstDmChannelId}`);
    }
    setLoaded(true);
    //eslint-disable-next-line
  }, [dmRoomId]);

  if (!loaded) return <h1>Loading...</h1>;

  return (
    <div className="logged_home_container">
      <div className="logged_home_header">
        <div className="logged_home_header_left">
          <input
            className="dm_search"
            placeholder={"Find or start a conversation"}
          ></input>
        </div>

        <nav className="logged_home_top_nav"></nav>
      </div>

      <div className="logged_home_main_content">
        <div className="logged_home_left_nav_container">
          <div className="friends"></div>
          <div className="new_dm_button">
            <h4 className="dm_title">DIRECT MESSAGES</h4>
            <button>
              <img
                className="channels_plus dms_plus"
                src="/svgs/grey-plus.svg"
                alt="add"
              />
            </button>
          </div>
          <DmRooms />
          <LoggedUserTab />
        </div>

        {/* <div className="logged_home_messages">
          <div className="logged_home_message"></div>
        </div> */}
        <ProtectedRoute path="/channels/@me/:dmRoomId">
          <OneChannel />
        </ProtectedRoute>
      </div>
    </div>
  );
};

export default LoggedHome;
