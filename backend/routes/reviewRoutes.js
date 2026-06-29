import express from "express";
import { createReview } from "../controllers/reviewController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post(
  "/:id",
  protect,
  createReview
);

export default router;