import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

const roomPlayers = {}; // { roomId: [{ id, username, avatar, score }] }

io.on("connection", (socket) => {

  socket.on("player_joined", ({ username, room, avatar }) => {
    socket.join(room);

    if (!roomPlayers[room]) roomPlayers[room] = [];

    // Remove old entry if reconnecting
    roomPlayers[room] = roomPlayers[room].filter((p) => p.id !== socket.id);
    roomPlayers[room].push({ id: socket.id, username, avatar, score: 0 });

    io.to(room).emit("update_players", roomPlayers[room]);
  });

  socket.on("disconnect", () => {
    for (const room in roomPlayers) {
      const before = roomPlayers[room].length;
      roomPlayers[room] = roomPlayers[room].filter((p) => p.id !== socket.id);
      // Only re-emit if someone was actually removed
      if (roomPlayers[room].length !== before) {
        io.to(room).emit("update_players", roomPlayers[room]);
      }
    }
  });

  socket.on("message_from_client", (data) => {
    io.to(data.room).emit("message_from_server", data);
  });

  socket.on("draw", (data) => {
    socket.to(data.room).emit("draw_from_server", data);
  });
});

httpServer.listen(5000, () => console.log("Server is running..."));