import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";

import app from "./app.js";
import { connectDB } from "./config/db.js";

dotenv.config();


connectDB();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});


const onlineUsers = new Map();


io.on("connection", (socket) => {
  console.log("User connected:", socket.id);


  socket.on("addUser", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("sendMessage", ({ senderId, receiverId, message }) => {
    const receiverSocketId = onlineUsers.get(receiverId);

    if (receiverSocketId) {
      io.to(receiverSocketId).emit("getMessage", {
        senderId,
        message,
        createdAt: new Date(),
      });
    }
  });

  socket.on("disconnect", () => {
    for (let [userId, socketId] of onlineUsers) {
      if (socketId === socket.id) {
        onlineUsers.delete(userId);
        break;
      }
    }
  });
});

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});