import "./Modal.css";

import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
// import { deleteServer, getOneServer } from "../../store/servers";
import { deleteChannel, putChannel } from "../../store/channels";
import { getOneChannel } from "../../store/channels";
import { useDispatch } from "react-redux";
// import { putCurrentServer } from "../../store/servers";
import { grabFirstChannelId } from "../../utils";

const EditChannel = ({ channel, user, setShowModal }) => {
  const dispatch = useDispatch();
  let history = useHistory();

  const [selected, setSelected] = useState("Overview");
  const [name, setName] = useState(channel.name);

  const [requireSave, setRequireSave] = useState(false);

  useEffect(() => {
    if (name !== channel.name) {
      setRequireSave(true);
    } else {
      setRequireSave(false);
    }
  }, [name, channel.name]);

  const handleSubmit = async () => {
    await dispatch(
      putChannel({ id: channel.id, name: name, serverId: channel.serverId })
    );
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

export default EditChannel;
