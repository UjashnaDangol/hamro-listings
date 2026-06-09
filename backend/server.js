import http from "http";
import { Server } from "socket.io";
import app from "./app.js";
import {connectDB} from "./config/db.js";
import dotenv from "dotenv";

dotenv.config();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

const onlineUsers = new Map();

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // Add user
  socket.on("addUser", (userId) => {
    onlineUsers.set(userId, socket.id);
    console.log("Online Users:", onlineUsers);
  });

  // Send message
  socket.on("sendMessage", ({ receiverId, message }) => {
    const receiverSocketId = onlineUsers.get(receiverId);

    if (receiverSocketId) {
      io.to(receiverSocketId).emit("getMessage", message);
    }
  });

  // Typing
  socket.on("typing", ({ receiverId }) => {
    const receiverSocketId = onlineUsers.get(receiverId);

    if (receiverSocketId) {
      io.to(receiverSocketId).emit("typing");
    }
  });

  // Stop typing
  socket.on("stopTyping", ({ receiverId }) => {
    const receiverSocketId = onlineUsers.get(receiverId);

    if (receiverSocketId) {
      io.to(receiverSocketId).emit("stopTyping");
    }
  });

  // Disconnect
  socket.on("disconnect", () => {
    for (const [userId, socketId] of onlineUsers.entries()) {
      if (socketId === socket.id) {
        onlineUsers.delete(userId);
        break;
      }
    }

    console.log("User disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export { io };
connectDB();