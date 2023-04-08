export const SET_ACTIVE_USERS = "users/setActiveUsers";

export const setActiveUsers = (users) => {
  return {
    type: SET_ACTIVE_USERS,
    users,
  };
};

export const ACTIVATE_USER = "users/activateUser";

export const activateUser = (user) => {
  return { type: ACTIVATE_USER, user };
};

export const SET_USER_IDLE = "users/setUserIdle";

export const setUserIdle = (user) => {
  return {
    type: SET_USER_IDLE,
    user,
  };
};

export const DEACTIVATE_USER = "users/deactivate";

export const deactivateUser = (user) => {
  return { type: DEACTIVATE_USER, user };
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
      newState[action.user.id] = action.user;
      return newState;
    }
    case DEACTIVATE_USER: {
      delete newState[action.user.id];
      return newState;
    }

    default:
      return state;
  }
};

export default usersReducer;
