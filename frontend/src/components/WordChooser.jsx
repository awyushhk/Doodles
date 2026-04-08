import { useState, useEffect } from "react";
import { useGame } from "../context/GameContext";
import { GameState } from "../utils/constants";
import { socket } from "../socket";
import "./styles/WordChooser.css";

const WordChooser = () => {
  const { gameState, wordOptions, choosingEndTime } = useGame();
  const [timeLeft, setTimeLeft] = useState(6);

  useEffect(() => {
    if (!choosingEndTime) return;

    const interval = setInterval(() => {
      const remaining = Math.max(0, Math.ceil((choosingEndTime - Date.now()) / 1000));
      setTimeLeft(remaining);
      if (remaining <= 0) clearInterval(interval);
    }, 100);

    return () => clearInterval(interval);
  }, [choosingEndTime]);

  if (gameState.state !== GameState.CHOOSING || wordOptions.length === 0) return null;

  const handleSelect = (word) => {
    socket.emit("word_selected", word);
  };

  return (
    <div className="wc-overlay">
      <div className="wc-dialog">
        <h2 className="wc-title">Choose a word</h2>
        <div className="wc-timer">
          Auto-choosing in <span className="wc-timer-number">{timeLeft}s</span>
        </div>
        
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
