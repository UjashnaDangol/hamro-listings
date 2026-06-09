import express from "express";
import upload from "../middleware/uploadMiddleware.js";

import {
  startConversation,
  sendMessage,
  getMessages,
  getMyConversations,
  markAsRead,
  startConversationWithTemplate,
  
} from "../controllers/messageController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();


// START CONVERSATION (BUYER → OWNER)
router.post(
  "/start/:listingId",
  protect,
  startConversation
);

router.post(
  "/start-template/:id",
  protect,
  startConversationWithTemplate
);
// SEND MESSAGE
router.post(
  "/send",
  protect, upload.single("file"),
  sendMessage
);


// GET MY CONVERSATIONS
router.get(
  "/my",
  protect,
  getMyConversations
);


// MARK AS READ
router.patch(
  "/read/:conversationId",
  protect,
  markAsRead
);


// GET MESSAGES OF A CONVERSATION (MUST BE LAST)
router.get(
  "/:conversationId",
  protect,
  getMessages
);

export default router;