import { useState, useEffect } from "react";
import { useGame } from "../context/GameContext";
import { GameState } from "../utils/constants";

import "./styles/Timer.css";

const Timer = () => {
  const { gameState, endTime } = useGame();
  const [displayTime, setDisplayTime] = useState(0);

  useEffect(() => {
    if (!endTime) return;

    const interval = setInterval(() => {
      const remainingMS = endTime - Date.now();
      setDisplayTime(Math.max(0, Math.floor(remainingMS / 1000)));
    }, 100);

    return () => clearInterval(interval);
  }, [endTime]);

  if (gameState.state !== GameState.DRAWING) return null;

  return (
    <div className="timer-container">
      <span className="timer-text">{displayTime}</span>
    </div>
  );
};

export default Timer;
