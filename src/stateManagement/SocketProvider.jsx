
import { createContext, useContext, useMemo } from "react";
import { io } from "socket.io-client";
import { URL } from "../../utilities.js";

const SocketContext = createContext(null);

export const useSocket = () => {
  const socket = useContext(SocketContext);
  return socket;
};

const SocketProvider = ({ children }) => {
  const socket = useMemo(() => io(URL), []);
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export default SocketProvider;
