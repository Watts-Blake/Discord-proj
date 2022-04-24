import "./Modal.css";

import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
// import { deleteServer, getOneServer } from "../../store/servers";
import { deleteChannel, putChannel } from "../../store/channels";
import { getOneChannel } from "../../store/channels";
import { useDispatch, useSelector } from "react-redux";
// import { putCurrentServer } from "../../store/servers";
import { grabFirstChannelId } from "../../utils";

const EditChannel = ({ user, setShowModal }) => {
  const dispatch = useDispatch();
  let history = useHistory();
  const channel = useSelector((state) => state.channels.currentChannel);
  const [selected, setSelected] = useState("Overview");
  const [name, setName] = useState(channel.name);
  const [errors, setErrors] = useState([]);
  const [activeEdit, setActiveEdit] = useState(false);

  const [requireSave, setRequireSave] = useState(false);

  useEffect(() => {
    if (name !== channel.name) {
      setRequireSave(true);
    } else {
      setRequireSave(false);
    }
  }, [name, channel.name]);

  useEffect(() => {
    if (name.length > 0) {
      setActiveEdit(true);
    } else {
      setActiveEdit(false);
    }
  }, [name, errors]);
  const validate = () => {
    let errors = [];
    let valid = 0;
    if (name.length < 1) {
      valid = -1;
      errors.push("You must include a Channel Name.");
      setActiveEdit(false);
    } else {
      valid = 1;
    }
    let nameArr = name.split("-");

    for (let i = 0; i < nameArr.length; i++) {
      let ind = nameArr[i];
      if (ind.length > 15) {
        valid = -1;
        setActiveEdit(false);
        errors.push(
          "Each word in your channel name must be 15 or less characters."
        );
        setErrors(errors);
        return false;
      } else {
        valid = 1;
      }
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
      setErrors([]);
      await dispatch(
        putChannel({ id: channel.id, name: name, serverId: channel.serverId })
      ).then(() => setRequireSave(false));
    }
  };

  const handleDelete = async () => {
    await dispatch(deleteChannel(channel.serverId, channel.id)).then(() =>
      setShowModal(false)
    );

    if (grabFirstChannelId(user.serverMember)) {
      let firsChannelId = grabFirstChannelId(user.serverMember);

      history.push(`/channels/${channel.serverId}/${firsChannelId}`);
      await dispatch(getOneChannel(firsChannelId));
    }
  };

  const checkChanges = () => {
    if (name !== channel.name) {
      setRequireSave(true);
    } else {
      setShowModal(false);
    }
  };

  const reset = () => {
    setName(channel.name);

    setRequireSave(false);
  };
  return (
    <div className="edit_channel_modal">
      <div className="container_for_options">
        <div className="edit_options">
          {name ? <h5>{name.toUpperCase()}</h5> : <h5>Channel Settings</h5>}
          <h4 onClick={() => setSelected("Overview")}>Overview</h4>
          <div className="delete" onClick={handleDelete}>
            <h3>Delete Channel</h3>
            <img src="/svgs/trash.svg" alt="trash" />
          </div>
        </div>
      </div>
      <div className="info">
        {selected === "Overview" && (
          <div className="overview_container">
            <h3 className="overview_title" id="9">
              Channel Overview
            </h3>
            <div className="overview">
              <div className="edit_channel_name">
                <label htmlFor="channel_name">CHANNEL NAME</label>

                <input
                  id="channel_name"
                  className="channel_name"
                  placeholder={channel.name}
                  value={name}
                  onChange={(e) => setName(e.target.value.replace(" ", "-"))}
                ></input>
              </div>
            </div>
            {errors.length > 0 && (
              <div className="errors_create_chan">
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
                    className={activeEdit ? "save active_save" : "save"}
                    onClick={activeEdit ? handleSubmit : () => validate}
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

export default EditChannel;
