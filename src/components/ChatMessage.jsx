
const ChatMessage = ({ name, message, time }) => {
    const isCurrentUser = name === "You";
  
    return (
      <div
        className={`flex space-x-3 ${isCurrentUser ? "flex-row-reverse" : ""}`}
      >
        <div className="w-8 h-8 rounded-full bg-gray-600 flex-shrink-0" />
        <div className={`flex-1 ${isCurrentUser ? "text-right" : ""}`}>
          <div className="flex justify-between items-center">
            <span className="text-white text-sm">{name}</span>
            <span className="text-gray-400 text-xs">{time}</span>
          </div>
          <p className="text-gray-300 text-sm mt-1">{message}</p>
        </div>
      </div>
    );
  };
  
  export default ChatMessage;
  