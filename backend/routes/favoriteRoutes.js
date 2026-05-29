import express from "express";

import {
  addFavorite,
  getFavorites,
  removeFavorite,
} from "../controllers/favoriteController.js";

import {
  protect,
  authorizeRoles,
} from "../middleware/authMiddleware.js";

const router =
  express.Router();

router.post(
  "/:id",
  protect,
  authorizeRoles("buyer"),
  addFavorite
);

router.get(
  "/",
  protect,
  authorizeRoles("buyer"),
  getFavorites
);

router.delete(
  "/:id",
  protect,
  authorizeRoles("buyer"),
  removeFavorite
);

export default router;