import { useState, useEffect } from "react";
import { useLocation, Navigate } from "react-router-dom";
import { socket } from "../socket";
import LiveChat from "../components/LiveChat";
import DrawingCanvas from "../components/DrawingCanvas";
import PlayerBoard from "../components/PlayerBoard";
import WordChooser from "../components/WordChooser";
import Leaderboard from "../components/Leaderboard";
import Timer from "../components/Timer";
import { useSocket } from "../hooks/useSocket";
import { useGame } from "../context/GameContext";
import { GameState } from "../utils/constants";

const GamePage = () => {
  const location = useLocation();

  if (!location.state) {
    return <Navigate to="/" />;
  }

  const { username, room, avatar } = location.state;

  const [players, setPlayers] = useState([]);
  
  useSocket(room);
  const { gameState, wordLength } = useGame();

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
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fredoka+One&family=Nunito:wght@400;600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .gp-root {
          font-family: 'Nunito', sans-serif;
          background: #2b6cb0;
          height: 100vh;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }
        .gp-header {
          background: #1a4a7a;
          border-bottom: 3px solid #1a365d;
          padding: 8px 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-shrink: 0;
          height: 52px;
        }
        .gp-logo {
          font-family: 'Fredoka One', cursive;
          font-size: 1.6rem;
          color: #fff;
          letter-spacing: 1px;
        }
        .gp-round {
          font-family: 'Fredoka One', cursive;
          font-size: 1rem;
          color: #bee3f8;
        }
        .gp-word-area {
          font-family: 'Fredoka One', cursive;
          font-size: 1.4rem;
          letter-spacing: 6px;
          color: #fff;
        }
        .gp-room {
          font-size: 0.75rem;
          font-weight: 700;
          color: #bee3f8;
          background: #1a365d;
          padding: 4px 12px;
          border-radius: 999px;
          letter-spacing: 1px;
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .gp-start-btn {
          background: #48bb78; border: none; padding: 4px 12px;
          border-radius: 6px; color: white; cursor: pointer; font-weight: bold;
        }
        .gp-start-btn:hover { background: #38a169; }
        .gp-body {
          flex: 1;
          display: flex;
          overflow: hidden;
        }
        .gp-players {
          width: 200px;
          flex-shrink: 0;
          background: #1e4e8c;
          border-right: 3px solid #1a365d;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
        }
        .gp-center {
          flex: 1;
          display: flex;
          flex-direction: column;
          background: #2b6cb0;
          overflow: hidden;
          position: relative;
        }
        .gp-chat {
          width: 280px;
          flex-shrink: 0;
          background: #fff;
          border-left: 3px solid #1a365d;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }
      `}</style>
      
      <WordChooser />
      <Leaderboard />

      <div className="gp-root">
        <header className="gp-header">
          <span className="gp-logo">Doodles</span>
          
          <div className="gp-word-area">
             {gameState.state === GameState.DRAWING && wordLength > 0 && "_".repeat(wordLength)}
             {gameState.state === GameState.LOBBY && <span style={{fontSize: '1rem', letterSpacing: 'normal', color: '#a0aec0'}}>Waiting...</span>}
          </div>

          <span className="gp-room">
            {gameState.state !== GameState.LOBBY && gameState.state !== GameState.LEADERBOARD && (
              <span>Round {gameState.cycle} of 3</span>
            )}
            {gameState.state === GameState.LOBBY && (
              <button className="gp-start-btn" onClick={startGame}>Start Game</button>
            )}
            Room: {room}
          </span>
        </header>

        <div className="gp-body">
          <aside className="gp-players">
            <PlayerBoard players={players} currentId={socket.id} />
          </aside>
          
          <main className="gp-center">
            <DrawingCanvas socket={socket} room={room} />
            <Timer />
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