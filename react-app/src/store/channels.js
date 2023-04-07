import { csrfFetch } from "./csrf";

//---------------------------------------------------------------------channels

const CLEAR_CHANNELS_STORE = "logout/CLEAR CHANNELS";
export const logoutChannels = () => {
  return { type: CLEAR_CHANNELS_STORE };
};

const SET_SERVER_CHANNELS = "channels/setChannels";
// remmeber to dispatch setCurrentChannel
export const setChannels = (channels) => {
  return { type: SET_SERVER_CHANNELS, channels };
};
const SET_USER_DM_CHANNELS = "dms/setsUserDmChannels";
// remmeber to dispatch setCurrentDmRoom
export const setUserDms = (dmRooms) => {
  return { type: SET_USER_DM_CHANNELS, dmRooms };
};

const ADD_CHANNEL_TO_SERVER = "channels/AddChannel";

export const addChannel = (serverId, channel) => {
  return { type: ADD_CHANNEL_TO_SERVER, serverId, channel };
};

export const postChannel = (channel) => async (dispatch) => {
  const res = await csrfFetch(`/api/servers/${channel.serverId}/channels`, {
    method: "POST",
    body: JSON.stringify(channel),
  });

  const newChannel = await res.json();

  dispatch(addChannel(newChannel.serverId, newChannel));
  dispatch(setCurrentChannel(newChannel));
  return newChannel;
};

const UPDATE_CHANNEL_ON_SERVER = "channels/UpdateChannel";

export const updateChannel = (serverId, channel) => {
  return { type: UPDATE_CHANNEL_ON_SERVER, serverId, channel };
};

export const putChannel = (channel) => async (dispatch) => {
  const res = await csrfFetch(
    `/api/servers/${channel.serverId}/channels/${channel.id}`,
    {
      method: "PUT",
      body: JSON.stringify(channel),
    }
  );

  const updatedChannel = await res.json();

  dispatch(updateChannel(updatedChannel.serverId, updatedChannel));
};

const REMOVE_CHANNEL_FROM_SERVER = "channels/RemoveChannel";

export const removeChanel = (serverId, channelId) => {
  return { type: REMOVE_CHANNEL_FROM_SERVER, serverId, channelId };
};

export const deleteChannel = (serverId, channelId) => async (dispatch) => {
  const res = await csrfFetch(
    `/api/servers/${serverId}/channels/${channelId}`,
    {
      method: "DELETE",
    }
  );
  const deletedChannel = await res.json();
  dispatch(removeChanel(serverId, deletedChannel.channelId));
};

//----------------------------------------------------------------------current channel
// remember to dispatch setMessages, setPins
const SET_CURRENT_CHANNEL = "currentChannel/SetCurrentChannel";
export const setCurrentChannel = (channel) => {
  return { type: SET_CURRENT_CHANNEL, channel };
};

export const getOneChannel = (channelId) => async (dispatch) => {
  const res = await csrfFetch(`/api/channels/${channelId}`);

  const channel = await res.json();
  dispatch(setCurrentChannel(channel));
  return channel;
};

const CLEAR_CURRENT_CHANNEL = "currentChannel/Clear";
export const clearCurrentChannel = () => {
  return { type: CLEAR_CURRENT_CHANNEL };
};

//--------------------------------------reducer
const channelsReducer = (
  state = {
    channels: [],
    currentChannel: { pins: [], members: [] },
    userDmChannels: [],
    dmCurrentChannel: [],
  },
  action
) => {
  let newState = { ...state };
  switch (action.type) {
    case CLEAR_CHANNELS_STORE: {
      newState = {
        channels: {},
        currentChannel: { channel: null, pins: {} },
        userDmChannels: {},
        dmCurrentChannel: {},
      };
      return newState;
    }

    case SET_USER_DM_CHANNELS: {
      newState.userDmChannels = action.dmRooms;
      return newState;
    }

    case ADD_CHANNEL_TO_SERVER: {
      newState.channels[action.channel.id] = action.channel;
      return newState;
    }

    case UPDATE_CHANNEL_ON_SERVER: {
      newState.channels[action.channel.id] = action.channel;
      newState.currentChannel = action.channel;
      return newState;
    }

    case REMOVE_CHANNEL_FROM_SERVER: {
      delete newState.channels[action.channelId];
      return newState;
    }

    case SET_SERVER_CHANNELS: {
      newState.channels = action.channels;
      return newState;
    }

    case SET_CURRENT_CHANNEL: {
      newState.currentChannel = action.channel;
      return newState;
    }

    case CLEAR_CURRENT_CHANNEL: {
      newState.currentChannel = null;
      return newState;
    }

    default:
      return state;
  }
};

export default channelsReducer;
