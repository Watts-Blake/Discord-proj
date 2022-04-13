import { csrfFetch } from "./csrf";

//---------------------------------------------------------------------channels
const SET_SERVER_CHANNELS = "channels/setsChannels";
// remmeber to dispatch setCurrentChannel
export const setChannels = (channels) => {
  return { type: SET_SERVER_CHANNELS, channels };
};

const ADD_CHANNEL_TO_SERVER = "channels/AddChannel";

export const addChannel = (serverId, channel) => {
  return { type: ADD_CHANNEL_TO_SERVER, serverId, channel };
};
const UPDATE_CHANNEL_ON_SERVER = "channels/UpdateChannel";

export const updateChannel = (serverId, channel) => {
  return { type: UPDATE_CHANNEL_ON_SERVER, serverId, channel };
};
const REMOVE_CHANNEL_FROM_SERVER = "channels/RemoveChannel";

export const removeChanel = (serverId, channelId) => {
  return { type: REMOVE_CHANNEL_FROM_SERVER, serverId, channelId };
};
//----------------------------------------------------------------------current channel
// remember to dispatch setMessages, setPins
const SET_CURRENT_CHANNEL = "currentChannel/SetCurrentChannel";
export const setCurrentChannel = (channel) => {
  return { type: SET_CURRENT_CHANNEL, channel };
};

const ADD_CHANNEL_MESSAGE = "currentChannel/AddMessage";
export const addChannelMessage = (message) => {
  return { type: ADD_CHANNEL_MESSAGE, message };
};
const UPDATE_CHANNEL_MESSAGE = "currentChannel/UpdateMessage";
export const updateChannelMessage = (message) => {
  return { type: UPDATE_CHANNEL_MESSAGE, message };
};
const REMOVE_CHANNEL_MESSAGE = "currentChannel/RemoveMessage";

export const removeChanelMessage = (messageId) => {
  return { type: REMOVE_CHANNEL_MESSAGE, messageId };
};
//--------------------------------------reducer
const channelsReducer = (
  state = {
    channels: {},
    currentChannel: { messages: {}, pins: {} },
  },
  action
) => {
  let newState = { ...state };
  switch (action.type) {
    case ADD_CHANNEL_TO_SERVER: {
    }

    case UPDATE_CHANNEL_ON_SERVER: {
    }

    case REMOVE_CHANNEL_FROM_SERVER: {
    }

    case SET_SERVER_CHANNELS: {
    }

    case SET_CURRENT_CHANNEL: {
    }

    case ADD_CHANNEL_MESSAGE: {
    }

    case UPDATE_CHANNEL_MESSAGE: {
    }

    case REMOVE_CHANNEL_MESSAGE: {
    }
    default:
      return state;
  }
};

export default channelsReducer;
