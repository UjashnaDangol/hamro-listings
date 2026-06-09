import express from "express";
import {
  createVisit,
  getMyVisits,
  getReceivedVisits,
  updateVisitStatus,
  rescheduleVisit,
  cancelVisit
} from "../controllers/visitController.js";

import {
  protect,
  authorizeRoles,
} from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/:id", createVisit);
router.get("/my", getMyVisits);
router.get("/received", getReceivedVisits);
router.put("/:id/status", updateVisitStatus);
router.put("/:id/reschedule", rescheduleVisit);
router.put("/:id/cancel", cancelVisit);

export default router;

router.post(
  "/:id",
  protect,
  authorizeRoles("buyer"),
  createVisit
);

router.get(
  "/my",
  protect,
  authorizeRoles("buyer"),
  getMyVisits
);

router.get(
  "/received",
  protect,
  authorizeRoles("owner", "agent"),
  getReceivedVisits
);

router.patch(
  "/:id/status",
  protect,
  authorizeRoles("owner", "agent"),
  updateVisitStatus
);

router.patch(
  "/:id/reschedule",
  protect,
  authorizeRoles("buyer"),
  rescheduleVisit
);

router.patch(
  "/:id/cancel",
  protect,
  cancelVisit
);