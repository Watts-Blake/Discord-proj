import "./Modal.css";

import { useState } from "react";
import { useHistory } from "react-router-dom";
import { deleteServer, getOneServer } from "../../store/servers";
import { getOneChannel } from "../../store/channels";
import { useDispatch } from "react-redux";

import { grabFirstServerId, grabFirstChannelId } from "../../utils";

const EditServer = ({ serversObj, user, setShowModal }) => {
  const server = serversObj.currentServer;
  const [selected, setSelected] = useState("Overview");
  const [name, setName] = useState(server.name);
  const dispatch = useDispatch();
  let history = useHistory();

  const handleDelete = async () => {
    await dispatch(deleteServer(server.id)).then(() => setShowModal(false));

    if (
      grabFirstServerId(user.serverMember) &&
      grabFirstChannelId(user.serverMember)
    ) {
      let firstServerId = grabFirstServerId(user.serverMember);
      let firsChannelId = grabFirstChannelId(user.serverMember);
      console.log("inside delete ifffffffffffffffffffffffff");
      history.push(`/channels/${firstServerId}/${firsChannelId}`);
      await dispatch(getOneServer(firstServerId)).then(() =>
        dispatch(getOneChannel(firstServerId, firsChannelId))
      );
    }
  };
  return (
    <div className="edit_server_modal">
      <div className="container_for_options">
        <div className="edit_options">
          {name ? <h3>{name.toUpperCase()}</h3> : <h3>Server Settings</h3>}
          <h4 onClick={() => setSelected("Overview")}>Overview</h4>
          <div className="user_management">
            <h3>USER MANAGEMENT</h3>
            <h4>Members</h4>
          </div>
          <div className="delete" onClick={handleDelete}>
            <h3>Delete Server</h3>
            <img src="/svgs/trash.svg" alt="trash" />
          </div>
        </div>
      </div>
      <div className="info">
        {selected === "Overview" && (
          <div className="overview_container">
            <h1 id="9">Server Overview</h1>
            <div className="overview">
              <img
                src={server.picture}
                className="server_picture"
                alt="serverPic"
              />
              <img src="/svgs/edit-server-img.svg" alt="serv" id="101" />
              <div className="upload_image">
                <p>We recommend an image of at least 512x512 for the server</p>
                <h3 className="upload_image_btn">Upload Image</h3>
              </div>
              <div>
                <label htmlFor="server_name">Server Name</label>

                <input
                  id="server_name"
                  className="server_name"
                  defaultValue={server.name}
                  placeholder={server.name}
                  onChange={(e) => setName(e.target.value)}
                ></input>
              </div>
              <div>
                <div>
                  <img src="/svgs/empty-circ.svg" alt="trash" />
                  <img src="/svgs/actual-x.svg" alt="x" />
                </div>
                <h5>ESC</h5>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditServer;
