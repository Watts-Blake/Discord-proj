export const SET_MESSAGES = "messages/setMessages";

export const setMessages = (messages, channelId, serverId) => {
  return { type: SET_MESSAGES, messages, channelId, serverId };
};

export const RECEIVE_MESSAGE = "messages/receive";

export const receiveMessage = (message, channelId, serverId) => {
  return { type: RECEIVE_MESSAGE, message, channelId, serverId };
};

export const UPDATE_MESSAGE = "messages/update";

export const updateMessage = (message) => {
  return { type: UPDATE_MESSAGE, message };
};

export const DELETE_MESSAGE = "messages/delete";

export const deleteMessage = (messageId) => {
  return { type: DELETE_MESSAGE, messageId };
};

export const SET_ROOMS = "rooms/setRooms";
export const setRooms = (rooms) => {
  return {
    type: SET_ROOMS,
    rooms,
  };
};
export const JOIN_ROOM = "rooms/joinRoom";
export const joinRoom = (room) => {
  return {
    type: JOIN_ROOM,
    room,
  };
};
export const LEAVE_ROOM = "rooms/leaveRoom";
export const leaveRoom = (room) => {
  return {
    type: LEAVE_ROOM,
    room,
  };
};

export const ROOM_NOTIFICATION = "rooms/roomNotification";

export const roomNotification = (room, message) => {
  return {
    type: ROOM_NOTIFICATION,
    room,
    message,
  };
};
export const CLEAR_ROOM_NOTIFICATIONS = "rooms/clearRoomNotifications";

export const clearRoomNotifications = (room, message) => {
  return {
    type: CLEAR_ROOM_NOTIFICATIONS,
    room,
    message,
  };
};
export const SERVER_NOTIFICATION = "rooms/serverNotification";

export const serverNotification = (room, message) => {
  return {
    type: SERVER_NOTIFICATION,
    room,
    message,
  };
};
export const CLEAR_SERVER_NOTIFICATIONS = "rooms/clearServerNotifications";

export const clearServerNotifications = (room, message) => {
  return {
    type: CLEAR_SERVER_NOTIFICATIONS,
    room,
    message,
  };
};
const initialState = {};

const messagesReducer = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case SET_MESSAGES: {
      if (action.serverId) {
        newState.serverMessages = {};
        newState.serverMessages[action.serverId] = {};
        newState.serverMessages[action.serverId][action.channelId] = {};
        newState.serverMessages[action.serverId][action.channelId] =
          action.messages;
      } else {
        newState.dmRoomMessages = {};
        newState.dmRoomMessages[action.channelId] = {};
        console.log("right here action ->>>>>", action);
        newState.dmRoomMessages[action.channelId] = action.messages;
      }
      return newState;
    }

    case RECEIVE_MESSAGE: {
      if (action.serverId) {
        newState.serverMessages[action.serverId][action.channelId][
          action.message.id
        ] = action.message;
      } else {
        newState.dmRoomMessages[action.channelId][action.message.id] =
          action.message;
      }
      return newState;
    }
    case UPDATE_MESSAGE: {
      if (action.serverId) {
        newState.serverMessages[action.serverId][action.channelId][
          action.message.id
        ] = action.message;
      } else {
        newState.dmRoomMessages[action.channelId][action.message.id] =
          action.message;
      }
      return newState;
    }
    case DELETE_MESSAGE: {
      if (action.serverId) {
        delete newState.serverMessages[action.serverId][action.channelId][
          action.message.id
        ];
      } else {
        delete newState.dmRoomMessages[action.channelId][action.message.id];
      }
      return newState;
    }
    case SET_ROOMS: {
      newState = action.rooms;
      return newState;
    }

    case JOIN_ROOM: {
      newState[action.room.id] = action.room;
      return newState;
    }
    case LEAVE_ROOM: {
      delete newState[action.room.id];
      return newState;
    }

    case ROOM_NOTIFICATION: {
      if (newState[action.room.id].newMessages) {
        newState[action.room.id].newMessages += 1;
      } else {
        newState[action.room.id].newMessages = 1;
      }
      return newState;
    }
    case CLEAR_ROOM_NOTIFICATIONS: {
      delete newState[action.room.id].newMessages;
      return newState;
    }
    case SERVER_NOTIFICATION: {
      if (newState[action.server.id].newMessages) {
        newState[action.room.id].newMessages += 1;
      } else {
        newState[action.room.id].newMessages = 1;
      }
      return newState;
    }
    case CLEAR_SERVER_NOTIFICATIONS: {
      delete newState[action.server.id].newMessages;
      return newState;
    }

    default:
      return state;
  }
};

export default messagesReducer;
