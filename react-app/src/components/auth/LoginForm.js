import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { login } from "../../store/session";

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const user = useSelector((state) => state.session.user);

  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };
  const grabFirstServerId = (serverMember) => {
    let servers = Object.values(serverMember);

    // let finalChannels = Object.values(newChannels[0].channels);
    return servers[0].id;
  };
  const grabFirstChannelId = (serverMember) => {
    let channels = Object.values(serverMember);
    let newChannels = Object.values(channels);
    let finalChannels = Object.values(newChannels[0].channels);
    return finalChannels[0].id;
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
    !user && (
      <form onSubmit={onLogin}>
        <div>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            name="email"
            type="text"
            placeholder="Email"
            value={email}
            onChange={updateEmail}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={updatePassword}
          />
          <button type="submit">Login</button>
        </div>
      </form>
    )
  );
};

export default LoginForm;
