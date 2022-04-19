import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { signUp } from "../../store/session";
import "./Signup.css";
import { Link } from "react-router-dom";

import { grabFirstChannelId, grabFirstServerId } from "../../utils";

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [emptyFile, setEmptyFile] = useState('')
  const [repeatPassword, setRepeatPassword] = useState("");
  const [emptyFile, setEmptyFile] = useState("");
  const baseImage = "/svgs/svgexport-94.svg";
  const [image, setImage] = useState(baseImage);
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  const updateImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setEmptyFile("");
  };

  const onSignUp = async (e) => {
    e.preventDefault();

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

  if (user) {
    return (
      <Redirect
        to={`/channels/${grabFirstServerId(
          user.serverMember
        )}/${grabFirstChannelId(user.serverMember)}`}
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
      <form className="sign_form" onSubmit={onSignUp}>
        <h1 className="sign_title">Create an account</h1>
        <div>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
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
        <div>
          <input
            id="upload"
            type="file"
            accept="image/*"
            hidden={true}
            onChange={updateImage}
            value={emptyFile}
          />{" "}
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
        <button className="submit_sign_btn" type="submit">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUpForm;
