import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import path from "path";
import { fileURLToPath } from "url";

// Managers
import roomManager from "./roomManager.js";
import gameManager from "./gameManager.js";
import turnManager from "./turnManager.js";

const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, "../frontend/dist")));

app.get(/.*/, (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/dist/index.html"));
});

io.on("connection", (socket) => {

  socket.on("player_joined", ({ username, room, avatar }) => {
    socket.join(room);

    // Save mapping on socket object since we need to know what room a socket is in on disconnect
    socket.roomId = room;

    const players = roomManager.joinRoom(room, {
      id: socket.id,
      username,
      avatar
    });

    // Notify room of player list
    io.to(room).emit("update_players", players);

    // Send current game state to new player
    socket.emit("game_state_update", gameManager.getGameState(room));
    
    const turnState = turnManager.getTurnState(room);
    if (turnState) {
       // if they joined mid-turn, sync timer
       socket.emit("timer_update", turnState.timeRemaining);
       
       // Send whoever is drawing
       const activeDrawer = players[turnState.drawerIndex];
       if (activeDrawer) {
          socket.emit("round_started", {
            drawerId: activeDrawer.id,
            state: gameManager.getGameState(room),
            cycle: gameManager.getGameState(room).cycle
          });
          
          if (turnState.activeWord) {
             socket.emit("word_selected", { wordLength: turnState.activeWord.length });
          }
       }
    }
  });

  socket.on("start_game", () => {
    const room = socket.roomId;
    if (!room) return;

    if (gameManager.getGameState(room).state === "LOBBY") {
       turnManager.startNextTurn(io, room);
    }
  });

  socket.on("word_selected", (word) => {
    const room = socket.roomId;
    if (!room) return;
    
    turnManager.wordSelected(io, room, word);
  });

  socket.on("disconnect", () => {
    // Remove from room map
    const affectedRooms = roomManager.removePlayerFromAllRooms(socket.id);
    
    affectedRooms.forEach(({ roomId, remainingPlayers }) => {
      io.to(roomId).emit("update_players", remainingPlayers);
      turnManager.handlePlayerLeave(io, roomId, socket.id);
    });
  });

  socket.on("message_from_client", (data) => {
    const room = socket.roomId;
    if (!room) return;

    // Check if it's a correct guess!
    const wasMatch = turnManager.handleGuess(io, room, socket, data.message);

    if (!wasMatch) {
       // Standard chat message
       io.to(room).emit("message_from_server", {
         ...data,
         id: socket.id // Ensure we send the socket id so we know who sent it
       });
    }
  });

  socket.on("draw", (data) => {
    socket.to(data.room).emit("draw_from_server", data);
  });

  socket.on("clear_canvas", (data) => {
    socket.to(data.room).emit("clear_canvas");
  });

  socket.on("return_to_lobby", () => {
    const room = socket.roomId;
    if (!room) return;

    // Ensure game is reset to lobby (though endGame already does this)
    gameManager.resetGame(room);

    // Broadcast state update to everyone in the room
    io.to(room).emit("game_state_update", gameManager.getGameState(room));

    // Also send player update to ensure scores look reset (0)
    const players = roomManager.getPlayers(room);
    io.to(room).emit("update_players", players);
  });
});

httpServer.listen(PORT, () => console.log(`Server is running on ${PORT}...`));
