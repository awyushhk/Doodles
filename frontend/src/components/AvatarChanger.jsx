import { useEffect } from "react";
import "./styles/AvatarChanger.css";

// The user's exact explicit raw loaded pattern
const avatarModules = import.meta.glob("../assets/avatars/*.svg", { eager: true, query: "?raw", import: "default" });
const avatarList = Object.values(avatarModules).map(mod => typeof mod === 'string' ? mod : mod.default || mod);

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

  useEffect(() => {
    if (avatarList.length > 0 && !selectedAvatar) {
       onAvatarChange?.(avatarList[currentIndex]);
    }
  }, [currentIndex, selectedAvatar, onAvatarChange]);

  if (avatarList.length === 0) return <p>No avatars found</p>;

  // Ensure the SVG string is clean (handles Vite's potential double-escaping in some environments)
  const cleanSvg = (avatarList[currentIndex] || "").replace(/\\"/g, '"').replace(/\\n/g, '');

  return (
    <div className="ac-container">
      <div className="ac-row">
        <button onClick={() => navigate("left")} className="ac-nav-btn" title="Previous">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="ac-arrow-icon">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        <div className="ac-avatar-wrapper" dangerouslySetInnerHTML={{ __html: cleanSvg }} />

        <button onClick={() => navigate("right")} className="ac-nav-btn" title="Next">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="ac-arrow-icon">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default AvatarChanger;
