import { useLocation } from "react-router-dom";
import { socket } from "../socket";
import LiveChat from "../components/LiveChat";
import DrawingCanvas from "../components/DrawingCanvas";

const GamePage = () => {
  const location = useLocation();
  const { username, room } = location.state;

  return (
    <div className="h-screen bg-gray-100 flex flex-col">

      {/* Header */}
      <div className="w-full py-4 bg-white shadow flex justify-center">
        <h1 className="text-3xl font-bold">Doodles</h1>
      </div>

      {/* Main Area */}
      <div className="flex flex-1 justify-center items-center p-6 gap-6">

        <div className="bg-white shadow-lg rounded-xl p-4">
          <DrawingCanvas socket={socket} room={room} />
        </div>

        <LiveChat socket={socket} room={room} username={username} />

      </div>

    </div>
  );
};

export default GamePage;