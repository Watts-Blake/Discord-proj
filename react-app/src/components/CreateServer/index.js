import "./CreateServer.css";
import { useState } from "react";
import { useSelector } from "react-redux";
import { postUserServer } from "../../store/servers";
import { useDispatch } from "react-redux";
const CreateServer = ({ setShowModal }) => {
  const [showHomeCreate, setShowHomeCreate] = useState(true);
  const [showCreateAbout, setShowCreateAbout] = useState(false);
  const [showCreateFinal, setShowCreatFinal] = useState(false);
  const [name, setName] = useState("");
  const [emptyFile, setEmptyFile] = useState("");
  const baseImage = "/svgs/svgexport-94.svg";
  const [serverImage, setServerImage] = useState(baseImage);
  const [imageLoading, setImageLoading] = useState(false);

  const dispatch = useDispatch();

  const user = useSelector((state) => state.session.user);

  const handleFirstClick = () => {
    setShowHomeCreate(false);
    setShowCreateAbout(true);
  };

  const handleSecondClick = (back) => {
    if (back) {
      setShowCreateAbout(false);
      setShowHomeCreate(true);
    } else {
      setShowCreateAbout(false);
      setShowCreatFinal(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setImageLoading(true);
    const formData = new FormData();
    let image = serverImage;
    let ownerId = user.id;

    formData.append("ownerId", ownerId);
    formData.append("image", image);
    formData.append("name", name);

    await dispatch(postUserServer(formData))
      .then(() => setImageLoading(false))
      .then(() => setShowModal(false));
  };

  const updateImage = (e) => {
    const file = e.target.files[0];
    setServerImage(file);
    setEmptyFile("");
  };

  return (
    <div>
      {showHomeCreate && (
        <div className="create_server_home">
          <h1>Create Server</h1>
          <p>
            Your server is where you and your friends hang out. Make yours and
            start talking.
          </p>
          <div onClick={handleFirstClick}>Create My Own</div>
          {/* <div>Join a Server</div> */}
        </div>
      )}

      {showCreateAbout && (
        <div className="create_server_about">
          <h1>Tell us more about your server</h1>
          <p>
            In order to help with your setup, is your new server for just a few
            friends or a larger community?
          </p>
          <div>
            <div onClick={() => handleSecondClick(false)}>
              For me and my friends
            </div>
            <div onClick={() => handleSecondClick(false)}>
              For a club or community
            </div>
          </div>
          <div onClick={() => handleSecondClick(true)}>Back</div>
        </div>
      )}
      {showCreateFinal && (
        <div className="create_server_final">
          <h1>Customize your server</h1>
          <p>
            Give your new server a personality with a name and an icon. You can
            always change it later
          </p>
          <label htmlFor="upload">
            {serverImage === baseImage && (
              <img
                className="default_server_pic"
                src={serverImage}
                alt="server pic"
              ></img>
            )}
            {serverImage !== baseImage && (
              <img
                className="upload_server_pic"
                src={URL.createObjectURL(serverImage)}
                alt="server pic"
              ></img>
            )}
          </label>
          <div>
            <p>SERVER NAME</p>
            <input
              id="upload"
              type="file"
              accept="image/*"
              hidden={true}
              onChange={updateImage}
              value={emptyFile}
            />
            {imageLoading && <p>Loading...</p>}
            <input
              placeholder={`${user.username}'s server`}
              onChange={(e) => setName(e.target.value)}
            ></input>
          </div>
          <button onClick={handleSubmit}>Create</button>
        </div>
      )}
    </div>
  );
};

export default CreateServer;
