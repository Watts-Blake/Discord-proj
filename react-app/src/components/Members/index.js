import "./Members.css";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
const Members = () => {
  const currentChannel = useSelector((state) => state.channels.currentChannel);
  const currentServerMembers = useSelector(
    (state) => state.servers.currentServer.members
  );

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(false);
    if (currentChannel) {
      setLoaded(true);
    }
  }, [currentChannel]);

  if (loaded) {
    return (
      <div className="members_list">
        {Object.values(currentServerMembers)?.map((member) => (
          <div className="member" key={member.id * 2}>
            <img
              className="member_photo"
              src={`${member.profilePicture}`}
              alt="profile pic"
            ></img>
            <h4>{member.username}</h4>
          </div>
        ))}
      </div>
    );
  }

  return <h1>Loading...</h1>;
};

export default Members;
