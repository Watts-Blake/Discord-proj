import "./AddChannel.css";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";

import { useDispatch } from "react-redux";

import { postChannel } from "../../store/channels";
const CreateChannel = ({ setShowModal }) => {
  const [name, setName] = useState("");
  const [text, setText] = useState(true);
  const [voice, setVoice] = useState(false);

  const dispatch = useDispatch();
  let history = useHistory();

  //   const user = useSelector((state) => state.session.user);
  const server = useSelector((state) => state.servers.currentServer);

  const handleSubmit = async () => {
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
        <label className="inputs" htmlFor="voice_chan">
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
        </label>
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

      <div className="add_chan_btns_container">
        <div className="add_chan_btns">
          <h5 onClick={() => setShowModal(false)}>Cancel</h5>
          {name ? (
            <h5 className="create_channel_btn_active" onClick={handleSubmit}>
              Create Channel
            </h5>
          ) : (
            <h5 className="create_channel_btn_unactive">Create Channel</h5>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateChannel;
