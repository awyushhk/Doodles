import { useState, useEffect } from "react";
import LiveChat from "../components/LiveChat";
import { useLocation } from "react-router-dom";
import { socket } from "../socket";
import DrawingCanvas from "../components/DrawingCanvas";

const GamePage = () => {
  const [msg, setMsg] = useState("");
  const [messages, setMessages] = useState([]);

  // Get data passed from JoinPage
  const location = useLocation();
  const { username, room } = location.state;

  // Function to send a message to the server
  const sendMessage = () => {
    if (msg != "" && username != "") {
      socket.emit("message_from_client", {
        message: msg,
        room: room,
        username: username,
      });
    }
    setMsg("");
  };

  useEffect(() => {
    socket.on("message_from_server", (data) =>
      setMessages((prev) => [...prev, data]),
    );

    // CLEANUP FUNCTION
    return () => {
      socket.off("message_from_server");
    };
  }, []);

  useEffect(() => {
  if (!socket) return;

  socket.on("draw_from_server", (data) => {
    const { x, y } = data;

    contextRef.current.lineTo(x, y);
    contextRef.current.stroke();
  });

  return () => {
    socket.off("draw_from_server");
  };
}, [socket]);

  return (
  <div className="h-screen bg-gray-100 flex flex-col">
    
    {/* Header */}
    <div className="w-full py-4 bg-white shadow flex justify-center">
      <h1 className="text-3xl font-bold">Doodles</h1>
    </div>

    {/* Main Area */}
    <div className="flex flex-1 justify-center items-center p-6 gap-6">

      {/* Drawing Area */}
      <div className="bg-white shadow-lg rounded-xl p-4">
        <DrawingCanvas socket={socket} room={room} />
      </div>

      {/* Chat Area */}
      <div>
        <LiveChat
          messages={messages}
          msg={msg}
          setMsg={setMsg}
          sendMessage={sendMessage}
        />
      </div>

    </div>

  </div>
);
};

export default GamePage;
