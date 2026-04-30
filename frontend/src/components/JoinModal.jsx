import React from "react";
import pencilIcon from "../assets/icons/pencil.png";
import brushIcon from "../assets/icons/paint-brush.png";

const modalData = {
  about: {
    title: "About",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" stroke="none">
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
      </svg>
    ),
    text: "Doodles is a free online multiplayer drawing and guessing pictionary game. A normal game consists of a few rounds, where every round a player has to draw their chosen word and others have to guess it to gain points! The person with the most points at the end of the game, will then be crowned as the winner! Have fun!"
  },
  how: {
    title: "How to Play",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" stroke="none">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z" />
      </svg>
    ),
    text: (
      <div className="jp-how-grid">
        <div className="jp-how-item">
          <div className="jp-how-visual">
            <img src={pencilIcon} alt="Pencil" width="50" height="50" />
          </div>
          <p><strong>Draw</strong> the word to your best ability when its your turn!</p>
        </div>
        
        <div className="jp-how-item">
          <div className="jp-how-visual">
            <img src={brushIcon} alt="Fill" width="50" height="50" />
          </div>
          <p>Otherwise, <strong>Guess</strong> the word as fast as you can to win!</p>
        </div>

        <div className="jp-how-item">
          <div className="jp-how-visual warning">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>
          </div>
          <p><strong>Rules</strong>: Do not write the word or spoil it in chat. <strong>Be nice</strong> to others!</p>
        </div>
      </div>
    )
  },
  contact: {
    title: "Contact",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" stroke="none">
        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
      </svg>
    ),
    text: (
      <div className="jp-contact-links">
        <p>Got questions or suggestions? Reach out to us or follow our updates!</p>
        <a href="mailto:gr8ayushkumar@gmail.com" target="_blank" rel="noreferrer" className="jp-contact-link">
           <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" /></svg>
           gr8ayushkumar@gmail.com
        </a>
        <a href="https://github.com/awyushhk/Doodles" target="_blank" rel="noreferrer" className="jp-contact-link">
           <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/></svg>
           GitHub
        </a>
        <a href="https://www.linkedin.com/in/ayush-kumar100/" target="_blank" rel="noreferrer" className="jp-contact-link">
           <svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
           LinkedIn
        </a>
      </div>
    )
  }
};

const JoinModal = ({ isOpen, type, onClose }) => {
  if (!isOpen || !type) return null;
  const data = modalData[type];

  return (
    <div className="jp-modal-overlay" onClick={onClose}>
      <div className="jp-modal" onClick={(e) => e.stopPropagation()}>
        <div className="jp-modal-header">
          <div className="jp-modal-icon">{data.icon}</div>
          <h2 className="jp-modal-title">{data.title}</h2>
          <button className="jp-modal-close" onClick={onClose}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        <div className="jp-modal-content">{data.text}</div>
      </div>
    </div>
  );
};

export default JoinModal;
