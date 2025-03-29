
const ChatTabs = ({ tabs, activeTab, setActiveTab }) => {
    return (
      <div className="p-4 border-b border-gray-700">
        <div className="flex space-x-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`text-sm ${
                activeTab === tab.id ? 'text-white' : 'text-gray-400'
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    );
  };

  export default ChatTabs