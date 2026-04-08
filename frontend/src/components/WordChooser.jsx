import { useGame } from "../context/GameContext";
import { GameState } from "../utils/constants";
import { socket } from "../socket";
import "./styles/WordChooser.css";

const WordChooser = () => {
  const { gameState, wordOptions } = useGame();

  if (gameState.state !== GameState.CHOOSING || wordOptions.length === 0) return null;

  const handleSelect = (word) => {
    socket.emit("word_selected", word);
  };

  return (
    <div className="wc-overlay">
      <div className="wc-dialog">
        <h2 className="wc-title">Choose a word</h2>
        
        <div className="wc-word-list">
          {wordOptions.map((word) => (
            <button
              key={word}
              onClick={() => handleSelect(word)}
              className="wc-word-btn"
            >
              {word}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WordChooser;
