/* eslint-disable no-unused-vars */
import React, { useState, useRef } from 'react';
import { Video, Mic, Settings, MessageSquare, Users, Home, Bell, CreditCard, Camera } from 'lucide-react';

const VideoChat = () => {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [isRecording, setIsRecording] = useState(true);
  const [activeTab, setActiveTab] = useState('chat');
  
  const participants = [
    { id: 1, name: 'Casey', message: "Hello Guys! What's your opinion?", time: '12:03 pm' },
    { id: 2, name: 'John', message: 'Images are better.', time: '12:05 pm' },
    { id: 3, name: 'You', message: 'Yes, It will decrease the loading 👍', time: '12:04 pm' },
    { id: 4, name: 'Jack', message: 'Anyone is up for illustrations. I think there are less relatable images according to our brand.', time: '12:05 pm' },
    { id: 5, name: 'Jessi', message: 'I just checked with our design manager. His vote is also for images. He is busy in meeting.', time: '12:08 pm' }
  ];

  return (
    <div className="flex min-h-screen bg-gray-900">
      {/* Sidebar - Desktop only */}
      <div className="hidden md:flex flex-col items-center w-16 bg-gray-800 py-4 space-y-6">
        <div className="text-gray-400">
          <Home className="w-6 h-6" />
        </div>
        <div className="text-gray-400">
          <Bell className="w-6 h-6" />
        </div>
        <div className="text-gray-400">
          <Users className="w-6 h-6" />
        </div>
        <div className="text-gray-400">
          <CreditCard className="w-6 h-6" />
        </div>
        <div className="text-white bg-blue-600 p-2 rounded">
          <Camera className="w-6 h-6" />
        </div>
        <div className="text-gray-400">
          <Home className="w-6 h-6" />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {/* Header */}
        <div className="bg-gray-800 p-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <button className="text-gray-400">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h1 className="text-white text-lg">Design Critique - Nickelfox Website</h1>
            {isRecording && (
              <div className="flex items-center space-x-1 bg-gray-700 px-2 py-1 rounded">
                <div className="w-2 h-2 bg-red-500 rounded-full" />
                <span className="text-xs text-gray-300">REC</span>
                <span className="text-xs text-gray-300">00:12:36</span>
              </div>
            )}
          </div>
          <button className="text-gray-400 hover:text-white">
            <Users className="w-6 h-6" />
          </button>
        </div>

        {/* Main content area */}
        <div className="flex h-[calc(100vh-4rem)]">
          {/* Video area */}
          <div className="flex-1 relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <img src="/api/placeholder/800/600" alt="Video placeholder" className="w-full h-full object-cover" />
            </div>
            
            {/* Video controls */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-4">
              <button className="p-3 rounded-full bg-gray-800 text-white">
                <Camera className="w-6 h-6" />
              </button>
              <button className="p-3 rounded-full bg-gray-800 text-white">
                <Video className="w-6 h-6" />
              </button>
              <button className="p-3 rounded-full bg-red-500 text-white">
                <Mic className="w-6 h-6" />
              </button>
              <button className="p-3 rounded-full bg-gray-800 text-white">
                <Settings className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Chat sidebar */}
          <div className="w-80 bg-gray-800">
            <div className="p-4 border-b border-gray-700">
              <div className="flex space-x-4">
                <button 
                  className={`text-sm ${activeTab === 'chat' ? 'text-white' : 'text-gray-400'}`}
                  onClick={() => setActiveTab('chat')}
                >
                  Chat
                </button>
                <button 
                  className={`text-sm ${activeTab === 'file' ? 'text-white' : 'text-gray-400'}`}
                  onClick={() => setActiveTab('file')}
                >
                  File
                </button>
                <button 
                  className={`text-sm ${activeTab === 'poll' ? 'text-white' : 'text-gray-400'}`}
                  onClick={() => setActiveTab('poll')}
                >
                  Poll
                </button>
              </div>
            </div>

            <div className="h-full overflow-y-auto p-4 space-y-4">
              {participants.map((participant) => (
                <div key={participant.id} className="flex space-x-3">
                  <div className="w-8 h-8 rounded-full bg-gray-600 flex-shrink-0" />
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <span className="text-white text-sm">{participant.name}</span>
                      <span className="text-gray-400 text-xs">{participant.time}</span>
                    </div>
                    <p className="text-gray-300 text-sm mt-1">{participant.message}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoChat;