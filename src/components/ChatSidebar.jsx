import  { useState } from 'react';
import ChatTabs from "./ChatTabs"
import ChatMessages from "./ChatMessages"
const ChatSidebar = () => {
    
  const [activeTab, setActiveTab] = useState('chat');

  const tabs = [
    { id: 'chat', label: 'Chat' },
    { id: 'file', label: 'File' },
    { id: 'poll', label: 'Poll' },
  ];

  return (
    <div className="w-80 bg-gray-800">
      <ChatTabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
      <ChatMessages />
    </div>
  );
};

export default ChatSidebar