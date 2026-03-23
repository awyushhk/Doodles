import { useState, useEffect } from "react";
import { socket } from "./socket";

function App() {
  const [msg, setMsg] = useState("");
  const [room, setRoom] = useState("");
  const [username, setUsername] = useState("");
  const [messages, setMessages] = useState([]);
  
  // Function to send a message to the server
  const sendMessage = () => {
    socket.emit("message_from_client", {
      message: msg,
      room: room,
      username: username,
    });

    setMsg("");
  };

  // Function to join a specific room
  const joinRoom = () => {
    if (room !== "") {
      socket.emit("join_room", room);
    }
  };

  useEffect(() => {
    socket.on("message_from_server", (data) =>
      setMessages((prev) => [...prev, data]),
    );

    // CLEANUP FUNCTION
    return () => {
    // Remove the listener for "message_from_server"
    // This prevents duplicate listeners and memory leaks
    socket.off("message_from_server");
  };

  }, [socket]);

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Join a Chat</h1>

      {/* Username */}
      <div className="flex gap-3 mb-4">
        <input
          className="border border-gray-400 px-3 py-2 rounded"
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          placeholder="Name..."
        />
      </div>

      {/* Room Join */}
      <div className="flex gap-3 mb-4">
        <input
          className="border border-gray-400 px-3 py-2 rounded"
          onChange={(e) => setRoom(e.target.value)}
          type="text"
          placeholder="Room code..."
        />

        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={joinRoom}
        >
          Join Room
        </button>
      </div>

      {/* Send Message */}
      <div className="flex gap-3 mb-6">
        <input
          className="border border-gray-400 px-3 py-2 rounded"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          type="text"
          placeholder="Message..."
        />

        <button
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>

      {/* Message Display */}
      <div className="bg-white border border-gray-300 px-6 py-3 rounded shadow-sm w-80">
        <p className="font-bold">LIVE CHAT</p>
        <hr />
        <ul>
          {messages.map((message, index) => (
            <li key={index}>
              <strong>{message.username}:</strong> {message.message}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
