import { useEffect } from "react";
import { socket } from "../socket";
import { useGame } from "../context/GameContext";
import { GameState } from "../utils/constants";

export const useSocket = (room) => {
  const {
    setGameState,
    setActiveDrawer,
    setEndTime,
    setWordOptions,
    setWordLength,
    setLeaderboard
  } = useGame();

  useEffect(() => {
    socket.on("game_state_update", (state) => {
      setGameState(state);
    });

    socket.on("round_started", ({ drawerId, state }) => {
      setActiveDrawer(drawerId);
      setGameState(state);
      setWordLength(0); // clear UI
      setWordOptions([]);
    });

    socket.on("choose_word", (words) => {
      setWordOptions(words);
    });

    socket.on("word_selected", ({ wordLength }) => {
      setWordLength(wordLength);
      setWordOptions([]); // Hide overlay for drawer
      setGameState(prev => ({ ...prev, state: GameState.DRAWING }));
    });

    socket.on("timer_start", (endTime) => {
      setEndTime(endTime);
    });

    socket.on("turn_end", ({ reason, word }) => {
      console.log("Turn ended because:", reason, "Word was:", word);
      setEndTime(null);
    });

    socket.on("game_over", ({ leaderboard }) => {
      setGameState(prev => ({ ...prev, state: GameState.LEADERBOARD }));
      setLeaderboard(leaderboard);
    });

    return () => {
      socket.off("game_state_update");
      socket.off("round_started");
      socket.off("choose_word");
      socket.off("word_selected");
      socket.off("timer_start");
      socket.off("turn_end");
      socket.off("game_over");
    };
  }, [room, setGameState, setActiveDrawer, setEndTime, setWordOptions, setWordLength, setLeaderboard]);
};
