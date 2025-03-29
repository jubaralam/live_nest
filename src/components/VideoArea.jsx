import { useRef, useState } from 'react';
import { Camera, Video, Mic, Settings } from 'lucide-react';
import VideoControls from "./VideoControls"
import ParticipantThumbnails from "./ParticipantThumbnails"
const VideoArea = () => {
    
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const videoRef = useRef();

  const controls = [
    { icon: Camera, action: () => setIsVideoOff(!isVideoOff) },
    { icon: Video, action: () => {} },
    { icon: Mic, action: () => setIsMuted(!isMuted), isRed: true },
    { icon: Settings, action: () => {} },
  ];

  return (
    <div className="flex-1 relative">
      <div className="absolute inset-0 flex items-center justify-center">
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          className="w-full h-full object-cover"
        />
      </div>
      
      <VideoControls controls={controls} />
      <ParticipantThumbnails />
    </div>
  );
};

export default VideoArea