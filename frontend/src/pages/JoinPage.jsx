// JoinPage.jsx
import { useState } from "react";
import { socket } from "../socket";
import { useNavigate } from "react-router-dom";
import AvatarChanger from "../components/AvatarChanger";
import JoinModal from "../components/JoinModal";
import logo from "../assets/Doodles-logo.png";
import "../components/styles/JoinPage.css";

const JoinPage = () => {
  const [room, setRoom] = useState(localStorage.getItem("doodle_room") || "");
  const [username, setUsername] = useState(localStorage.getItem("doodle_username") || "");
  const [avatarIndex, setAvatarIndex] = useState(parseInt(localStorage.getItem("doodle_avatar_index") || "0"));
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [modalType, setModalType] = useState(null);

  const navigate = useNavigate();

  const joinRoom = () => {
    if (room.trim() !== "" && username.trim() !== "") {
      localStorage.setItem("doodle_room", room);
      localStorage.setItem("doodle_username", username);
      localStorage.setItem("doodle_avatar_index", avatarIndex.toString());
      navigate("/game", { state: { username, room, avatar: selectedAvatar } });
    } else {
      alert("Please enter a username and room code!");
    }
  };

  return (
    <div className="jp-root">
      <div className="jp-background" aria-hidden="true"></div>
      <div className="jp-card">
        <img src={logo} alt="Doodles Logo" className="jp-logo-img" />

        <div className="jp-input-group">
          <AvatarChanger
            currentIndex={avatarIndex}
            onIndexChange={setAvatarIndex}
            selectedAvatar={selectedAvatar}
            onAvatarChange={(avatar) => setSelectedAvatar(avatar)}
          />
        </div>

        <div className="jp-input-group">
          <label className="jp-label">Username</label>
          <input
            className="jp-input"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            type="text"
            placeholder="What's your name?"
          />
        </div>

        <div className="jp-input-group">
          <label className="jp-label">Join Room</label>
          <div className="jp-room-row">
            <input
              className="jp-input"
              onChange={(e) => setRoom(e.target.value)}
              value={room}
              type="text"
              placeholder="Room Code"
            />
          </div>
        </div>

        <button className="jp-button full-width" onClick={joinRoom}>
          PLAY!
        </button>
      </div>

      <div className="jp-side-buttons">
        <button className="jp-side-btn" onClick={() => setModalType('about')} title="About Us">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
          </svg>
        </button>
        <button className="jp-side-btn" onClick={() => setModalType('how')} title="How to Play">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z" />
          </svg>
        </button>
        <button className="jp-side-btn" onClick={() => setModalType('contact')} title="Contact">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
          </svg>
        </button>
      </div>

      <JoinModal 
        isOpen={!!modalType} 
        type={modalType} 
        onClose={() => setModalType(null)} 
      />
    </div>
  );
};

export default JoinPage;