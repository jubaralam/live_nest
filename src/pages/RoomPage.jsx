import { useCallback, useEffect, useState } from "react";
import { useSocket } from "../stateManagement/SocketProvider";
import ReactPlayer from "react-player";
import peer from "../service/peer";

const RoomPage = () => {
  const [remoteSocketId, setRemoteSocketId] = useState(null);
  const socket = useSocket();

  const [myStream, setMyStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);

  const handleSendStreams = useCallback(() => {
    for (const track of myStream.getTracks()) {
      peer.peer.addTrack(track, myStream);
    }
  }, [myStream]);
  const handleUserJoinded = useCallback(({ email, id }) => {
    console.log(email, id);
    setRemoteSocketId(id);
  }, []);

  const handleCallUser = useCallback(async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    setMyStream(stream);
    const offer = await peer.getOffer();
    socket.emit("user:call", { to: remoteSocketId, offer });
  }, [remoteSocketId, socket]);

  const handleIncommingCall = useCallback(
    async ({ from, offer }) => {
      setRemoteSocketId(from);
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      setMyStream(stream);
      const ans = await peer.getAnswer(offer);
      socket.emit("call:accepted", { to: from, ans });
      console.log("incomming call", from, "offer ->", offer);
    },
    [socket]
  );

  const handleCallAccepted = useCallback((from, ans) => {
    peer.setLocalDescription(ans);
    // handleSendStreams();
    console.log("call accepted!", "from", from, "ans", ans);
  }, []);
  const handleNegoNeeded = useCallback(async () => {
    const offer = await peer.getOffer();
    socket.emit("peer:nego:needed", { offer, to: remoteSocketId });
  }, [remoteSocketId, socket]);

  const handleNegoNeededIncomming = useCallback(
    async ({ from, offer }) => {
      const ans = await peer.getAnswer(offer);
      socket.emit("peer:nego:done", { to: from, ans });
    },
    [socket]
  );

  const handleNegoNeedFinal = useCallback(async ({ ans }) => {
    await peer.setLocalDescription(ans);
  }, []);
  useEffect(() => {
    peer.peer.addEventListener("negotiationneeded", handleNegoNeeded);
    return () => {
      peer.peer.removeEventListener("negotiationneeded", handleNegoNeeded);
    };
  }, [handleNegoNeeded]);

  useEffect(() => {
    peer.peer.addEventListener("track", async (e) => {
      const remoteStream = e.streams;
      console.log("got tracks", remoteStream[0]);
      setRemoteStream(remoteStream[0]);
    });
  }, []);

  useEffect(() => {
    socket.on("user:joined", handleUserJoinded);
    socket.on("incomming:call", handleIncommingCall);
    socket.on("call:accepted", handleCallAccepted);
    socket.on("peer:nego:needed", handleNegoNeededIncomming);
    socket.on("peer:nego:final", handleNegoNeedFinal);
    return () => {
      socket.off("user:joined", handleUserJoinded);
      socket.off("incomming:call", handleIncommingCall);
      socket.off("call:accepted", handleCallAccepted);
      socket.off("peer:nego:needed", handleNegoNeededIncomming);
      socket.off("peer:nego:final", handleNegoNeedFinal);
    };
  }, [
    socket,
    handleUserJoinded,
    handleIncommingCall,
    handleCallAccepted,
    handleNegoNeeded,
    handleNegoNeededIncomming,
    handleNegoNeedFinal,
  ]);

  return (
    <div>
      <h1>Room Page </h1>
      <h4>{remoteSocketId ? "Connected" : "No one in the room"}</h4>
      {myStream && <button onClick={handleSendStreams}>Send Stream</button>}
      {remoteSocketId && <button onClick={handleCallUser}>Call</button>}

      <div>
        <h1>My Video</h1>
        {myStream && (
          <ReactPlayer
            playing
            muted
            height="400px"
            width="600px"
            url={myStream}
          />
        )}
      </div>
      <div>
        <h1>Remote Stream</h1>
        {remoteStream && (
          <ReactPlayer
            playing
            muted
            height="100px"
            width="150px"
            url={remoteStream}
          />
        )}
      </div>
    </div>
  );
};

export default RoomPage;
