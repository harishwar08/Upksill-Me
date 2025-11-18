const ChatMessage = ({ message, isOwn }) => {
  return (
    <div className={`flex ${isOwn ? 'justify-end' : 'justify-start'} mb-3`}>
      <div
        className={`max-w-xs px-4 py-2 rounded-lg ${
          isOwn
            ? 'bg-primary-600 text-white'
            : 'bg-gray-200 text-gray-800'
        }`}
      >
        <p>{message.message}</p>
        <p className="text-xs mt-1 opacity-75">
          {new Date(message.timestamp).toLocaleTimeString()}
        </p>
      </div>
    </div>
  );
};

export default ChatMessage;
