import "./ServerOptions.css";
import { useState, useEffect } from "react";

import { NavLink } from "react-router-dom";

const ServerOptions = ({
  serversObj,
  user,
  setShowModal,
  handleLeave,
  member,
}) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    loaded && (
      <div className="server_opts" id="server_opts">
        {serversObj.currentServer.owner.id === user.id ? (
          <>
            {/* <div className="sing_server_opt" id="server_opts_inv">
              <h4 id="server_opts_inv_title">Invite People</h4>
              <img id="server_opts_add_img" src="/svgs/addMemb.svg" alt="add" />
            </div> */}
            <div
              onClick={() => setShowModal(true)}
              className="sing_server_opt"
              id="server_opts_edit"
              style={{ cursor: "pointer" }}
            >
              <h4 id="server_opts_edit_title">Server Settings</h4>
              <img
                id="server_opts_edit_img"
                src="/svgs/settings.svg"
                alt="add"
              />
            </div>
          </>
        ) : member ? (
          <NavLink
            className="sing_server_opt"
            id="server_opts_leave"
            to="/guild-discovery"
            onClick={() => handleLeave()}
            replace={true}
          >
            <h4 id="server_opts_leave_title">Leave Server</h4>{" "}
            <img
              id="server_opts_leave_img"
              src="/svgs/leaveServer.svg"
              alt="leave"
            />
          </NavLink>
        ) : (
          <div className="sing_server_opt" id="server_opts_join">
            <h4 id="server_opts_join_title">Join Server</h4>{" "}
            <img
              className="join_server"
              id="server_opts_join_img"
              src="/svgs/joinServer.svg"
              alt="join"
            />
          </div>
        )}
      </div>
    )
  );
};

export default ServerOptions;
