import "./ServerOptions.css";
import { useState, useEffect, useContext } from "react";
import { useDispatch } from "react-redux";
import { leaveUserServer } from "../../store/servers";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { DmRoomViewContext } from "../../context/DmRoomViewContext";
import { clearCurrentServer } from "../../store/servers";
import { clearCurrentChannel } from "../../store/channels";

const ServerOptions = ({ serversObj, user, setShowModal }) => {
  const { dmRoomsView, setDmRoomsView } = useContext(DmRoomViewContext);
  let history = useHistory();
  const [member, setMember] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  const currentServer = serversObj?.currentServer;
  const membersObj = currentServer?.members;
  const membersArr = Object.values(membersObj);
  console.log("here", member);
  useEffect(() => {
    setMember(membersArr.find((member) => member.userId === user.id));
    setLoaded(true);
  }, [membersArr, user.id]);

  const handleLeave = async () => {
    setLoaded(false);
    await dispatch(leaveUserServer(currentServer.id, member.id))
      .then(() => history.push("/guild-discovery"))
      .then(() => dispatch(clearCurrentServer()))
      .then(() => dispatch(clearCurrentChannel()))
      .then(() => setDmRoomsView(false));
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
            onClick={() => handleLeave()}
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
