import { useGame } from "../context/GameContext";
import { GameState } from "../utils/constants";
import { useNavigate } from "react-router-dom";

const Leaderboard = () => {
  const { gameState, leaderboard } = useGame();
  const navigate = useNavigate();

  if (gameState.state !== GameState.LEADERBOARD) return null;

  return (
    <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="bg-white w-96 rounded-2xl shadow-2xl p-6 text-center transform transition-all animate-bounce-in">
        <h2 className="text-4xl font-extrabold mb-6 text-yellow-500 tracking-wider">🏆 WINNERS 🏆</h2>
        
        <div className="flex flex-col gap-4 mb-8">
          {leaderboard.map((player, index) => (
            <div 
              key={player.id} 
              className={`flex items-center gap-4 p-4 rounded-xl shadow-md ${
                index === 0 ? "bg-yellow-100 border-2 border-yellow-400" :
                index === 1 ? "bg-gray-100 border-2 border-gray-400" :
                "bg-orange-50 border-2 border-orange-300"
              }`}
            >
              <div className="text-3xl font-bold w-12 text-gray-700">#{index + 1}</div>
              
              {player.avatar ? (
                <img src={player.avatar} alt="avatar" className="w-12 h-12" />
              ) : (
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  {player.username?.[0]?.toUpperCase()}
                </div>
              )}
              
              <div className="text-left flex-1 min-w-0">
                <div className="font-bold text-lg text-gray-800 truncate">{player.username}</div>
                <div className="text-sm font-semibold text-gray-600">{player.score} pts</div>
              </div>
            </div>
          ))}
          {leaderboard.length === 0 && (
            <p className="text-gray-500">Not enough players to rank.</p>
          )}
        </div>

        <button
          onClick={() => navigate("/")}
          className="bg-blue-600 outline-none text-white w-full py-3 rounded-xl font-bold text-lg hover:bg-blue-700 transition"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default Leaderboard;
