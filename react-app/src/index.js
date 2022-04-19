import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App";
import configureStore from "./store";
import { ModalProvider } from "./context/Modal";
import { DmRoomViewProvider } from "./context/DmRoomViewContext";
const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <DmRoomViewProvider>
        <ModalProvider>
          <App />
        </ModalProvider>
      </DmRoomViewProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
