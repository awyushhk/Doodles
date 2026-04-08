import { GameState } from "../utils/constants";
import "./styles/GameHeader.css";

const GameHeader = ({ gameState, wordLength, drawerName, room, startGame }) => {
  return (
    <header className="gp-header">
      <span className="gp-logo">Doodles</span>
      
      <div className="gp-word">
           {gameState.state === GameState.DRAWING && wordLength > 0 && (
              <span className="gp-word-text">{"_".repeat(wordLength)}</span>
           )}
           {gameState.state === GameState.LOBBY && (
              <span style={{ color: '#a0aec0', fontStyle: 'italic', fontSize: '0.9rem' }}>Waiting to start...</span>
           )}
           {gameState.state === GameState.CHOOSING && (
              <span style={{ color: '#fed7aa', fontFamily: "'Fredoka One', cursive", fontSize: '1rem' }}>
                {drawerName} is choosing a word...
              </span>
           )}
      </div>
      
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {gameState.state === GameState.LOBBY && (
          <button className="start-btn" onClick={startGame}>Start Game</button>
        )}
        {gameState.state !== GameState.LOBBY && gameState.state !== GameState.LEADERBOARD && (
          <span className="gp-round">Cycle {gameState.cycle} of 3</span>
        )}
        <span className="gp-room">Room: {room}</span>
      </div>
    </header>
  );
};

export default GameHeader;
