import { csrfFetch } from "./csrf";

import { setChannels } from "./channels";

//---------------------------------------actions------------------------------

//---------------------------------------------------------------------servers
const SET_USER_SERVERS = "servers/SetUserServers";
export const setUserServers = (servers) => {
  return { type: SET_USER_SERVERS, servers };
};

const ADD_USER_SERVER = "servers/AddServer";
export const addUserServer = (server) => {
  return { type: ADD_USER_SERVER, server };
};
export const postUserServer = (formData) => async (dispatch) => {
  console.log("from thunkkkkkk", formData["serverPicture"]);
  const res = await fetch("/api/servers/", {
    method: "POST",
    body: formData,
  });
  const newServer = await res.json();

  dispatch(addUserServer(newServer));
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
  console.log("from thunkkkkkk", formData["serverPicture"]);
  const res = await fetch(`/api/servers/${serverId}`, {
    method: "PUT",
    body: formData,
  });
  const updatedServer = await res.json();

  dispatch(updateCurrentServer(updatedServer));
  dispatch(updateUserServers(updatedServer));

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
