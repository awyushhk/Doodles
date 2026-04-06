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

io.on("connection", (socket) => {
  socket.on("message_from_client", (data) => {
    io.to(data.room).emit("message_from_server", data);
  });

  socket.on("join_room", (data) => {
    socket.join(data);
  });

  socket.on("draw", (data) => {
    socket.to(data.room).emit("draw_from_server", data);
  });
});

httpServer.listen(5000, () => {
  console.log("Server is running...");
});
