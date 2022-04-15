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
