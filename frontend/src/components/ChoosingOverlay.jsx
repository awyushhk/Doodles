import React from 'react';
import { svgToDataUrl } from "./AvatarChanger";
import "./styles/ChoosingOverlay.css";

const ChoosingOverlay = ({ drawerPlayer }) => {
  if (!drawerPlayer) return null;

  const avatarSrc = drawerPlayer.avatar ? svgToDataUrl(drawerPlayer.avatar) : null;

  return (
    <div className="co-root">
      <div className="co-card">
        {avatarSrc ? (
          <img src={avatarSrc} alt={drawerPlayer.username} className="co-avatar" />
        ) : (
          <div className="co-avatar-fallback">
            {drawerPlayer.username?.[0]?.toUpperCase()}
          </div>
        )}
        <div className="co-text">
          <span className="co-name">{drawerPlayer.username}</span> is choosing a word...
        </div>
      </div>
    </div>
  );
};

export default ChoosingOverlay;
