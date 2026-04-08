import { createContext, useState, useContext } from "react";
import { GameState } from "../utils/constants";

const GameContext = createContext();

export const useGame = () => useContext(GameContext);

export const GameProvider = ({ children }) => {
  const [gameState, setGameState] = useState({ state: GameState.LOBBY, cycle: 1 });
  const [activeDrawer, setActiveDrawer] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [wordOptions, setWordOptions] = useState([]);
  const [wordLength, setWordLength] = useState(0);
  const [leaderboard, setLeaderboard] = useState([]);

  return (
    <GameContext.Provider value={{
      gameState, setGameState,
      activeDrawer, setActiveDrawer,
      endTime, setEndTime,
      wordOptions, setWordOptions,
      wordLength, setWordLength,
      leaderboard, setLeaderboard
    }}>
      {children}
    </GameContext.Provider>
  );
};
