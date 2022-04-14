import "./ServerOptions.css";

const ServerOptions = () => {
  return (
    <div className="server_opts" id="server_opts">
      <div className="sing_server_opt" id="server_opts_inv">
        <h4 id="server_opts_inv_title">Invite People</h4>
        <img id="server_opts_add_img" src="/svgs/addMemb.svg" alt="add" />
      </div>
      <div className="sing_server_opt" id="server_opts_edit">
        <h4 id="server_opts_edit_title">Edit Server</h4>
        <img id="server_opts_edit_img" src="/svgs/pencil.svg" alt="add" />
      </div>
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
