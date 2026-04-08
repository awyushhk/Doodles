import { getRandomWords } from "./words.js";
import scoreManager from "./scoreManager.js";
import roomManager from "./roomManager.js";
import gameManager from "./gameManager.js";

const TURN_TIME = 60;

class TurnManager {
  constructor() {
    // { roomId: { drawerIndex: 0, timerInterval: null, timeRemaining: 0, wordOptions: [], activeWord: null, guessedCount: 0 } }
    this.turns = {};
  }

  initTurnState(roomId) {
    if (!this.turns[roomId]) {
      this.turns[roomId] = {
        drawerIndex: 0,
        timerInterval: null,
        choosingTimer: null,
        timeRemaining: 0,
        wordOptions: [],
        activeWord: null,
        guessedCount: 0,
        turnScores: {}
      };
    }
  }

  getTurnState(roomId) {
    return this.turns[roomId];
  }

  startNextTurn(io, roomId) {
    this.initTurnState(roomId);
    const players = roomManager.getPlayers(roomId);
    if (players.length < 2) {
      // Not enough players, reset to lobby
      gameManager.setState(roomId, "LOBBY");
      io.to(roomId).emit("game_state_update", gameManager.getGameState(roomId));
      return;
    }

    const state = this.turns[roomId];
    
    // Check if we reached the end of the rotation
    if (state.drawerIndex >= players.length) {
      state.drawerIndex = 0;
      gameManager.incrementCycle(roomId);
      
      if (gameManager.isGameOver(roomId)) {
        this.endGame(io, roomId);
        return;
      }
    }

    // Reset guesses
    scoreManager.resetGuesses(players);
    state.guessedCount = 0;
    state.activeWord = null;
    state.turnScores = {};

    const currentDrawer = players[state.drawerIndex];
    
    // Get words
    state.wordOptions = getRandomWords(3);
    gameManager.setState(roomId, "CHOOSING");

    // Clean up any old timer
    this.clearTimer(roomId);
    
    // Clear the canvas for all clients for the new turn
    io.to(roomId).emit("clear_canvas");

    // Notify room
    io.to(roomId).emit("round_started", {
      drawerId: currentDrawer.id,
      state: gameManager.getGameState(roomId),
      cycle: gameManager.getGameState(roomId).cycle
    });

    // Send words ONLY to the drawer
    io.to(currentDrawer.id).emit("choose_word", state.wordOptions);

    // AUTO-CHOOSING LOGIC:
    // If drawer doesn't choose within 6 seconds, pick a word for them
    this.clearChoosingTimer(roomId);
    const choosingEndTime = Date.now() + 6000;
    io.to(currentDrawer.id).emit("choosing_timer_start", choosingEndTime);

    state.choosingTimer = setTimeout(() => {
       if (gameManager.getGameState(roomId).state === "CHOOSING") {
          console.log(`[${roomId}] Auto-choosing word for ${currentDrawer.username}`);
          // Pick a random word from the options
          const randomWord = state.wordOptions[Math.floor(Math.random() * state.wordOptions.length)];
          this.wordSelected(io, roomId, randomWord);
       }
    }, 6000);

    console.log(`[${roomId}] Turn rotation: Drawer is ${currentDrawer.username}`);
  }

  clearChoosingTimer(roomId) {
     if (this.turns[roomId]?.choosingTimer) {
        clearTimeout(this.turns[roomId].choosingTimer);
        this.turns[roomId].choosingTimer = null;
     }
  }

  wordSelected(io, roomId, word) {
    const state = this.turns[roomId];
    if (!state || gameManager.getGameState(roomId).state !== "CHOOSING") return;

    this.clearChoosingTimer(roomId);

    // Validate word is one of choices to prevent cheating
    if (!state.wordOptions.includes(word)) return;

    state.activeWord = word;
    gameManager.setState(roomId, "DRAWING");
    
    // Notify the entire room (guessers will only use length)
    io.to(roomId).emit("word_selected", { wordLength: word.length });
    
    // Send the actual word only to the drawer
    const players = roomManager.getPlayers(roomId);
    const currentDrawer = players[state.drawerIndex];
    if (currentDrawer) {
      io.to(currentDrawer.id).emit("word_selected", { 
        wordLength: word.length, 
        word: word 
      });
    }
    
    this.startTimer(io, roomId);
  }

  startTimer(io, roomId) {
    const state = this.turns[roomId];
    
    // Switch to absolute end time
    state.endTime = Date.now() + TURN_TIME * 1000;

    this.clearTimer(roomId);

    // Give clients the exact epoch finish time
    io.to(roomId).emit("timer_start", state.endTime);

    // We still have an interval to resolve the turn on the backend when time is up.
    state.timerInterval = setInterval(() => {
      const remainingMS = state.endTime - Date.now();
      if (remainingMS <= 0) {
        this.endTurn(io, roomId, "time_up");
      }
    }, 1000); // Only checking once a second is fine for ending the turn
  }

  clearTimer(roomId) {
    if (this.turns[roomId]?.timerInterval) {
      clearInterval(this.turns[roomId].timerInterval);
      this.turns[roomId].timerInterval = null;
    }
    this.clearChoosingTimer(roomId);
  }

  // Handle a guess
  handleGuess(io, roomId, socket, text) {
    const state = this.turns[roomId];
    if (!state || gameManager.getGameState(roomId).state !== "DRAWING") {
      // Just a normal message if not guessing correctly in active phase
      return false;
    }

    const players = roomManager.getPlayers(roomId);
    const guesser = players.find(p => p.id === socket.id);
    const drawer = players[state.drawerIndex];

    if (!guesser) return false;

    // Drawer can't guess!
    if (guesser.id === drawer.id) return false;

    // Already guessed correctly this round!
    if (guesser.guessed) return false;

    if (text && text.toLowerCase().trim() === state.activeWord.toLowerCase()) {
      // Correct guess!
      guesser.guessed = true;
      state.guessedCount += 1;

      // Calculate score based on true time remaining
      const timeRemaining = Math.max(0, Math.floor((state.endTime - Date.now()) / 1000));
      const points = scoreManager.calculateGuessScore(timeRemaining, TURN_TIME);

      state.turnScores = state.turnScores || {};
      state.turnScores[guesser.id] = (state.turnScores[guesser.id] || 0) + points;

      io.to(roomId).emit("correct_guess", {
        userId: guesser.id,
        username: guesser.username,
        points: points
      });

      // Update clients with new player list (for points/guessed indicators)
      io.to(roomId).emit("update_players", players);

      // Check if everyone guessed (total players - 1 drawer)
      if (state.guessedCount >= players.length - 1) {
        this.endTurn(io, roomId, "all_guessed");
      }

      return true; // Was a match
    }

    return false; // Not a match
  }

  endTurn(io, roomId, reason) {
    const state = this.turns[roomId];
    if (!state) return;

    this.clearTimer(roomId);
    
    const players = roomManager.getPlayers(roomId);
    const drawer = players[state.drawerIndex];

    state.turnScores = state.turnScores || {};

    // Give drawer points
    if (drawer) {
      const drawerPoints = scoreManager.calculateDrawerScore(state.guessedCount, players.length - 1);
      state.turnScores[drawer.id] = (state.turnScores[drawer.id] || 0) + drawerPoints;
    }

    // Apply turn scores to actual player scores now
    players.forEach(p => {
       if (state.turnScores[p.id]) {
          p.score += state.turnScores[p.id];
       }
    });

    const resultPayload = {
      reason,
      word: state.activeWord,
      turnScores: state.turnScores
    };

    io.to(roomId).emit("turn_end", resultPayload);
    // Send immediate stats update
    io.to(roomId).emit("update_players", players);

    // Wait a brief moment showing the answer, then start next turn
    setTimeout(() => {
      // Move to next drawer BEFORE starting next turn
      state.drawerIndex++;
      this.startNextTurn(io, roomId);
    }, 5000);
  }

  endGame(io, roomId) {
    gameManager.setState(roomId, "LEADERBOARD");
    
    const players = roomManager.getPlayers(roomId);
    const topThree = scoreManager.getTopThree(players);
    
    io.to(roomId).emit("game_over", {
      leaderboard: topThree
    });

    // Cleanup states
    this.clearTimer(roomId);
    delete this.turns[roomId];
    gameManager.resetGame(roomId);
    
    // reset scores
    players.forEach(p => p.score = 0);
  }

  handlePlayerLeave(io, roomId, socketId) {
    const state = this.turns[roomId];
    if (!state) return;

    const players = roomManager.getPlayers(roomId);
    const drawer = players[state.drawerIndex]; // the old target drawer

    // If game empty, completely cleanup
    if (players.length === 0) {
      this.clearTimer(roomId);
      delete this.turns[roomId];
      gameManager.deleteGame(roomId);
      return;
    }

    // if game drops below 2 players mid-game
    if (players.length < 2 && gameManager.getGameState(roomId).state !== "LOBBY") {
      this.clearTimer(roomId);
      gameManager.setState(roomId, "LOBBY");
      io.to(roomId).emit("game_state_update", gameManager.getGameState(roomId));
      return;
    }

    // if the DRAWER left during their turn
    if (drawer && drawer.id === socketId && gameManager.getGameState(roomId).state !== "LOBBY") {
      this.endTurn(io, roomId, "drawer_left");
    } else {
      // A guesser left. We might need to adjust things:
      // 1. Did everyone else already guess?
      if (gameManager.getGameState(roomId).state === "DRAWING" && state.guessedCount >= players.length - 1) {
        this.endTurn(io, roomId, "all_guessed");
      }
      
      // 2. Adjust drawer index if the person who left was BEFORE the current drawer
      // But wait! roomManager already removed them from the array.
      // So if their index was < drawerIndex, we need to shift drawerIndex down by 1.
      // Wait, let's keep it simple. If drawerIndex might be out of bounds:
      if (state.drawerIndex >= players.length) {
         state.drawerIndex = 0; // fallback
      }
    }
  }
}

export default new TurnManager();
