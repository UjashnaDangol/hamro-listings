import mongoose from "mongoose";
import Conversation from "../models/conversationModel.js";
import Message from "../models/messageModel.js";
import Listing from "../models/listingModel.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { io, onlineUsers } from "../server.js";
import User from "../models/userModel.js";

const messageTemplates = {
  availability:
    "Hello, is this property still available?",

  visit:
    "Hello, I am interested in this property. Can I schedule a visit?",

  negotiable:
    "Hello, is the listed price negotiable?",

  documents:
    "Hello, are ownership documents available for verification?",
};

// start conversation
export const startConversation = asyncHandler(async (req, res) => {
  if (!req.user || !req.user._id) {
    return res.status(401).json({ message: "User not authenticated" });
  }
const listing = await Listing.findById(req.params.listingId);

  if (!listing) {
    return res.status(404).json({ message: "Listing not found" });
  }

  const receiver = listing.contactPerson || listing.owner;

  if (!receiver) {
    return res.status(400).json({
      message: "Listing has no valid owner/contact person",
    });
  }

  const receiverId = receiver._id ? receiver._id : receiver;

  if (!mongoose.Types.ObjectId.isValid(receiverId)) {
    return res.status(400).json({
      message: "Invalid receiver id",
    });
  }

  if (receiverId.toString() === req.user._id.toString()) {
    return res.status(400).json({
      message: "Cannot start conversation with yourself",
    });
  }

  let conversation = await Conversation.findOne({
    listing: listing._id,
    buyer: req.user._id,
    receiver: receiverId,
  });

  if (!conversation) {
    conversation = await Conversation.create({
      listing: listing._id,
      buyer: req.user._id,
      receiver: receiverId,
    });
  }

  res.json({
    success: true,
    data: conversation,
  });
});

//start conversation with template message
export const startConversationWithTemplate =
  asyncHandler(async (req, res) => {
    const listing = await Listing.findById(req.params.id);

    if (!listing) {
      return res.status(404).json({
        message: "Listing not found",
      });
    }

    const receiver =
      listing.contactPerson || listing.owner;

    const receiverId =
      receiver._id || receiver;

    const template =
      messageTemplates[req.body.template];

    if (!template) {
      return res.status(400).json({
        message: "Invalid template",
      });
    }

    let conversation =
      await Conversation.findOne({
        listing: listing._id,
        buyer: req.user._id,
        receiver: receiverId,
      });

    if (!conversation) {
      conversation =
        await Conversation.create({
          listing: listing._id,
          buyer: req.user._id,
          receiver: receiverId,
        });
    }

    const message =
      await Message.create({
        conversation:
          conversation._id,
        listing:
          conversation.listing,
        sender:
          req.user._id,
        receiver:
          receiverId,
        text: template,
        delivered: true,
      });

    conversation.lastMessage =
      template;

    conversation.lastSender =
      req.user._id;

    conversation.receiverUnreadCount =
      (conversation.receiverUnreadCount || 0) +
      1;

    await conversation.save();

    res.status(201).json({
      success: true,
      conversation,
      message,
    });
  });

// send message
export const sendMessage = asyncHandler(async (req, res) => {
  // check auth
  if (!req.user || !req.user._id) {
    return res.status(401).json({
      message: "User not authenticated",
    });
  }

  const { conversationId, text } = req.body;
let attachmentUrl = null;
let attachmentType = null;
let attachmentName = null;

if (req.file) {

  attachmentUrl = req.file.path;

  attachmentName =
    req.file.originalname;

  if (
    req.file.mimetype.startsWith(
      "image/"
    )
  ) {
    attachmentType = "image";
  } else if (
    req.file.mimetype ===
    "application/pdf"
  ) {
    attachmentType = "pdf";
  } else {
    attachmentType = "file";
  }
}

  // debug request body
  console.log("conversationId:", conversationId);
  console.log("text:", text);

  // validate mongo id
  if (!mongoose.Types.ObjectId.isValid(conversationId)) {
    return res.status(400).json({
      message: "Invalid conversation id",
    });
  }

  // find conversation
  const conversation =
    await Conversation.findById(
      conversationId
    );

  // debug DB result
  console.log(
    "conversation found:",
    conversation
  );

  if (!conversation) {
    return res.status(404).json({
      message:
        "Conversation not found",
    });
  }

  // debug fields
  console.log(
    "buyer:",
    conversation.buyer
  );

  console.log(
    "receiver:",
    conversation.receiver
  );

  // validate fields
  if (
    !conversation.buyer ||
    !conversation.receiver
  ) {
    return res.status(400).json({
      message:
        "Conversation is corrupted",
    });
  }

  
  // determine receiver
  const receiverId =
    req.user._id.toString() ===
    conversation.buyer.toString()
      ? conversation.receiver
      : conversation.buyer;

  // create message

  if (
  !text &&
  !attachmentUrl
) {
  return res.status(400).json({
    message:
      "Message or attachment required",
  });
}

  const message =
    await Message.create({
      conversation:
        conversation._id,
      listing:
        conversation.listing,
      sender:
        req.user._id,
      receiver:
        receiverId,
      text,attachmentUrl,

    attachmentType,

    attachmentName,

      delivered: true,
    });

  // update metadata
  conversation.lastMessage =
    text;

  conversation.lastSender =
    req.user._id;

if (
  receiverId.toString() ===
  conversation.receiver.toString()
) {
  conversation.receiverUnreadCount += 1;
} else {
  conversation.buyerUnreadCount += 1;
}

  await conversation.save();

  res.status(201).json({
    success: true,
    data: message,
  });
});

// get chat history
export const getMessages = asyncHandler(async (req, res) => {
  const rawConversationId = req.params.conversationId;
  const conversationId =
    typeof rawConversationId === "string"
      ? rawConversationId.trim()
      : rawConversationId;

  console.log("getMessages rawConversationId:", rawConversationId);
  console.log("getMessages normalizedConversationId:", conversationId);
  console.log(
    "getMessages validObjectId:",
    mongoose.isValidObjectId(conversationId)
  );

  if (!mongoose.isValidObjectId(conversationId)) {
    return res.status(400).json({
      message: "Invalid conversation id",
    });
  }

  const conversation =
    await Conversation.findById(
      conversationId
    );

  if (!conversation) {
    return res.status(404).json({
      message: "Conversation not found",
    });
  }

  // Authorization check
  if (
    conversation.buyer.toString() !==
      req.user._id.toString() &&
    conversation.receiver.toString() !==
      req.user._id.toString()
  ) {
    return res.status(403).json({
      message: "Not authorized",
    });
  }

  const messages = await Message.find({
    conversation: conversationId,
  })
    .populate("sender", "name avatar")
    .sort("createdAt");

  res.json({
    success: true,
    data: messages,
  });
});

// get my conversations
export const getMyConversations = asyncHandler(async (req, res) => {
  if (!req.user || !req.user._id) {
    return res.status(401).json({ message: "User not authenticated" });
  }

  const conversations = await Conversation.find({
    $or: [
      { buyer: req.user._id },
      { receiver: req.user._id },
    ],
  })
    .populate("listing", "title price media")
    .populate("buyer", "name avatar")
    .populate("receiver", "name avatar")
    .sort("-updatedAt");

  res.json({
    success: true,
    data: conversations,
  });
});

// mark as read
export const markAsRead = asyncHandler(async (req, res) => {
  const conversationId = req.params.conversationId;

  const conversation = await Conversation.findById(conversationId);

  if (!conversation) {
    return res.status(404).json({ message: "Conversation not found" });
  }

  await Message.updateMany(
    {
      conversation: conversationId,
      receiver: req.user._id,
      read: false,
    },
    {
      read: true,
    }
  );

  if (conversation.receiver.toString() === req.user._id.toString()) {
    conversation.receiverUnreadCount = 0;
  } else {
    conversation.buyerUnreadCount = 0;
  }

  await conversation.save();

  const senderId = conversation.lastSender?.toString();
  const senderSocketId = senderId ? onlineUsers.get(senderId) : null;

  if (senderSocketId) {
    io.to(senderSocketId).emit("messageSeen", { conversationId });
  }

  res.json({
    success: true,
    message: "Messages marked as read",
  });
});

export const getUserStatus =
  asyncHandler(
    async (req, res) => {

      const user =
        await User.findById(
          req.params.id
        );

      if (!user) {
        return res
          .status(404)
          .json({
            message:
              "User not found",
          });
      }

      const isOnline =
        onlineUsers.has(
          user._id.toString()
        );

      const lastSeen =
        user.lastSeen ?? null;

      res.json({
        online: isOnline,
        lastSeen,
      });
    }
  );