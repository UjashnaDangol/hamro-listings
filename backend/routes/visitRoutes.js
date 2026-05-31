import express from "express";

import {
  createVisit,
  getVisits,
  updateVisitStatus,
} from "../controllers/visitController.js";

import {
  protect,
  authorizeRoles,
} from "../middleware/authMiddleware.js";

const router = express.Router();

// buyer requests visit
router.post(
  "/:id",
  protect,
  authorizeRoles("buyer"),
  createVisit
);

// both buyer & landlord view visits
router.get(
  "/",
  protect,
  getVisits
);

// landlord updates status
router.put(
  "/:id",
  protect,
  authorizeRoles("landlord"),
  updateVisitStatus
);

export default router;