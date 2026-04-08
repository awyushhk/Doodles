// JoinPage.jsx
import { useState } from "react";
import { socket } from "../socket";
import { useNavigate } from "react-router-dom";
import AvatarChanger from "../components/AvatarChanger";
import logo from "../assets/Doodles logo.png";
import "../components/styles/JoinPage.css";

const JoinPage = () => {
  const [room, setRoom] = useState(localStorage.getItem("doodle_room") || "");
  const [username, setUsername] = useState(localStorage.getItem("doodle_username") || "");
  const [avatarIndex, setAvatarIndex] = useState(parseInt(localStorage.getItem("doodle_avatar_index") || "0"));
  const [selectedAvatar, setSelectedAvatar] = useState(null);

  const navigate = useNavigate();

  const joinRoom = () => {
    if (room.trim() !== "" && username.trim() !== "") {
      // Save for next time
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

        {/* Avatar Picker */}
        <div className="jp-input-group">
          <AvatarChanger
            currentIndex={avatarIndex}
            onIndexChange={setAvatarIndex}
            selectedAvatar={selectedAvatar}
            onAvatarChange={(avatar) => setSelectedAvatar(avatar)}
          />
        </div>

        {/* Username */}
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

        {/* Room */}
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
    </div>
  );
};

export default JoinPage;