import express from "express";

import {
  startConversation,
  sendMessage,
  getMessages,
  getMyConversations,
} from "../controllers/messageController.js";

import {
  protect,
} from "../middleware/authMiddleware.js";

const router =
  express.Router();

router.post(
  "/start/:id",
  protect,
  startConversation
);

router.post(
  "/send",
  protect,
  sendMessage
);


router.get(
  "/my",
  protect,
  getMyConversations
);


router.get(
  "/:id",
  protect,
  getMessages
);

export default router;