import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const httpServer = createServer(app);

const PORT = process.env.PORT || 5000;

const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "../frontend/dist")));

app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
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

httpServer.listen(PORT, () => console.log(`Server is running on port ${PORT}...`));
