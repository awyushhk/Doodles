import { useGame } from "../context/GameContext";
import { GameState } from "../utils/constants";
import { useNavigate } from "react-router-dom";
import { svgToDataUrl } from "./AvatarChanger";
import "./styles/Leaderboard.css";

const Leaderboard = () => {
  const { gameState, leaderboard } = useGame();
  const navigate = useNavigate();

  if (gameState.state !== GameState.LEADERBOARD) return null;

  return (
    <div className="lb-overlay">
      <div className="lb-dialog">
        
        {/* Header */}
        <div className="lb-header">
           <span className="lb-trophy">🏆</span>
           <span className="lb-title">Winners</span>
           <span className="lb-trophy">🏆</span>
        </div>

        {/* List */}
        <div className="lb-list">
          {leaderboard.map((player, index) => {
            const avatarSrc = player.avatar ? svgToDataUrl(player.avatar) : null;
            
            // Assign colors based on rank
            let rowClass = "rank-other";
            if (index === 0) rowClass = "rank-1";
            else if (index === 1) rowClass = "rank-2";
            else if (index === 2) rowClass = "rank-3";

            return (
              <div key={player.id} className={`lb-row ${rowClass}`}>
                <span className="lb-rank-num">#{index + 1}</span>
                
                {avatarSrc ? (
                  <img src={avatarSrc} alt="avatar" className="lb-avatar-img" draggable={false} />
                ) : (
                  <div className="lb-avatar-fallback">
                    {player.username?.[0]?.toUpperCase()}
                  </div>
                )}
                
                <div className="lb-info-col">
                  <span className="lb-username">
                    {player.username}
                  </span>
                  <span className="lb-score">
                    {player.score ?? 0} pts
                  </span>
                </div>
              </div>
            );
          })}
          
          {leaderboard.length === 0 && (
             <div className="lb-empty">No players played.</div>
          )}
        </div>

        {/* Footer Button */}
        <div className="lb-footer-btn" onClick={() => navigate("/")}>
           <span className="lb-footer-text">Back to Home</span>
        </div>

      </div>
    </div>
  );
};

export default Leaderboard;
