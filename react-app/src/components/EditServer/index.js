import "./Modal.css";
import { fileTypes } from "../../utils";
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
  const [errors, setErrors] = useState([]);
  const [activeSave, setActiveSave] = useState(false);
  const [image, setImage] = useState(server.picture);
  const [emptyFile, setEmptyFile] = useState("");
  const [requireSave, setRequireSave] = useState(false);

  useEffect(() => {
    if (image !== server.picture || name !== server.name) {
      setRequireSave(true);
    } else {
      setRequireSave(false);
    }
    if (name.length < 20) {
      setErrors([]);
    }
  }, [image, server.picture, name, server.name]);

  useEffect(() => {
    if (name.length > 0) {
      setActiveSave(true);
    } else {
      setActiveSave(false);
    }
  }, [name, errors]);

  const validate = () => {
    let errors = [];
    let valid = 0;
    if (name.length < 1) {
      valid = -1;
      errors.push("You must include a Server Name.");
      setActiveSave(false);
    } else {
      valid = 1;
    }
    if (name.length > 20) {
      valid = -1;
      errors.push("Your Server Name must be less than 20 characters.");
      setActiveSave(false);
    } else {
      valid = 1;
    }

    if (valid > 0) {
      return true;
    } else {
      setErrors(errors);
      return false;
    }
  };

  const handleSubmit = async () => {
    if (validate()) {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("name", name);
      await dispatch(putCurrentServer(server.id, formData)).then((picture) =>
        setImage(picture)
      );
    }
  };

  const handleDelete = async () => {
    await dispatch(deleteServer(server.id)).then(() => setShowModal(false));

    if (
      grabFirstServerId(user.serverMember) &&
      grabFirstChannelId(user.serverMember)
    ) {
      let firstServerId = grabFirstServerId(user.serverMember);
      let firsChannelId = grabFirstChannelId(user.serverMember);

      history.push(`/channels/${firstServerId}/${firsChannelId}`);
      await dispatch(getOneServer(firstServerId)).then(() =>
        dispatch(getOneChannel(firsChannelId))
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
    const file = e.target.files[0];
    setImage(file);

    if (file && !fileTypes.includes(`${file.type.split("/")[1]}`)) {
      setImage(server.picture);
      setErrors([
        "The uploaded file was not supported, your server icon has been reverted to its previous upload. Uploaded file should be a pdf, png, jpg, jpeg, or gif.",
      ]);
    } else {
      setImage(file);
    }

    setEmptyFile("");
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
                <label className="upload_image_btn" htmlFor="upload">
                  Upload Image
                </label>
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
            {errors.length > 0 && (
              <div className="errors_edit">
                {errors.map((error, ind) => (
                  <div key={ind || error}>{error}</div>
                ))}
              </div>
            )}
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
                  <h5
                    className={activeSave ? "save active_save" : "save"}
                    onClick={activeSave ? handleSubmit : () => validate}
                  >
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
