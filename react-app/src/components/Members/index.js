import "./Members.css";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
const Members = ({ serversObj }) => {
  const channels = useSelector((state) => state.channels);
  // const members = Object.values(currentChannel.members);
  const [loaded, setLoaded] = useState(true);
  const [members, setMembers] = useState();
  useEffect(() => {
    let isActive = true;
    const currentChannel = channels?.currentChannel;
    console.log("hereeeeeee", currentChannel);
    if (currentChannel && isActive) {
      // if (
      //   (!currentChannel?.privateChannel || !currentChannel?.dmChannel) &&
      //   serversObj?.currentServer?.members
      // ) {
      //   setMembers(Object.values(serversObj?.currentServer?.members));
      // } else {
      //   if
      //   setMembers(Object.values(currentChannel?.members));
      // }

      if (
        (currentChannel.privateChannel || currentChannel.dmChannel) &&
        currentChannel?.members
      ) {
        setMembers(Object.values(currentChannel?.members));
      }

      if (
        !currentChannel?.privateChannel &&
        !currentChannel?.dmChannel &&
        serversObj?.currentServer?.members
      ) {
        setMembers(Object.values(serversObj?.currentServer?.members));
      }
    }
    setLoaded(true);
    return () => (isActive = false);
  }, [channels.currentChannel, serversObj.currentServer.members]);

  // useEffect(() => {
  //   const membersObj = serversObj.currentServer;
  //   dmRoomsView
  //     ? setMembers(Object.values(currentChannelMembs))
  //     : setMembers(Object.values(membersObj.members));

  //   setLoaded(true);
  // }, [serversObj.currentServer, dmRoomsView, currentChannelMembs]);
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
