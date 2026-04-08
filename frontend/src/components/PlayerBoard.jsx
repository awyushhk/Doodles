import { svgToDataUrl } from "./AvatarChanger";

const PlayerBoard = ({ players = [], currentId }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
      {players.map((player, i) => {
        const isYou = player.id === currentId;
        const avatarSrc = player.avatar ? svgToDataUrl(player.avatar) : null;
        return (
          <div
            key={player.id}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "10px 10px",
              borderBottom: "2px solid #1a365d",
              background: isYou ? "#276749" : i % 2 === 0 ? "#1e4e8c" : "#1a4a7a",
            }}
          >
            <span style={{
              fontFamily: "'Fredoka One', cursive",
              fontSize: "0.9rem",
              color: isYou ? "#9ae6b4" : "#63b3ed",
              width: "28px", flexShrink: 0,
            }}>#{i + 1}</span>

            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{
                fontWeight: 800, fontSize: "0.82rem",
                color: isYou ? "#f0fff4" : "#ebf8ff",
                whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
              }}>
                {player.username}
                {isYou && <span style={{ marginLeft: 4, fontSize: "0.7rem", color: "#9ae6b4" }}>(You)</span>}
              </div>
              <div style={{ fontSize: "0.72rem", color: isYou ? "#9ae6b4" : "#63b3ed", fontWeight: 600 }}>
                {player.score ?? 0} points
              </div>
            </div>

            {avatarSrc ? (
              <img src={avatarSrc} alt={player.username}
                style={{ width: 44, height: 44, objectFit: "contain", flexShrink: 0 }}
                draggable={false} />
            ) : (
              <div style={{
                width: 44, height: 44, borderRadius: "50%", background: "#2b6cb0",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: "'Fredoka One', cursive", fontSize: "1.2rem",
                color: "#bee3f8", flexShrink: 0,
              }}>
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