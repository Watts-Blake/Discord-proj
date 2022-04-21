import "./ServerOptions.css";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { leaveUserServer } from "../../store/servers";
import { Redirect } from "react-router-dom";

const ServerOptions = ({ serversObj, user, setShowModal }) => {
  const [member, setMember] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  const currentServer = serversObj?.currentServer;
  const membersObj = currentServer?.members;
  const membersArr = Object.values(membersObj);
  console.log("here", membersArr);
  useEffect(() => {
    setMember(membersArr.find((member) => member.userId === user.id));
    setLoaded(true);
  }, [membersArr, user.id]);

  const handleLeave = async () => {
    const memberShipId = membersArr.find(
      (member) => member.userId === user.id
    ).id;
    await dispatch(leaveUserServer(currentServer.id, memberShipId)).then(() => (
      <Redirect to="/channels/@me" />
    ));
  };

  return (
    loaded && (
      <div className="server_opts" id="server_opts">
        {serversObj.currentServer.owner.id === user.id ? (
          <>
            <div className="sing_server_opt" id="server_opts_inv">
              <h4 id="server_opts_inv_title">Invite People</h4>
              <img id="server_opts_add_img" src="/svgs/addMemb.svg" alt="add" />
            </div>
            <div
              onClick={() => setShowModal(true)}
              className="sing_server_opt"
              id="server_opts_edit"
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
          <div
            className="sing_server_opt"
            id="server_opts_leave"
            onClick={handleLeave}
          >
            <h4 id="server_opts_leave_title">Leave Server</h4>{" "}
            <img
              id="server_opts_leave_img"
              src="/svgs/leaveServer.svg"
              alt="leave"
            />
          </div>
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
