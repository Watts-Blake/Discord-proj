import "./Modal.css";

import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { deleteServer, getOneServer } from "../../store/servers";
import { getOneChannel } from "../../store/channels";
import { useDispatch } from "react-redux";
import { putCurrentServer } from "../../store/servers";
import { grabFirstServerId, grabFirstChannelId } from "../../utils";

const EditServer = ({ serversObj, user, setShowModal }) => {
  const dispatch = useDispatch();
  let history = useHistory();

  const server = serversObj.currentServer;

  const [selected, setSelected] = useState("Overview");
  const [name, setName] = useState(server.name);
  console.log(name);
  const [image, setImage] = useState(server.picture);
  const [emptyFile, setEmptyFile] = useState("");
  const [requireSave, setRequireSave] = useState(false);

  useEffect(() => {
    if (image !== server.picture || name !== server.name) {
      setRequireSave(true);
    } else {
      setRequireSave(false);
    }
  }, [image, server.picture, name, server.name]);

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("image", image);
    formData.append("name", name);
    await dispatch(putCurrentServer(server.id, formData)).then((picture) =>
      setImage(picture)
    );
  };

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

  const checkChanges = () => {
    if (image !== server.picture || name !== server.name) {
      setRequireSave(true);
    } else {
      setShowModal(false);
    }
  };

  const handleImageUpdate = (e) => {
    setImage(e.target.files[0]);
    console.log(e.target.files);
  };

  const reset = () => {
    setName(server.name);
    setImage(server.picture);
    setRequireSave(false);
    setEmptyFile("");
  };
  return (
    <div className="edit_server_modal">
      <div className="container_for_options">
        <div className="edit_options">
          {name ? <h5>{name.toUpperCase()}</h5> : <h5>Server Settings</h5>}
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
            <h3 className="overview_title" id="9">
              Server Overview
            </h3>
            <div className="overview">
              <label htmlFor="upload" className="server_picture_container">
                <img
                  src={
                    image === server.picture
                      ? server.picture
                      : URL.createObjectURL(image)
                  }
                  className="server_picture"
                  alt="serverPic"
                />
                <div className="plus_photo_ico_container">
                  <img
                    className="plus_photo_ico"
                    src="/svgs/edit-server-img.svg"
                    alt="serv"
                    id="101"
                  />
                </div>
              </label>
              <input
                id="upload"
                type="file"
                accept="image/*"
                hidden={true}
                onChange={handleImageUpdate}
                value={emptyFile}
              />
              <div className="upload_image_container">
                <p className="pic_recommend">
                  We recommend an image of at least 512x512 for the server
                </p>
                <h5 className="upload_image_btn">Upload Image</h5>
              </div>
              <div className="edit_server_name">
                <label htmlFor="server_name">SERVER NAME</label>

                <input
                  id="server_name"
                  className="server_name"
                  placeholder={server.name}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></input>
              </div>
            </div>
            {requireSave && (
              <div className="require_save_container">
                <div className="require_save_message">
                  <h4>Careful</h4>
                  <div className="combine_--">
                    <h4 className="left-">-</h4>
                    <h4 className="right-">-</h4>
                  </div>

                  <h4>you have unsaved changes!</h4>
                </div>
                <div className="save_reset_btns">
                  <h5 className="reset" onClick={reset}>
                    Reset
                  </h5>
                  <h5 className="save" onClick={handleSubmit}>
                    Save Changes
                  </h5>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      <div onClick={checkChanges} className="esc_x_container">
        <img className="esc_x" src="/svgs/actual-x.svg" alt="x" />
        <h5 className="esc">ESC</h5>
      </div>
    </div>
  );
};

export default EditServer;
