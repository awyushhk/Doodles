class RoomManager {
  constructor() {
    // { roomId: [ { id, username, avatar, score, guessed: false } ] }
    this.rooms = {};
  }

  joinRoom(roomId, player) {
    if (!this.rooms[roomId]) {
      this.rooms[roomId] = [];
    }

    // Remove old entry if reconnecting from same socket ID
    this.rooms[roomId] = this.rooms[roomId].filter((p) => p.id !== player.id);
    
    const newPlayer = {
      ...player,
      score: 0,
      guessed: false,
    };
    
    this.rooms[roomId].push(newPlayer);
    return this.rooms[roomId];
  }

  leaveRoom(roomId, socketId) {
    if (!this.rooms[roomId]) return null;

    this.rooms[roomId] = this.rooms[roomId].filter((p) => p.id !== socketId);
    
    if (this.rooms[roomId].length === 0) {
      delete this.rooms[roomId]; // Cleanup empty rooms
      return [];
    }

    return this.rooms[roomId];
  }

  getPlayers(roomId) {
    return this.rooms[roomId] || [];
  }

  getPlayer(roomId, socketId) {
    const players = this.getPlayers(roomId);
    return players.find(p => p.id === socketId);
  }

  removePlayerFromAllRooms(socketId) {
    const affectedRooms = [];
    for (const roomId in this.rooms) {
      const before = this.rooms[roomId].length;
      this.rooms[roomId] = this.rooms[roomId].filter((p) => p.id !== socketId);
      
      if (this.rooms[roomId].length !== before) {
        affectedRooms.push({ roomId, remainingPlayers: this.rooms[roomId] });
        if (this.rooms[roomId].length === 0) {
          delete this.rooms[roomId]; // Cleanup
        }
      }
    }
    return affectedRooms;
  }
}

export default new RoomManager();
