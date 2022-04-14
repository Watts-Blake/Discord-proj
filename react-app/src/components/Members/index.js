import "./Members.css";
import { useEffect, useState } from "react";
const Members = ({ serversObj }) => {
  const [loaded, setLoaded] = useState(false);
  const [members, setMembers] = useState();
  useEffect(() => {
    const membersObj = serversObj.currentServer;
    if (membersObj.members) setMembers(Object.values(membersObj.members));

    setLoaded(true);
  }, [serversObj.currentServer]);

  return (
    loaded && (
      <div className="members_list">
        {members?.map((member) => (
          <div className="member" key={member.id}>
            <img
              className="member_photo"
              src={`${member.profilePicture}`}
              alt="profile pic"
            ></img>
            <h4>{member.username}</h4>
          </div>
        ))}
      </div>
    )
  );
};

export default Members;
