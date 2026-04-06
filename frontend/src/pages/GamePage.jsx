import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { socket } from "../socket";
import LiveChat from "../components/LiveChat";
import DrawingCanvas from "../components/DrawingCanvas";
import PlayerBoard from "../components/PlayerBoard";

const GamePage = () => {
  const location = useLocation();
  const { username, room, avatar } = location.state;

  const [players, setPlayers] = useState([]);

  useEffect(() => {
    socket.emit("player_joined", { room, username, avatar });

    socket.on("update_players", (playerList) => {
      setPlayers(playerList);
    });

    return () => socket.off("update_players");
  }, [room, username, avatar]);

  return (
    <div className="h-screen bg-gray-100 flex flex-col">

      <div className="w-full py-4 bg-white shadow flex justify-center">
        <h1 className="text-3xl font-bold">Doodles</h1>
      </div>

      <div className="flex flex-1 justify-center items-center p-6 gap-6">

        <PlayerBoard
          players={players}
          currentId={socket.id}
        />

        <div className="bg-white shadow-lg rounded-xl p-4">
          <DrawingCanvas socket={socket} room={room} />
        </div>

        <LiveChat socket={socket} room={room} username={username} />

      </div>

    </div>
  );
};

export default GamePage;