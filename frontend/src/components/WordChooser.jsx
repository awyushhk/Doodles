import { useGame } from "../context/GameContext";
import { GameState } from "../utils/constants";
import { socket } from "../socket";

const WordChooser = () => {
  const { gameState, wordOptions } = useGame();

  if (gameState.state !== GameState.CHOOSING || wordOptions.length === 0) return null;

  const handleSelect = (word) => {
    socket.emit("word_selected", word);
  };

  return (
    <div className="absolute inset-0 bg-black/60 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-2xl shadow-xl text-center">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Choose a word</h2>
        <div className="flex gap-4 justify-center">
          {wordOptions.map((word) => (
            <button
              key={word}
              onClick={() => handleSelect(word)}
              className="bg-blue-500 text-white px-6 py-3 rounded-lg text-lg font-bold hover:bg-blue-600 transition-transform hover:scale-105 active:scale-95"
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
