const LiveChat = ({ messages, msg, setMsg, sendMessage }) => {
  return (
    <div className="bg-white border border-gray-300 rounded-lg shadow-md w-80 h-[500px] flex flex-col">

      {/* Header */}
      <div className="px-4 py-3 border-b font-bold">
        LIVE CHAT
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((message, index) => (
          <div key={index} className="text-sm">
            <span className="font-semibold">{message.username}:</span>{" "}
            {message.message}
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="flex gap-2 p-3 border-t">
        <input
          className="flex-1 border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          type="text"
          placeholder="Type a message..."
        />

        <button
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>

    </div>
  );
};

export default LiveChat;