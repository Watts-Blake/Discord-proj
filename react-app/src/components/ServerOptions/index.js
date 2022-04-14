import "./ServerOptions.css";

import EditServerModal from "../EditServer/EditServerModal";

const ServerOptions = ({ serversObj, user }) => {
  return (
    <div className="server_opts" id="server_opts">
      <div className="sing_server_opt" id="server_opts_inv">
        <h4 id="server_opts_inv_title">Invite People</h4>
        <img id="server_opts_add_img" src="/svgs/addMemb.svg" alt="add" />
      </div>
      {serversObj.currentServer.owner.id === user.id && (
        <EditServerModal
          serversObj={serversObj}
          user={user}
          id="server_opts_modal1"
        />
      )}
      <div className="sing_server_opt" id="server_opts_leave">
        <h4 id="server_opts_leave_title">Leave Server</h4>{" "}
        <img
          id="server_opts_leave_img"
          src="/svgs/leaveServer.svg"
          alt="leave"
        />
      </div>
    </div>
  );
};

export default ServerOptions;
