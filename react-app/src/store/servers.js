import { csrfFetch } from "./csrf";

import { setChannels } from "./channels";
// import { setCurrentChannel } from "./channels";

//---------------------------------------actions------------------------------

//---------------------------------------------------------------------servers

const CLEAR_ALL_SERVERS = "logout/CLEAR SERVERS";

export const logoutServers = () => {
  return { type: CLEAR_ALL_SERVERS };
};

const SET_ALL_SERVERS = "servers/SetAllServers";

export const setAllServers = (servers) => {
  return { type: SET_ALL_SERVERS, servers };
};

export const getAllServers = () => async (dispatch) => {
  const res = await fetch("/api/servers/");
  const servers = await res.json();

  dispatch(setAllServers(servers.servers));
  return servers.servers;
};

const SET_USER_SERVERS = "servers/SetUserServers";
export const setUserServers = (servers) => {
  return { type: SET_USER_SERVERS, servers };
};

const ADD_USER_SERVER = "servers/AddServer";
export const addUserServer = (server) => {
  return { type: ADD_USER_SERVER, server };
};

export const joinUserServer = (serverId, userId) => async (dispatch) => {
  const res = await csrfFetch(`/api/servers/${serverId}/members`, {
    method: "POST",
    body: JSON.stringify({ serverId, userId }),
  });

  const data = await res.json();
  dispatch(addUserServer(data.server));
  return data.server;
};
export const leaveUserServer = (serverId, membershipId) => async (dispatch) => {
  const res = await csrfFetch(
    `/api/servers/${serverId}/members/${membershipId}`,
    {
      method: "DELETE",
    }
  );

  const data = await res.json();
  dispatch(removeUserServer(data.serverId));
};

export const postUserServer = (formData) => async (dispatch) => {
  const res = await fetch("/api/servers/", {
    method: "POST",
    body: formData,
  });
  const newServer = await res.json();

  dispatch(addUserServer(newServer));
  return newServer;
};

const UPDATE_USER_SERVERS = "servers/UpdateServers";
export const updateUserServers = (server) => {
  return { type: UPDATE_USER_SERVERS, server };
};

const REMOVE_USER_SERVER = "servers/RemoveServer";
export const removeUserServer = (serverId) => {
  return { type: REMOVE_USER_SERVER, serverId };
};

export const deleteServer = (serverId) => async (dispatch) => {
  await csrfFetch(`/api/servers/${serverId}`, {
    method: "DELETE",
  });
  dispatch(removeUserServer(serverId));
};
//----------------------------------------------------------------------current server
//remember to dispatch setChannels, setCurrentChannel, setMembers
const SET_CURRENT_SERVER = "currentServer/SetCurrentServer";
export const setCurrentServer = (server) => {
  return { type: SET_CURRENT_SERVER, server };
};

const CLEAR_CURRENT_SERVER = "currentServer/CLEAR-current";
export const clearCurrentServer = () => {
  return { type: CLEAR_CURRENT_SERVER };
};

export const getOneServer = (serverId) => async (dispatch) => {
  const res = await csrfFetch(`/api/servers/${serverId}`);

  const server = await res.json();

  dispatch(setCurrentServer(server));

  dispatch(setChannels(server.channels));
};

const UPDATE_CURRENT_SERVER = "currentServer/UpdateServer";
export const updateCurrentServer = (server) => {
  return { type: UPDATE_CURRENT_SERVER, server };
};

export const putCurrentServer = (serverId, formData) => async (dispatch) => {
  const res = await fetch(`/api/servers/${serverId}`, {
    method: "PUT",
    body: formData,
  });
  const updatedServer = await res.json();

  dispatch(updateCurrentServer(updatedServer));
  dispatch(updateUserServers(updatedServer));
  dispatch(setChannels(updatedServer.channels));

  return updatedServer.picture;
};
//------------------------------------------------------------------------members
const ADD_MEMBER_TO_SERVER = "currentServer/AddMember";

export const addMember = (serverId, member) => {
  return { type: ADD_MEMBER_TO_SERVER, serverId, member };
};
const REMOVE_MEMBER_FROM_SERVER = "currentServer/RemoveMember";

export const removeMember = (serverId, memberId) => {
  return { type: REMOVE_MEMBER_FROM_SERVER, serverId, memberId };
};

//---------------------------------------------------------------------------- reducer

const serversReducer = (
  state = {
    userServers: { server: null },
    allServers: { server: null },
    currentServer: {
      server: null,
    },
  },
  action
) => {
  let newState = { ...state };
  switch (action.type) {
    case CLEAR_ALL_SERVERS: {
      newState = {
        userServers: { server: null },
        allServers: { server: null },
        currentServer: {
          server: null,
        },
      };
      return newState;
    }

    case CLEAR_CURRENT_SERVER: {
      newState.currentServer = null;
      return newState;
    }
    case SET_ALL_SERVERS: {
      newState.allServers = action.servers;
      return newState;
    }
    case SET_USER_SERVERS: {
      newState.userServers = action.servers;
      return newState;
    }

    case UPDATE_USER_SERVERS: {
      newState.userServers[action.server.id] = action.server;
      return newState;
    }

    case ADD_USER_SERVER: {
      newState.userServers[action.server.id] = action.server;
      return newState;
    }

    case REMOVE_USER_SERVER: {
      delete newState.userServers[action.serverId];
      return newState;
    }

    case SET_CURRENT_SERVER: {
      newState.currentServer = action.server;
      return newState;
    }

    case UPDATE_CURRENT_SERVER: {
      newState.currentServer = action.server;
      return newState;
    }

    case ADD_MEMBER_TO_SERVER: {
      newState.currentServer.members[action.member.id] = action.member;
      return newState;
    }

    case REMOVE_MEMBER_FROM_SERVER: {
      delete newState.currentServer.members[action.memberId];
      return newState;
    }

    default:
      return state;
  }
};

export default serversReducer;
