import { useState } from "react";
import { useGame } from "../context/GameContext";
import { GameState } from "../utils/constants";
import "./styles/DebugPanel.css";

const DebugPanel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { 
    setGameState, 
    setLeaderboard, 
    setRoundResult, 
    setActiveDrawer,
    setWordLength,
    setActiveWord,
    setEndTime,
    setPlayers,
    setWordOptions
  } = useGame();

  if (!import.meta.env.DEV) return null;

  const mockPlayers = [
    { id: "1", username: "DoodleMaster", score: 2500, avatar: null },
    { id: "2", username: "Guesser99", score: 1800, avatar: null },
    { id: "3", username: "Sketchy", score: 1200, avatar: null },
    { id: "4", username: "Beginner", score: 400, avatar: null }
  ];

  const triggerLeaderboard = () => {
    setPlayers(mockPlayers);
    setGameState({ state: GameState.LEADERBOARD, cycle: 3 });
    setRoundResult(null);
    setLeaderboard(mockPlayers.slice(0, 3));
  };

  const triggerRoundResult = () => {
    setPlayers(mockPlayers);
    setGameState({ state: GameState.DRAWING, cycle: 1 });
    setRoundResult({
      word: "APPLE",
      reason: "all_guessed",
      turnScores: {
        "1": 450,
        "2": 380,
        "3": 0
      }
    });
  };

  const setLobby = () => {
    setGameState({ state: GameState.LOBBY, cycle: 1 });
    setRoundResult(null);
    setLeaderboard([]);
    setActiveDrawer(null);
    setEndTime(null);
    setPlayers([]);
  };

  const setChoosingMe = () => {
    setPlayers(mockPlayers);
    setActiveDrawer("ME"); // Mock ID that doesn't usually match
    // To make it "Me", we'd need socket.id, but we can just set activeDrawer to socket.id!
    import("../socket").then(({ socket }) => {
       setActiveDrawer(socket.id);
       setWordOptions(["Banana", "Robot", "Castle"]);
       setGameState({ state: GameState.CHOOSING, cycle: 1 });
       setRoundResult(null);
    });
  };

  const setChoosingThem = () => {
    setPlayers(mockPlayers);
    setActiveDrawer("1"); // DoodleMaster
    setWordOptions([]);
    setGameState({ state: GameState.CHOOSING, cycle: 1 });
    setRoundResult(null);
  };

  return (
    <div className={`debug-root ${isOpen ? "open" : "closed"}`}>
      <button className="debug-toggle" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? "✖ Close Debug" : "🔧 Debug Menu"}
      </button>

      {isOpen && (
        <div className="debug-content">
          <h4>Dev Controls</h4>
          <div className="debug-grid">
            <button onClick={triggerLeaderboard}>🏁 Leaderboard</button>
            <button onClick={triggerRoundResult}>📝 Round End</button>
            <button onClick={setChoosingMe}>🤔 Choosing (Me)</button>
            <button onClick={setChoosingThem}>🤔 Choosing (Them)</button>
            <button onClick={setLobby}>🏠 Reset Lobby</button>
          </div>
          
          <div className="debug-info">
            <p>Current Env: <code>Development</code></p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DebugPanel;
