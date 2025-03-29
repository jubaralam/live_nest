import { useCallback, useEffect, useState } from "react";
import { useSocket } from "../stateManagement/SocketProvider";
import { useNavigate } from "react-router-dom";

const LobbyScreen = () => {
  const socket = useSocket();

  const [email, setEmail] = useState("");
  const [room, setRoom] = useState("");
  const navigate = useNavigate();

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      socket.emit("room:join", { email, room });
    },
    [email, room, socket]
  );

  const handleJoinRoom = useCallback(
    (data) => {
      const { email, room } = data;
      console.log(email, room, "from handleJoin");
      navigate(`/room/${room}`);
    },
    [navigate]
  );

  useEffect(() => {
    socket.on("room:join", handleJoinRoom);
    return () => {
      socket.off("room:join", handleJoinRoom);
    };
  }, [socket, handleJoinRoom]);
  return (
    <div>
      LobbyScreen
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email Id</label>
        <input
          type="email"
          placeholder="example@gmail.com"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <label htmlFor="room">Room Id</label>
        <input
          type="text"
          placeholder="room id"
          id="room"
          value={room}
          onChange={(e) => setRoom(e.target.value)}
        />
        <br />
        <button>Join</button>
      </form>
    </div>
  );
};

export default LobbyScreen;
