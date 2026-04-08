import { useState, useEffect } from "react";
import { useGame } from "../context/GameContext";
import { GameState } from "../utils/constants";

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
    <div className="absolute top-4 right-4 bg-white shadow-md rounded-full w-16 h-16 flex items-center justify-center border-4 border-blue-500">
      <span className="text-xl font-bold text-gray-800">{displayTime}</span>
    </div>
  );
};

export default Timer;
