import { useState } from "react";
import "./styles/AvatarChanger.css";

// The user's exact explicit raw loaded pattern
const avatarModules = import.meta.glob("../assets/avatars/*.svg", { eager: true, query: "?raw", import: "default" });
const avatarList = Object.values(avatarModules);

export const svgToDataUrl = (svgString) =>
  `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svgString)))}`;

const AvatarChanger = ({ onAvatarChange, selectedAvatar, currentIndex, onIndexChange }) => {
  const navigate = (dir) => {
    if (avatarList.length <= 1) return;
    const next = dir === "right"
      ? (currentIndex + 1) % avatarList.length
      : (currentIndex - 1 + avatarList.length) % avatarList.length;
    
    onIndexChange?.(next);
    onAvatarChange?.(avatarList[next]);
  };

  useState(() => {
    if (avatarList.length > 0 && !selectedAvatar) {
       onAvatarChange?.(avatarList[currentIndex]);
    }
  });

  if (avatarList.length === 0) return <p>No avatars found</p>;

  return (
    <div className="ac-container">
      <div className="ac-row">
        <button onClick={() => navigate("left")} className="ac-nav-btn">←</button>

        <img src={svgToDataUrl(avatarList[currentIndex])} alt="avatar" className="ac-avatar-img" draggable={false} />

        <button onClick={() => navigate("right")} className="ac-nav-btn">→</button>
      </div>
    </div>
  );
};

export default AvatarChanger;
