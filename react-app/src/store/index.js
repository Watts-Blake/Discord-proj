import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import session from "./session";
import serversReducer from "./servers";
import channelsReducer from "./channels";
import messagesReducer from "./messages";
import usersReducer from "./users";

const rootReducer = combineReducers({
  session,
  servers: serversReducer,
  channels: channelsReducer,
  messages: messagesReducer,
  users: usersReducer,
});

let enhancer;

if (process.env.NODE_ENV === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require("redux-logger").default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
