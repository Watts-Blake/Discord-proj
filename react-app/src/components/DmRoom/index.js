import "./DmRoom.css";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import UserActivity from "../UserActivity";

const DmRoom = ({ room }) => {
  const user = useSelector((state) => state.session.user);
  const [memberIcon, setMemberIcon] = useState();
  //   const [loaded, setLoaded] = useState(false);

  const roomeMemberTitle = (obj) => {
    const userNameArr = [];
    for (let key in obj) {
      if (obj[key].username !== user.username) {
        userNameArr.push(obj[key].username);
      }
    }
    return userNameArr.join(", ");
  };

  //   const getMessageRoomImg = (membersObj) => {
  //     const membersObjCopy = { ...membersObj };
  //     delete membersObjCopy[user.id];
  //     const memberArr = Object.values(membersObjCopy);

  //     console.log("right here", membersObj);
  //     if (memberArr.length > 1) {
  //       return false;
  //     } else {
  //       setMemberIcon(memberArr[0]);
  //       return memberArr[0];
  //     }
  //   };

  useEffect(() => {
    const membersObj = { ...room.members };
    delete membersObj[user.id];
    const memberArr = Object.values(membersObj);

    console.log("right here", membersObj);
    if (memberArr.length > 1) {
      setMemberIcon(false);
    } else {
      setMemberIcon(memberArr[0]);
    }
  }, [room.members, user.id]);

  return (
    <NavLink
      key={room.id}
      to={`/channels/@me/${room.id}`}
      className="direct_message_room"
      activeClassName="active_direct_message_room"
    >
      <img
        src={memberIcon?.profilePicture || "/svgs/group-message-ico.svg"}
        alt="icon "
        className="dm_room_icon"
      />
      {memberIcon && (
        <UserActivity userId={memberIcon.userId} fromDmRooms={true} />
      )}
      <span className="dm_room_members">{roomeMemberTitle(room.members)}</span>
    </NavLink>
  );
};

export default DmRoom;
