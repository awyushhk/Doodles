import { useState, useEffect } from "react";

// Dynamically imports all SVGs from assets/avatar folder
// When you add new SVGs, they are auto-discovered
const avatarModules = import.meta.glob("../assets/avatars/*.svg", {
  eager: true,
});
const avatarList = Object.values(avatarModules).map((mod) => mod.default);

const AvatarChanger = ({ selectedAvatar, onAvatarChange }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Notify parent of initial avatar on first render
  useEffect(() => {
    if (avatarList.length > 0) {
      onAvatarChange?.(avatarList[0]);
    }
  }, []);

  const navigate = (dir) => {
    if (avatarList.length <= 1) return;
    setCurrentIndex((prev) => {
      const next =
        dir === "right"
          ? (prev + 1) % avatarList.length
          : (prev - 1 + avatarList.length) % avatarList.length;
      onAvatarChange?.(avatarList[next]);
      return next;
    });
  };

  if (avatarList.length === 0) {
    return (
      <p className="text-sm text-gray-400 text-center">No avatars found</p>
    );
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex items-center gap-6">
        <button
          onClick={() => navigate("left")}
          className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition text-gray-600 font-bold text-lg select-none"
          aria-label="Previous avatar"
        >
          ←
        </button>

        <div
          style={{ width: 160, height: 160 }}
          className="flex items-center justify-center"
        >
          <img
            key={currentIndex}
            src={avatarList[currentIndex]}
            alt={`Avatar ${currentIndex + 1}`}
            style={{ width: 160, height: 160, objectFit: "contain" }}
            draggable={false}
          />
        </div>

        <button
          onClick={() => navigate("right")}
          className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition text-gray-600 font-bold text-lg select-none"
          aria-label="Next avatar"
        >
          →
        </button>
      </div>
    </div>
  );
};

export default AvatarChanger;
