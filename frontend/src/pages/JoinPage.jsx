import { useState, useEffect } from "react";
import { socket } from "../socket";
import { useNavigate } from "react-router-dom";

const JoinPage = () => {
  const [room, setRoom] = useState("");
  const [username, setUsername] = useState("");

  const navigate = useNavigate();

  // Function to join a specific room
  const joinRoom = () => {
    if (room !== "") {
      socket.emit("join_room", room);
      navigate("/game", { state: { username, room } });
    }
  };

  return (
  <div className="h-screen flex items-center justify-center bg-gray-100">
    
    <div className="bg-white shadow-lg rounded-xl p-8 w-96 flex flex-col gap-6">
      
      {/* Title */}
      <h1 className="text-3xl font-bold text-center">Doodles</h1>

      {/* Username */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-600">
          Username
        </label>
        <input
          className="border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          placeholder="Enter your name"
        />
      </div>

      {/* Room */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-600">
          Room Code
        </label>

        <div className="flex gap-3">
          <input
            className="flex-1 border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={(e) => setRoom(e.target.value)}
            type="text"
            placeholder="Enter room code"
          />

          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            onClick={joinRoom}
          >
            Join
          </button>
        </div>
      </div>

    </div>

  </div>
);
};

export default JoinPage;
