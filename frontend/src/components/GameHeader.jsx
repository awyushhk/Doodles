import { GameState } from "../utils/constants";
import { useGame } from "../context/GameContext";
import logo from "../assets/Doodles logo.png";
import "./styles/GameHeader.css";

const GameHeader = ({ gameState, wordLength, drawerName, room, startGame }) => {
  const { activeWord } = useGame();

  return (
    <header className="gp-header">
      <img src={logo} alt="Doodles Logo" className="gp-logo-img" />
      
      <div className="gp-word">
           {gameState.state === GameState.DRAWING && wordLength > 0 && (
              <span className="gp-word-text">
                {activeWord ? activeWord : "_".repeat(wordLength)}
              </span>
           )}
           {gameState.state === GameState.LOBBY && (
              <span style={{ color: '#a0aec0', fontStyle: 'italic', fontSize: '0.9rem' }}>Waiting to start...</span>
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
