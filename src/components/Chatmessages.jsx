
import ChatMessage from "./ChatMessage"

const ChatMessages = () => {
    
    const messages = [
      {
        id: 1,
        name: 'Casey',
        message: "Hello Guys! What's your opinion?",
        time: '12:03 pm',
      },
      {
        id: 2,
        name: 'John',
        message: 'Images are better.',
        time: '12:05 pm',
      },
      {
        id: 3,
        name: 'You',
        message: 'Yes, It will decrease the loading 👍',
        time: '12:04 pm',
      },
      {
        id: 4,
        name: 'Jack',
        message: 'Anyone is up for illustrations. I think there are less relatable images according to our brand.',
        time: '12:05 pm',
      },
    ];
  
    return (
      <div className="h-full overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <ChatMessage key={message.id} {...message} />
        ))}
      </div>
    );
  };

  export default ChatMessages