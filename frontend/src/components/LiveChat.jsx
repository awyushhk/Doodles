import { useState, useEffect, useRef } from "react";
import "./styles/LiveChat.css";

const LiveChat = ({ socket, room, username }) => {
  const [msg, setMsg] = useState("");
  const [messages, setMessages] = useState([]);
  const bottomRef = useRef(null);

  useEffect(() => {
    socket.on("message_from_server", (data) =>
      setMessages((prev) => [...prev, data])
    );

    socket.on("correct_guess", ({ username: guesserName, points }) => {
      setMessages((prev) => [
         ...prev, 
         { system: true, message: `${guesserName} guessed the word! (+${points} pts)`}
      ]);
    });

    return () => {
      socket.off("message_from_server");
      socket.off("correct_guess");
    };
  }, [socket]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (msg.trim() && username) {
      socket.emit("message_from_client", { message: msg.trim(), room, username });
      setMsg("");
    }
  };

  return (
    <>
      <div className="lc-header">LIVE CHAT</div>
      <div className="lc-messages">
        {messages.map((message, index) => {
          if (message.system) {
            return (
              <div key={index} className="lc-msg lc-system">
                {message.message}
              </div>
            );
          }
          return (
            <div key={index} className={`lc-msg ${message.username === username ? "lc-mine" : ""}`}>
              <span className="lc-sender">{message.username}:</span>
              {message.message}
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>
      <div className="lc-footer">
        <input className="lc-input" value={msg}
          onChange={(e) => setMsg(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          type="text" placeholder="Type your guess here..." />
        <button className="lc-send" onClick={sendMessage}>Send</button>
      </div>
    </>
  );
};

export default LiveChat;