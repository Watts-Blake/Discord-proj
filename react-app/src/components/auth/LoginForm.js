import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { login } from "../../store/session";
import AboutLinks from "../AboutLinks";
import "./Login.css";
import { Link } from "react-router-dom";

const LoginForm = ({ activateCurrUser, retrieveActiveUsers }) => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const user = useSelector((state) => state.session.user);

  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password)).then(() => {
      activateCurrUser();
      retrieveActiveUsers();
    });
    if (data) {
      setErrors(data);
    }
  };

  const handleDemo = async (e) => {
    e.preventDefault();
    await dispatch(login("demo@demo.com", "password")).then(() => {
      activateCurrUser();
      retrieveActiveUsers();
    });
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return (
      <Redirect
        to={`/channels/@me/${Object.values(user.dmChannelMember)[0].id}`}
      />
    );
  }

  return (
    !user && (
      <div className="login_container">
        <img
          className="log_background"
          src="/svgs/logg-page.svg"
          alt="logpage"
        />
        <Link to="/" className="home_link">
          <img src="/svgs/gray-disc-home.svg" alt="home" />
          <h3>Diss-cord</h3>
        </Link>
        <form className="login_form" onSubmit={onLogin}>
          <div className="login_header">
            <h1 className="login_title">Welcome back!</h1>
            <h5 className="login_supp">We're so excited to see you again!</h5>
          </div>
          <div>
            {errors.map((error, ind) => (
              <div key={ind} className="error">
                {error}
              </div>
            ))}
          </div>
          <div className="login_credential top_cred">
            <label htmlFor="email">Email</label>
            <input
              name="email"
              type="text"
              placeholder="Email"
              value={email}
              onChange={updateEmail}
            />
          </div>
          <div className="login_credential bot_cred">
            <label htmlFor="password">Password</label>
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={updatePassword}
            />
          </div>
          <div className="signup_link_container">
            <p>Need an acoount?</p>
            <Link to="/signup" className="register">
              Register
            </Link>
          </div>
          <div className="buttons_container">
            <button className="submit_btn" type="submit">
              Login
            </button>
            <button className="submit_btn demo" onClick={handleDemo}>
              Demo User
            </button>
          </div>
        </form>
        <AboutLinks />
      </div>
    )
  );
};

export default LoginForm;
