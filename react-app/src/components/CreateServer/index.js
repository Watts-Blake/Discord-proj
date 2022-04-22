import "./CreateServer.css";
import { useEffect, useState } from "react";
import { fileTypes } from "../../utils";
import { useSelector } from "react-redux";
import { postUserServer } from "../../store/servers";
import { useDispatch } from "react-redux";
const CreateServer = ({ setShowModal }) => {
  const [showHomeCreate, setShowHomeCreate] = useState(true);
  const [showCreateAbout, setShowCreateAbout] = useState(false);
  const [showCreateFinal, setShowCreatFinal] = useState(false);
  const [name, setName] = useState("");
  const [valid, setValid] = useState(false);
  const [activeCreate, setActiveCreate] = useState(false);
  const [errors, setErrors] = useState([]);
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

  const handleTransition = (transition) => {
    console.log(transition);
    if (transition === 1) {
      console.log("innnnnnn");
      setShowCreateAbout(false);
      setShowCreatFinal(true);
    }

    if (transition === -1) {
      setShowCreateAbout(false);
      setShowHomeCreate(true);
    }
    if (transition === -2) {
      setShowCreatFinal(false);
      setShowCreateAbout(true);
    }
  };

  useEffect(() => {
    if (name.length > 0) {
      setActiveCreate(true);
    } else {
      setActiveCreate(false);
    }
    if (errors.length > 1) setErrors([]);
  }, [name, serverImage, errors]);

  useEffect(() => {
    if (valid) setErrors([]);
  }, [valid]);

  useEffect(() => {});
  const validate = () => {
    let valid = true;
    if (name.length < 1) {
      valid = false;
      errors.push("You must include a Server Name.");
      setActiveCreate(false);
    } else {
      valid = true;
    }
    if (name.length > 20) {
      valid = false;
      errors.push("Your Server Name must be less than 20 characters.");
      setActiveCreate(false);
    } else {
      valid = true;
    }

    if (valid) return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validate()) {
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
    }
  };

  const updateImage = (e) => {
    const file = e.target.files[0];

    if (file && !fileTypes.includes(`${file.type.split("/")[1]}`)) {
      setServerImage(baseImage);
      errors.push(
        "Please Upload a new file, or click create to use our default icon. Uploaded file should be a pdf, png, jpg, jpeg, or gif."
      );
    } else {
      setServerImage(file);
      setValid(true);
    }

    setEmptyFile("");
  };

  return (
    <div className="create_server_modal">
      {showHomeCreate && (
        <div className="create_server_home">
          <h1>Create Server</h1>
          <p>
            Your server is where you and your friends hang out. Make yours and
            start talking.
          </p>
          <button className="create_my_own" onClick={handleFirstClick}>
            <div className="create_left">
              <img src="/svgs/create.svg" alt="create" />
              <p>Create My Own</p>
            </div>
            <img
              className="right_carrot"
              src="/svgs/right-carrot.svg"
              alt="create"
            />
          </button>
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
            <button
              className="create_my_own"
              onClick={() => handleTransition(1)}
            >
              <div className="create_left">
                <img src="/svgs/community.svg" alt="create" />
                <p>For a club or community</p>
              </div>
              <img
                className="right_carrot"
                src="/svgs/right-carrot.svg"
                alt="create"
              />
            </button>
            <button
              className="create_my_own"
              onClick={() => handleTransition(1)}
            >
              <div className="create_left">
                <img src="/svgs/club.svg" alt="create" />
                <p>For me and my friends</p>
              </div>
              <img
                className="right_carrot"
                src="/svgs/right-carrot.svg"
                alt="create"
              />
            </button>
          </div>
          <div className="back" onClick={() => handleTransition(-1)}>
            <button className="back_text">Back</button>
          </div>
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
                style={{ cursor: "pointer" }}
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
          {errors.length > 0 &&
            errors.map((error) => (
              <p className="error" id={error}>
                {error}
              </p>
            ))}
          <div className="create_input_container">
            <label className="create_label" htmlFor="server_name">
              SERVER NAME
            </label>
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
              id="server_name"
              className="create_input"
              placeholder={`${user.username}'s server`}
              onChange={(e) => setName(e.target.value)}
            ></input>
          </div>

          <div className="create_btns_container">
            <button onClick={() => handleTransition(-2)} className="back_text">
              Back
            </button>

            <button
              className={activeCreate ? "create_btn active_btn" : "create_btn"}
              onClick={activeCreate ? handleSubmit : () => validate()}
            >
              Create
            </button>

            {/* {!activeCreate && <button className="create_btn">Create</button>} */}
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateServer;
