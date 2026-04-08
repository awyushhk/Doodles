// JoinPage.jsx
import { useState } from "react";
import { socket } from "../socket";
import { useNavigate } from "react-router-dom";
import AvatarChanger from "../components/AvatarChanger";
import logo from "../assets/Doodles logo.png";
import "../components/styles/JoinPage.css";

const JoinPage = () => {
  const [room, setRoom] = useState("");
  const [username, setUsername] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState(null);

  const navigate = useNavigate();

  const joinRoom = () => {
    if (room.trim() !== "" && username.trim() !== "") {
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