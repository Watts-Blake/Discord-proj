import "./AllServers.css";
import { useState, useEffect } from "react";
import { getAllServers } from "../../store/servers";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
const AllServers = () => {
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);
  const [servers, setServers] = useState("");
  useEffect(() => {
    dispatch(getAllServers())
      .then((servers) => setServers(Object.values(servers)))
      .then(() => setLoaded(true));
  }, [dispatch]);

  return (
    loaded && (
      <div className="all_servers_container">
        <img
          className="all_servers_header_pic"
          src="/svgs/all-servers-pic.svg"
          alt="all servers"
        />

        <h2 className="featured">Featured Servers</h2>
        <div className="all_servers_map">
          {servers.map((server) => (
            <NavLink
              to={`/channels/${server.id}/${server.firstChannelId}`}
              key={server.id}
              className="singular_server"
            >
              <h3>{server.name}</h3>
              <img
                className="server_pics"
                src={server.picture}
                alt="serverpic"
              />
              <div className="server_about">
                <h5 className="server_topic">{server.topic}</h5>
                <h6 className="server_description">{server.description}</h6>
              </div>
            </NavLink>
          ))}
        </div>
      </div>
    )
  );
};

export default AllServers;
