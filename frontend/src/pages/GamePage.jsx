import { useState, useEffect } from "react";
import { useLocation, Navigate } from "react-router-dom";
import { socket } from "../socket";
import LiveChat from "../components/LiveChat";
import DrawingCanvas from "../components/DrawingCanvas";
import PlayerBoard from "../components/PlayerBoard";
import WordChooser from "../components/WordChooser";
import Leaderboard from "../components/Leaderboard";
import Timer from "../components/Timer";
import GameHeader from "../components/GameHeader";
import { useSocket } from "../hooks/useSocket";
import { useGame } from "../context/GameContext";
import "../components/styles/GamePage.css";

const GamePage = () => {
  const location = useLocation();

  if (!location.state) {
    return <Navigate to="/" />;
  }

  const { username, room, avatar } = location.state;
  const [players, setPlayers] = useState([]);
  
  // Attach socket listeners to update GameContext
  useSocket(room);
  
  const { gameState, wordLength, activeDrawer } = useGame();

  const drawerPlayer = players.find(p => p.id === activeDrawer);
  const drawerName = drawerPlayer ? (drawerPlayer.id === socket.id ? "You" : drawerPlayer.username) : "Someone";

  useEffect(() => {
    socket.emit("player_joined", { room, username, avatar });

    socket.on("update_players", (playerList) => {
      setPlayers(playerList);
    });

    return () => socket.off("update_players");
  }, [room, username, avatar]);

  const startGame = () => {
    socket.emit("start_game");
  };

  return (
    <>
      <WordChooser />
      <Leaderboard />

      <div className="gp-root">
        <GameHeader 
          gameState={gameState}
          wordLength={wordLength}
          drawerName={drawerName}
          room={room}
          startGame={startGame}
        />

        <div className="gp-body">
          <aside className="gp-players">
            <PlayerBoard players={players} currentId={socket.id} />
          </aside>
          
          <main className="gp-center">
            {/* The Timer usually shows on top of the canvas, float it */}
            <Timer />
            <DrawingCanvas socket={socket} room={room} />
          </main>
          
          <aside className="gp-chat">
            <LiveChat socket={socket} room={room} username={username} />
          </aside>
        </div>
      </div>
    </>
  );
};

export default GamePage;