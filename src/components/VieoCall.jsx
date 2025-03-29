import { useState, useRef, useEffect } from "react";
import Peer from "simple-peer";

function VideoCall() {
  const [stream, setStream] = useState(null);
  const [peer, setPeer] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState("disconnected");
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(false);
  const [roomId, setRoomId] = useState("");
  const [peerLink, setPeerLink] = useState("");
  const myVideo = useRef();
  const peerVideo = useRef();

  // useEffect(() => {
  //   const urlParams = new URLSearchParams(window.location.search);
  //   const roomFromUrl = urlParams.get("room");
  //   if (roomFromUrl) {
  //     setRoomId(roomFromUrl);
  //     startCall(true);
  //   } else {
  //     setRoomId(Math.random().toString(36).substring(7));
  //   }
  // }, []);
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const roomFromUrl = urlParams.get("room");
    if (roomFromUrl) {
      setRoomId(roomFromUrl);
      startCall(true);
    } else {
      setRoomId(Math.random().toString(36).substring(7));
    }
  }, []);

  const startCall = async (isPeer = false) => {
    try {
      const currentStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      setStream(currentStream);
      myVideo.current.srcObject = currentStream;

      if (isPeer) {
        joinAsPeer();
      } else {
        createPeer();
      }
    } catch (err) {
      console.error("Error accessing media devices:", err);
    }
  };

  //   const createPeer = () => {
  //     try {
  //       const newPeer = new Peer({
  //         initiator: true,
  //         trickle: false,
  //         stream,
  //       });

  //       newPeer.on("signal", (data) => {
  //         localStorage.setItem(`signal-${roomId}`, JSON.stringify(data));
  //         setConnectionStatus("waiting for peer");
  //       });

  //       setupPeerEvents(newPeer);
  //       setPeer(newPeer);
  //     } catch (err) {
  //       console.error("Error creating peer:", err);
  //       setConnectionStatus("error");
  //     }
  //   };

  //   const joinAsPeer = () => {
  //     try {
  //       const newPeer = new Peer({
  //         initiator: false,
  //         trickle: false,
  //         stream,
  //       });

  //       newPeer.on("signal", (data) => {
  //         const hostSignal = JSON.parse(localStorage.getItem(`signal-${roomId}`));
  //         if (hostSignal) {
  //           newPeer.signal(hostSignal);
  //         }
  //       });

  //       setupPeerEvents(newPeer);
  //       setPeer(newPeer);
  //     } catch (err) {
  //       console.error("Error joining as peer:", err);
  //       setConnectionStatus("error");
  //     }
  //   };

  const joinViaLink = (e) => {
    e.preventDefault();
    try {
      const url = new URL(peerLink);
      const roomFromLink = url.searchParams.get("room");
      if (roomFromLink) {
        setRoomId(roomFromLink);
        startCall(true);
      }
    } catch (err) {
      console.error("Invalid peer link:", err);
      setConnectionStatus("error");
    }
  };

  const setupPeerEvents = (newPeer) => {
    newPeer.on("connect", () => {
      setConnectionStatus("connected");
    });

    newPeer.on("stream", (remoteStream) => {
      peerVideo.current.srcObject = remoteStream;
    });

    newPeer.on("error", (err) => {
      console.error("Peer error:", err);
      setConnectionStatus("error");
    });

    newPeer.on("close", () => {
      setConnectionStatus("disconnected");
    });
  };

  const toggleAudio = () => {
    if (stream) {
      stream.getAudioTracks().forEach((track) => {
        track.enabled = !track.enabled;
      });
      setIsAudioMuted(!isAudioMuted);
    }
  };

  const toggleVideo = () => {
    if (stream) {
      stream.getVideoTracks().forEach((track) => {
        track.enabled = !track.enabled;
      });
      setIsVideoMuted(!isVideoMuted);
    }
  };

  const createPeer = () => {
    const newPeer = new Peer({
      initiator: true,
      trickle: false,
      stream,
    });

    // Store Host Signal
    newPeer.on("signal", (data) => {
      localStorage.setItem(`hostSignal-${roomId}`, JSON.stringify(data));
      setConnectionStatus("waiting for peer");
    });

    // Wait for Peer Signal
    const checkPeerSignal = setInterval(() => {
      const peerSignal = localStorage.getItem(`peerSignal-${roomId}`);
      if (peerSignal) {
        newPeer.signal(JSON.parse(peerSignal));
        clearInterval(checkPeerSignal);
      }
    }, 1000);

    setupPeerEvents(newPeer);
    setPeer(newPeer);
  };

  const joinAsPeer = () => {
    const newPeer = new Peer({
      initiator: false,
      trickle: false,
      stream,
    });

    // Send Peer Signal
    newPeer.on("signal", (data) => {
      localStorage.setItem(`peerSignal-${roomId}`, JSON.stringify(data));
    });

    // Use Host Signal
    const hostSignal = localStorage.getItem(`hostSignal-${roomId}`);
    if (hostSignal) {
      newPeer.signal(JSON.parse(hostSignal));
    }

    setupPeerEvents(newPeer);
    setPeer(newPeer);
  };

  const getJoinLink = () =>
    `${window.location.origin}${window.location.pathname}?room=${roomId}`;

  const copyJoinLink = () => {
    navigator.clipboard.writeText(getJoinLink());
  };

  const handleJoin = () => {
    if (peerLink) window.location.href = peerLink;
  };

  const endCall = () => {
    if (peer) {
      peer.destroy();
    }
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
    setPeer(null);
    setConnectionStatus("disconnected");
    localStorage.removeItem(`signal-${roomId}`);
    setPeerLink("");
  };

  return (
    <div className="p-4">
      <div>
        <form onSubmit={joinViaLink}>
          <input
            type="text"
            value={peerLink}
            onChange={(e) => setPeerLink(e.target.value)}
            placeholder="Paste peer's link"
          />
          <button type="submit">Join Call</button>
        </form>
        <button onClick={copyJoinLink}>Copy Link</button>
        <div>Status: {connectionStatus}</div>
        <video ref={myVideo} autoPlay muted playsInline />
        <video ref={peerVideo} autoPlay playsInline />
      </div>
      <div className="mb-4 space-x-2">
        {!stream && (
          <div className="space-y-4">
            <button
              onClick={() => startCall(false)}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Start New Call
            </button>

            <form onSubmit={joinViaLink} className="flex space-x-2">
              <input
                type="text"
                value={peerLink}
                onChange={(e) => setPeerLink(e.target.value)}
                placeholder="Paste peer's link here to join their call"
                className="flex-1 p-2 border rounded"
              />
              <button
                type="submit"
                disabled={!peerLink}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-gray-400"
              >
                Join Call
              </button>
              {/* <button onClick={handleJoin} disabled={!peerLink}>
                Join Call
              </button> */}
            </form>
          </div>
        )}

        {stream && (
          <div className="space-x-2">
            <button
              onClick={toggleAudio}
              className={`px-4 py-2 rounded ${
                isAudioMuted ? "bg-red-500" : "bg-green-500"
              } text-white`}
            >
              {isAudioMuted ? "Unmute Audio" : "Mute Audio"}
            </button>
            <button
              onClick={toggleVideo}
              className={`px-4 py-2 rounded ${
                isVideoMuted ? "bg-red-500" : "bg-green-500"
              } text-white`}
            >
              {isVideoMuted ? "Enable Video" : "Disable Video"}
            </button>
            <button
              onClick={endCall}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              End Call
            </button>
          </div>
        )}
      </div>

      {stream && !window.location.search.includes("room") && (
        <div className="mb-4 p-4 bg-gray-100 rounded">
          <h3 className="mb-2 font-medium">Share this link with peer</h3>
          <div className="flex space-x-2">
            {/* <input
              value={getJoinLink()}
              readOnly
              className="w-full p-2 bg-white border rounded"
            /> */}
            <input value={getJoinLink()} readOnly />
            <button
              onClick={copyJoinLink}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Copy Link
            </button>
          </div>
        </div>
      )}

      <div className="mb-2 text-sm text-gray-600">
        Status: {connectionStatus}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <h3 className="mb-2 text-lg">Your Video</h3>
          <video
            ref={myVideo}
            autoPlay
            muted
            playsInline
            className="w-full bg-black rounded"
          />
        </div>
        <div>
          <h3 className="mb-2 text-lg">Peer Video</h3>
          <video
            ref={peerVideo}
            autoPlay
            playsInline
            className="w-full bg-black rounded"
          />
        </div>
      </div>
    </div>
  );
}

export default VideoCall;
