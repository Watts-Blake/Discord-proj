import "./Servers.css";
import { useState } from "react";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";

const Servers = ({ userServers }) => {
  const [loaded, setLoaded] = useState(false);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, [userServers]);

  return (
    loaded && (
      <div className="server_container">
        {userServers?.map((server) => (
          <NavLink
            to={`/channels/${server.id}`}
            key={server.id}
            className={
              hover === server.id
                ? `single_server hover_server`
                : `single_server`
            }
            activeClassName="active_server"
            onMouseEnter={() => setHover(server.id)}
            onMouseLeave={() => setHover(false)}
          >
            <img
              className="left_side_server_icon"
              src={server.picture}
              alt="server icon"
            />
          </NavLink>
        ))}
      </div>
    )
  );
};

export default Servers;
