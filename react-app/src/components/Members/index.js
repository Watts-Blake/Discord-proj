import "./Members.css";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
const Members = ({ serversObj }) => {
  const [loaded, setLoaded] = useState(false);
  const [members, setMembers] = useState();
  useEffect(() => {
    const membersObj = serversObj.currentServer;
    if (membersObj.members) setMembers(Object.values(membersObj.members));

    setLoaded(true);
  }, [serversObj]);

  return (
    loaded && (
      <div>
        <h1>All Members</h1>
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
