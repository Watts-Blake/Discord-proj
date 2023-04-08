export const SET_ACTIVE_USERS = "users/setActiveUsers";

export const setActiveUsers = (users) => {
  return {
    type: SET_ACTIVE_USERS,
    users,
  };
};

export const ACTIVATE_USER = "/users/activateUser";

export const activateUser = (user) => {
  return { type: ACTIVATE_USER, user };
};

export const SET_USER_IDLE = "/users/setUserIdle";

export const setUserIdle = (userId) => {
  return {
    type: SET_USER_IDLE,
    userId,
  };
};

export const DEACTIVATE_USER = "/users/deactivate";

export const deactivateUser = (userId) => {
  return { type: DEACTIVATE_USER, userId };
};

const initialState = {};

const usersReducer = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case SET_ACTIVE_USERS: {
      newState = action.users;
      return newState;
    }
    case ACTIVATE_USER: {
      newState[action.user.id] = action.user;
      return newState;
    }
    case SET_USER_IDLE: {
      newState[action.user] = action.user;
      return newState;
    }
    case DEACTIVATE_USER: {
      delete newState[action.userId];
      return newState;
    }

    default:
      return state;
  }
};

export default usersReducer;
