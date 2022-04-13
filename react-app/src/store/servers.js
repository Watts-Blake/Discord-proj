import { csrfFetch } from "./csrf";

import { setServerChannels } from "./channels";

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
const UPDATE_USER_SERVERS = "servers/UpdateServers";
export const updateUserServer = (server) => {
  return { type: UPDATE_USER_SERVERS, server };
};

const REMOVE_USER_SERVER = "servers/RemoveServer";
export const removeUserServer = (serverId) => {
  return { type: REMOVE_USER_SERVER, serverId };
};
//----------------------------------------------------------------------current server
//remember to dispatch setChannels, setCurrentChannel, setMembers
const SET_CURRENT_SERVER = "currentServer/SetCurrentServer";
export const setCurrentServer = (server) => {
  return { type: SET_CURRENT_SERVER, server };
};
const UPDATE_CURRENT_SERVER = "currentServer/UpdateServer";
export const updateCurrentServer = (server) => {
  return { type: UPDATE_CURRENT_SERVER, server };
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
      members: {},
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
      delete newState.userServers[action.server.id];
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
