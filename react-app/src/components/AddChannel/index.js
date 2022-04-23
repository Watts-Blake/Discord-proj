import "./AddChannel.css";
import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { useDispatch } from "react-redux";

import { postChannel } from "../../store/channels";
const CreateChannel = ({ setShowModal }) => {
  const [name, setName] = useState("");
  const [text, setText] = useState(true);
  const [voice, setVoice] = useState(false);
  const [errors, setErrors] = useState([]);
  const [activeCreate, setActiveCreate] = useState(false);

  const dispatch = useDispatch();
  let history = useHistory();

  //   const user = useSelector((state) => state.session.user);
  const server = useSelector((state) => state.servers.currentServer);
  useEffect(() => {
    if (name.length > 0) {
      setActiveCreate(true);
    } else {
      setActiveCreate(false);
    }
  }, [name, errors]);
  const validate = () => {
    let errors = [];
    let valid = 0;
    if (name.length < 1) {
      valid = -1;
      errors.push("You must include a Channel Name.");
      setActiveCreate(false);
    } else {
      valid = 1;
    }
    let nameArr = name.split("-");

    for (let i = 0; i < nameArr.length; i++) {
      let ind = nameArr[i];
      if (ind.length > 15) {
        valid = -1;
        setActiveCreate(false);
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
      dispatch(
        postChannel({
          serverId: server.id,
          name,
          type_text: text,
          type_voice: voice,
        })
      )
        .then((channel) =>
          history.push(`/channels/${channel.serverId}/${channel.id}`)
        )
        .then(() => setShowModal(false));
    }

    return;
  };

  const handleTextClick = () => {
    setText(true);
    setVoice(false);
  };

  const handleVoiceClick = () => {
    setText(false);
    setVoice(true);
  };

  return (
    <div className="create_chan_container" onClick={handleTextClick}>
      <div>
        <img
          className="exit"
          src="/svgs/actual-x.svg"
          alt="X"
          onClick={() => setShowModal(false)}
        />
        <h1 className="create_chan_title">Create Text Channel</h1>
      </div>
      <div className="inputs_container">
        <label className="inputs" htmlFor="text_chan">
          <input
            type="radio"
            id="text_chan"
            name="voice_or_text"
            defaultChecked={text}
          />
          <div className="label_inputs_container" onClick={handleVoiceClick}>
            <img className="label_image" src="/svgs/pound.svg" alt="#" />
            <div className="label_message">
              <p>Text Channel</p>
              <p>Post images, GIF's, opinions, puns.</p>
            </div>
          </div>
        </label>
        {/* <label className="inputs" htmlFor="voice_chan">
          <input
            type="radio"
            id="voice_chan"
            name="voice_or_text"
            defaultChecked={voice}
          />
          <div className="label_inputs_container">
            <img className="label_image" src="/svgs/speaker.svg" alt="#" />
            <div className="label_message">
              <p>Voice Channel</p>
              <p>Hang out with voice.</p>
            </div>
          </div>
        </label> */}
      </div>
      <div className="chan_name_container">
        <label className="chan_name_label" htmlFor="chan_name">
          CHANNEL NAME
        </label>
        <input
          className="chan_name_input"
          id="chan_name"
          onChange={(e) => setName(e.target.value.replace(" ", "-"))}
          placeholder="new-channel"
          value={name}
        />
        <img className="white_pound" src="/svgs/white-pound.svg" alt="#" />
      </div>
      {errors.length > 0 && (
        <div className="errors_create_chan">
          {errors.map((error, ind) => (
            <div key={ind || error}>{error}</div>
          ))}
        </div>
      )}
      <div className="add_chan_btns_container">
        <div className="add_chan_btns">
          <h5 onClick={() => setShowModal(false)}>Cancel</h5>

          <h5
            className={
              activeCreate
                ? "create_channel_btn_active"
                : "create_channel_btn_unactive"
            }
            onClick={activeCreate ? handleSubmit : () => validate()}
          >
            Create Channel
          </h5>
        </div>
      </div>
    </div>
  );
};

export default CreateChannel;
