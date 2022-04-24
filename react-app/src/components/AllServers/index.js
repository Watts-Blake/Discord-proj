import "./AllServers.css";
import { useState, useEffect } from "react";
import { getAllServers } from "../../store/servers";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { joinUserServer } from "../../store/servers";
import { getOneServer } from "../../store/servers";
import { getOneChannel } from "../../store/channels";
import { useContext } from "react";
import { DmRoomViewContext } from "../../context/DmRoomViewContext";
import { useHistory } from "react-router-dom";
const AllServers = () => {
  console.log("hereeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee");
  const dispatch = useDispatch();
  const { setDmRoomsView } = useContext(DmRoomViewContext);
  const [loaded, setLoaded] = useState(false);
  const [servers, setServers] = useState("");
  const user = useSelector((state) => state.session.user);
  const userServers = useSelector((state) => state.servers.userServers);
  let history = useHistory();

  const filterServers = (serversObj, filterOutObj) => {
    let newServers = serversObj;
    if (!filterOutObj) return Object.values(serversObj);
    for (const server in filterOutObj) {
      if (newServers[server]) {
        delete newServers[server];
      }
    }
    if (!newServers) return false;
    return Object.values(newServers);
  };

  useEffect(() => {
    console.log("hereeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee");
    dispatch(getAllServers())
      .then((servers) => setServers(filterServers(servers, userServers)))
      .then(() => setLoaded(true));
  }, [dispatch, userServers, history]);

  const handleJoin = async (e, serverId, channelId) => {
    e.preventDefault();
    await dispatch(joinUserServer(serverId, user.id))
      .then(() => dispatch(getOneServer(serverId)))
      .then(() => dispatch(getOneChannel(channelId)))
      .then(() => setDmRoomsView(false))
      .then(() => history.push(`/channels/${serverId}/${channelId}`));
  };

  return (
    loaded && (
      <div className="all_servers_container">
        <div className="all_servers_header">
          <img
            className="all_servers_header_pic"
            src="/svgs/all-servers-pic.svg"
            alt="all servers"
          />
          <div className="header_text">
            <h1>Find your community on Diss-cord</h1>
            <h4>
              From gaming, to music, to learning, there's a place for you.
            </h4>
          </div>
        </div>

        <h2 className="featured">Featured Servers</h2>
        {servers.length ? (
          <div className="all_servers_map">
            {servers.map(
              (server) =>
                !server.privateServer && (
                  <div key={server.id} className="singular_server">
                    <h3>{server.name}</h3>
                    <img
                      className="server_pics"
                      src={server.picture}
                      alt="serverpic"
                    />
                    <div className="server_about">
                      <h5 className="server_topic">{server.topic}</h5>
                      <h6 className="server_description">
                        {server.description}
                      </h6>
                      <h6 className="members_length">
                        {server.membersLength} members
                      </h6>
                    </div>
                    <NavLink
                      to={`/channels/${server.id}/${server.firstChannelId}`}
                      onClick={(e) =>
                        handleJoin(e, server.id, server.firstChannelId)
                      }
                    >
                      <div className="join_server_button">
                        <p>Join Server</p>
                        <img
                          className="join_server"
                          src="/svgs/joinServer.svg"
                          alt="join"
                        />
                      </div>
                    </NavLink>
                  </div>
                )
            )}
          </div>
        ) : (
          <h2 className="joined_all_msg">
            You have joined all of the available servers, please check back
            later too see if anymore have been added...
          </h2>
        )}
      </div>
    )
  );
};

export default AllServers;
