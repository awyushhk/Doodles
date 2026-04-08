class GameManager {
  constructor() {
    // { roomId: { state: "LOBBY"|"CHOOSING"|"DRAWING"|"LEADERBOARD", cycle: 1, maxCycles: 3 } }
    this.games = {};
  }

  initGame(roomId) {
    this.games[roomId] = {
      state: "LOBBY",
      cycle: 1,
      maxCycles: 3,
    };
  }

  getGameState(roomId) {
    if (!this.games[roomId]) this.initGame(roomId);
    return this.games[roomId];
  }

  setState(roomId, state) {
    if (!this.games[roomId]) this.initGame(roomId);
    this.games[roomId].state = state;
  }

  incrementCycle(roomId) {
    if (!this.games[roomId]) return;
    this.games[roomId].cycle += 1;
  }

  isGameOver(roomId) {
    if (!this.games[roomId]) return false;
    return this.games[roomId].cycle > this.games[roomId].maxCycles;
  }

  resetGame(roomId) {
    if (this.games[roomId]) {
      this.games[roomId].cycle = 1;
      this.games[roomId].state = "LOBBY";
    }
  }

  deleteGame(roomId) {
    delete this.games[roomId];
  }
}

export default new GameManager();
