import http from "http";
import { Server } from "socket.io";
import app from "./app.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import User from "./models/userModel.js";
import Message from "./models/messageModel.js";
import Conversation from "./models/conversationModel.js";
import jwt from "jsonwebtoken";

dotenv.config();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

const onlineUsers = new Map();

/**
 * SOCKET CONNECTION
 */
io.on("connection", async(socket) => {
  console.log("User connected:", socket.id);

  const token = socket.handshake.auth?.token;

if (!token) {
  socket.disconnect();
  return;
}

let decoded;

try {
  decoded = jwt.verify(token, process.env.JWT_SECRET);
} catch (err) {
  socket.disconnect();
  return;
}

const userId = decoded.id;

if (!userId) {
  socket.disconnect();
  return;
}

  /**
   * ADD USER (ONLINE)
   */
  onlineUsers.set(userId, socket.id);
  io.emit("userOnline", userId);

socket.userId = userId;

  /**
   * SEND MESSAGE
   */
socket.on("sendMessage", async ({ conversationId, text }) => {
  try {
    const conversation = await Conversation.findById(conversationId);

    if (!conversation) return;

    // 🔐 safety check (IMPORTANT)
    if (
      conversation.buyer.toString() !== socket.userId &&
      conversation.receiver.toString() !== socket.userId
    ) {
      return;
    }

    const receiverId =
      conversation.buyer.toString() === socket.userId
        ? conversation.receiver
        : conversation.buyer;

    const newMessage = await Message.create({
      conversation: conversationId,
      listing: conversation.listing,
      sender: socket.userId,
      receiver: receiverId,
      text,
      delivered: true,
    });

    // update conversation
    conversation.lastMessage = text;
    conversation.lastSender = socket.userId;

    if (receiverId.toString() === conversation.receiver.toString()) {
      conversation.receiverUnreadCount += 1;
    } else {
      conversation.buyerUnreadCount += 1;
    }

    await conversation.save();

    // send to receiver
    const receiverSocketId = onlineUsers.get(receiverId.toString());

    if (receiverSocketId) {
      io.to(receiverSocketId).emit("getMessage", newMessage);
    }

    // confirm to sender
    socket.emit("messageDelivered", {
      messageId: newMessage._id,
      deliveredAt: new Date(),
    });
  } catch (err) {
    console.log("socket sendMessage error:", err.message);
  }
});

  /**
   * TYPING
   */
  socket.on("typing", ({ receiverId }) => {
    const receiverSocketId = onlineUsers.get(receiverId);

    if (receiverSocketId) {
      io.to(receiverSocketId).emit("typing");
    }
  });

  /**
   * STOP TYPING
   */
  socket.on("stopTyping", ({ receiverId }) => {
    const receiverSocketId = onlineUsers.get(receiverId);

    if (receiverSocketId) {
      io.to(receiverSocketId).emit("stopTyping");
    }
  });

  /**
   * MESSAGE SEEN
   */
  socket.on("messageSeen", ({ senderId, messageId }) => {
    try {
      const senderSocketId = onlineUsers.get(senderId);

      if (senderSocketId) {
        io.to(senderSocketId).emit("messageSeen", {
          messageId,
          seenAt: new Date(),
        });
      }
    } catch (err) {
      console.log("messageSeen error:", err.message);
    }
  });

  /**
   * DISCONNECT
   */
  socket.on("disconnect", async () => {
    try {
      let disconnectedUserId = null;

      for (const [userId, socketId] of onlineUsers.entries()) {
        if (socketId === socket.id) {
          disconnectedUserId = userId;
          onlineUsers.delete(userId);
          break;
        }
      }

      if (disconnectedUserId) {
        await User.findByIdAndUpdate(disconnectedUserId, {
          lastSeen: new Date(),
        });

        io.emit("userOffline", disconnectedUserId);
      }

      console.log("User disconnected:", socket.id);
    } catch (err) {
      console.log("disconnect error:", err.message);
    }
  });
});

/**
 * START SERVER
 */
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

/**
 * EXPORTS
 */
export { io, onlineUsers };

connectDB();