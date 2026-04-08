import { svgToDataUrl } from "./AvatarChanger";
import "./styles/PlayerBoard.css";

const PlayerBoard = ({ players = [], currentId }) => {
  return (
    <div className="pb-container">
      {players.map((player, i) => {
        const isYou = player.id === currentId;
        const rowClass = isYou ? "is-you" : i % 2 === 0 ? "is-even" : "is-odd";
        const avatarSrc = player.avatar ? svgToDataUrl(player.avatar) : null;
        return (
          <div key={player.id} className={`pb-player-row ${rowClass}`}>
            <span className="pb-rank">#{i + 1}</span>

            <div className="pb-info-col">
              <div className="pb-username-wrap">
                {player.username}
                {isYou && <span className="pb-you-tag">(You)</span>}
              </div>
              <div className="pb-score-wrap">
                {player.score ?? 0} points
              </div>
            </div>

            {avatarSrc ? (
              <img src={avatarSrc} alt={player.username} className="pb-avatar-img" draggable={false} />
            ) : (
              <div className="pb-avatar-fallback">
                {player.username?.[0]?.toUpperCase()}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default PlayerBoard;