import { csrfFetch } from "./csrf";

//---------------------------------------------------------------------dmRooms
const SET_USER_DM_ROOMS = "dms/setsUserDmRooms";
// remmeber to dispatch setCurrentDmRoom
export const setUserDms = (dmRooms) => {
  return { type: SET_USER_DM_ROOMS, dmRooms };
};

const ADD_DM_TO_DM_ROOMS = "dms/AddDmRoom";

export const addDmRoom = (dmRoom) => {
  return { type: ADD_DM_TO_DM_ROOMS, dmRoom };
};
const UPDATE_DM_ROOM_ON_DMROOMS = "dms/UpdateDmRoomOnDmRooms";

export const updateDmRoom = (dmRoom) => {
  return { type: UPDATE_DM_ROOM_ON_DMROOMS, dmRoom };
};
const REMOVE_DM_ROOM_FROM_DM_ROOMS = "dms/RemoveDmRoomFromDmRooms";

export const removeDmRoom = (dmRoom) => {
  return { type: REMOVE_DM_ROOM_FROM_DM_ROOMS, dmRoom };
};
//----------------------------------------------------------------------current dmRoom
// remember to dispatch setMessages
const SET_CURRENT_DM_ROOM = "currentDmRoom/SetCurrentDmRoom";
export const setCurrentDmRoom = (dmRoom) => {
  return { type: SET_CURRENT_DM_ROOM, dmRoom };
};

const ADD_DM_ROOM_MESSAGE = "currentDmRoom/AddMessage";
export const addChannelMessage = (message) => {
  return { type: ADD_DM_ROOM_MESSAGE, message };
};
const UPDATE_DM_ROOM_MESSAGE = "currentDmRoom/UpdateMessage";
export const updateDmRoomMessage = (message) => {
  return { type: UPDATE_DM_ROOM_MESSAGE, message };
};
const REMOVE_DM_ROOM_MESSAGE = "currentDmRoom/RemoveMessage";

export const removeChanelMessage = (messageId) => {
  return { type: REMOVE_DM_ROOM_MESSAGE, messageId };
};
//--------------------------------------reducer
const dmRoomReducer = (
  state = {
    dmRooms: {},
    currentdmRoom: { messages: {}, members: {} },
  },
  action
) => {
  let newState = { ...state };
  switch (action.type) {
    case SET_USER_DM_ROOMS: {
    }

    case ADD_DM_TO_DM_ROOMS: {
    }

    case UPDATE_DM_ROOM_ON_DMROOMS: {
    }

    case REMOVE_DM_ROOM_FROM_DM_ROOMS: {
    }

    case SET_CURRENT_DM_ROOM: {
    }

    case ADD_DM_ROOM_MESSAGE: {
    }

    case UPDATE_DM_ROOM_MESSAGE: {
    }

    case REMOVE_DM_ROOM_MESSAGE: {
    }

    default:
      return state;
  }
};

export default dmRoomReducer;
