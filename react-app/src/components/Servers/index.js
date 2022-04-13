import "./Servers.css";
import { useState } from "react";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";
const Servers = ({ userServers }) => {
  const [loaded, setLoaded] = useState(false);
  let history = useHistory();
  useEffect(() => {
    setLoaded(true);
  }, []);
  return (
    loaded && (
      <div className="server_container">
        {userServers.map((server) => (
          <NavLink
            to={`/home/servers/${server.id}`}
            onClick={() => history.push(`/home/servers/${server.id}`)}
            key={server.id}
          >
            <img
              className="left_side_icon"
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
