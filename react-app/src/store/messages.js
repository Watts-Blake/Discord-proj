export const SET_MESSAGES = "messages/setMessages";

export const setMessages = (messages) => {
  return { type: SET_MESSAGES, messages };
};

export const SEND_MESSAGE = "messages/send";

export const sendMessage = (message) => {
  return { type: SEND_MESSAGE, message };
};

export const UPDATE_MESSAGE = "currentChannel/messages/update";

export const updateMessage = (message) => {
  return { type: UPDATE_MESSAGE, message };
};

export const DELETE_MESSAGE = "currentChannel/messages/delete";

export const deleteMessage = (messageId) => {
  return { type: DELETE_MESSAGE, messageId };
};

const initialState = {};

const messagesReducer = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case SET_MESSAGES: {
      newState = action.messages;
      return newState;
    }

    case SEND_MESSAGE: {
      newState[action.message.id] = action.message;
      return newState;
    }
    case UPDATE_MESSAGE: {
      newState[action.message.id].content = action.message.content;
      newState[action.message.id].updatedAt = action.message.updatedAt;
      return newState;
    }
    case DELETE_MESSAGE: {
      delete newState[action.messageId];
      return newState;
    }

    default:
      return state;
  }
};

export default messagesReducer;
