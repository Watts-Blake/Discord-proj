import { createContext } from "react";
import { useState } from "react";
export const DmRoomViewContext = createContext();

export const DmRoomViewProvider = (props) => {
  const [dmRoomsView, setDmRoomsView] = useState(false);

  return (
    <DmRoomViewContext.Provider value={{ dmRoomsView, setDmRoomsView }}>
      {props.children}
    </DmRoomViewContext.Provider>
  );
};
