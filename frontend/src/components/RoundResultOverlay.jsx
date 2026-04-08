import React from 'react';
import { svgToDataUrl } from "./AvatarChanger";
import "./styles/RoundResultOverlay.css";

const RoundResultOverlay = ({ roundResult, players }) => {
  if (!roundResult) return null;

  const { word, turnScores, reason } = roundResult;

  // Filter players who have scores for this round or were in the game
  // Let's show everyone who is currently in the room
  // Sort by points gained (descending)
  const sortedPlayers = [...players].sort((a, b) => {
    const scoreA = turnScores[a.id] || 0;
    const scoreB = turnScores[b.id] || 0;
    return scoreB - scoreA;
  });

  return (
    <div className="rr-root">
      <div className="rr-content">
        <h2 className="rr-title">
          {reason === "all_guessed" && "Everyone guessed the word!"}
          {reason === "time_up" && "Time's up!"}
          {reason === "drawer_left" && "The drawer left!"}
        </h2>
        <div className="rr-word-box">
          The word was <span className="rr-word">{word}</span>!
        </div>

        <div className="rr-scores">
          {sortedPlayers.map((player) => {
            const pointsGained = turnScores[player.id] || 0;
            const avatarSrc = player.avatar ? svgToDataUrl(player.avatar) : null;
            
            return (
              <div key={player.id} className="rr-player-row">
                <div className="rr-player-left">
                  {avatarSrc ? (
                    <img src={avatarSrc} alt="avatar" className="rr-avatar" />
                  ) : (
                    <div className="rr-avatar-fallback">{player.username?.[0]}</div>
                  )}
                  <span className="rr-username">{player.username}</span>
                </div>
                <div className={`rr-points ${pointsGained > 0 ? 'positive' : 'zero'}`}>
                  {pointsGained > 0 ? `+${pointsGained}` : "0"}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RoundResultOverlay;
