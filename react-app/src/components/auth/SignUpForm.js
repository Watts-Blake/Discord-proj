import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { signUp } from "../../store/session";
import "./Signup.css";
import { Link } from "react-router-dom";
import { fileTypes } from "../../utils";

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [activeSignup, setActiveSignup] = useState(false);
  const [repeatPassword, setRepeatPassword] = useState("");
  const [emptyFile, setEmptyFile] = useState("");
  const baseImage = "/svgs/svgexport-94.svg";
  const [image, setImage] = useState(baseImage);
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  const updateImage = (e) => {
    const file = e.target.files[0];
    setImage(file);

    if (file && !fileTypes.includes(`${file.type.split("/")[1]}`)) {
      console.log("innnnnnnnnnnnnn");
      setImage(baseImage);
      setErrors([
        ...errors,
        "Please Upload a new file, or continue to signup and use our default picture. Uploaded file should be a pdf, png, jpg, jpeg, or gif.",
      ]);
    } else {
      setImage(file);
    }

    setEmptyFile("");
  };

  const validate = () => {
    setErrors([]);
    let errors = [];
    let valid = 0;
    if (username.length < 1) {
      valid = -1;
      errors.push("You must include a username.");
      console.log(errors);
      setActiveSignup(false);
    } else {
      valid = 1;
    }
    if (username.length > 20) {
      valid = -1;
      errors.push("Your username must be less than 20 characters.");
      console.log(errors);
      setUsername("");
      setActiveSignup(false);
    } else {
      if (valid > 0) valid = 1;
    }
    // eslint-disable-next-line
    let reg = // eslint-disable-next-line
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (!email.toLowerCase().match(reg)) {
      valid = -1;
      setEmail("");
      errors.push("Invalid email.");
      console.log(errors);
      setActiveSignup(false);
    } else {
      if (valid > 0) valid = 1;
    }
    if (password !== repeatPassword) {
      valid = -1;
      setPassword("");
      setRepeatPassword("");
      errors.push("Passwords do not match.");
      console.log(errors);
      setActiveSignup(false);
    } else {
      if (valid > 0) valid = 1;
    }

    if (valid > 0) {
      return true;
    } else {
      setErrors(errors);
      return false;
    }
  };

  const onSignUp = async (e) => {
    e.preventDefault();

    if (validate()) {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("image", image);
      formData.append("username", username);
      formData.append("password", password);
      formData.append("repeat_password", repeatPassword);

      if (password === repeatPassword) {
        const data = await dispatch(signUp(formData));
        if (data) {
          setErrors(data);
        }
      }
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  useEffect(() => {
    if (
      username.length > 0 &&
      email.length > 0 &&
      password.length > 0 &&
      repeatPassword.length > 0
    ) {
      setActiveSignup(true);
    } else {
      setActiveSignup(false);
    }
  }, [username, email, password, repeatPassword, image, errors, emptyFile]);

  if (user) {
    console.log(Object.values(user.dmChannelMember)[0].id);
    return (
      <Redirect
        to={`/channels/@me/${Object.values(user.dmChannelMember)[0].id}`}
      />
    );
  }

  return (
    <div className="signup_container">
      <img
        className="sign_background"
        src="/svgs/logg-page.svg"
        alt="logpage"
      />
      <div className="sign_form">
        <h1 className="sign_title">Create an account</h1>
        <label htmlFor="upload">
          {image === baseImage && (
            <img
              className="default_server_pic"
              src={image}
              alt="server pic"
            ></img>
          )}
          {image !== baseImage && (
            <img
              className="upload_server_pic"
              src={URL.createObjectURL(image)}
              alt="server pic"
            ></img>
          )}
        </label>

        {errors.length > 0 && (
          <div className="error">
            {errors.map((error, ind) => (
              <div key={ind || error}>{error}</div>
            ))}
          </div>
        )}

        <div>
          <input
            id="upload"
            type="file"
            accept="image/*"
            hidden={true}
            onChange={updateImage}
            value={emptyFile}
          />
        </div>
        <div className="sign_credential first_cred">
          <label>Email</label>
          <input
            type="text"
            name="email"
            onChange={updateEmail}
            value={email}
          ></input>
        </div>
        <div className="sign_credential">
          <label>User Name</label>
          <input
            type="text"
            name="username"
            onChange={updateUsername}
            value={username}
          ></input>
        </div>
        <div className="sign_credential">
          <label>Password</label>
          <input
            type="password"
            name="password"
            onChange={updatePassword}
            value={password}
          ></input>
        </div>
        <div className="sign_credential">
          <label>Confirm Password</label>
          <input
            type="password"
            name="repeat_password"
            onChange={updateRepeatPassword}
            value={repeatPassword}
            required={true}
          ></input>
        </div>
        <Link className="login_redirect" to="/login">
          Already have an account?
        </Link>
        <div
          className={
            activeSignup ? "active submit_sign_btn" : "submit_sign_btn"
          }
          onClick={activeSignup ? onSignUp : () => validate()}
        >
          Sign Up
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
