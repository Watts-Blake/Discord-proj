export const grabFirstServerId = (serverMember) => {
  let servers = Object.values(serverMember);

  return servers[0].id;
};
export const grabFirstChannelId = (serverMember) => {
  let channels = Object.values(serverMember);
  let newChannels = Object.values(channels);
  let finalChannels = Object.values(newChannels[0].channels);
  return finalChannels[0].id;
};

const grabChannelMembers = async (channelId) => {
  const res = await fetch(`/api/channels/${channelId}/members`);
  const channelMembersObj = await res.json();
  return channelMembersObj;
};
const grabServerMembers = async (serverId) => {
  const res = await fetch(`/api/servers/${serverId}/members`);
  const serverMembersObj = await res.json();
  return serverMembersObj;
};

export const checkMember = async (serverId, channelId, userId) => {
  if (!serverId) {
    const channelMembersObj = await grabChannelMembers(channelId);
    const channelMemberssArr = Object.values(channelMembersObj?.channelMembers);
    if (channelMemberssArr.find((members) => members.user_id === userId)) {
      console.log("here", channelMemberssArr[1].user_id);
      return true;
    } else {
      return false;
    }
  } else {
    const serverMembersObj = await grabServerMembers(serverId);
    const serverMemberssArr = Object.values(serverMembersObj?.serverMembers);
    if (serverMemberssArr.find((members) => members.userId === userId)) {
      return true;
    } else {
      return false;
    }
  }
};

// if (selectedFile) {
//       if (selectedFile.type !== "audio/wav" && selectedFile.type !== "audio/mpeg") {
//         errors.push('Unsupported file type.')
//       };
//     };
