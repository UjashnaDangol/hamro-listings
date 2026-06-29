import Report from "../models/reportModel.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const createReport = asyncHandler(async (req, res) => {
  const { targetType, listingId, userId, reason } = req.body;

  const report = await Report.create({
    reporter: req.user._id,
    targetType,
    listing: listingId || null,
    user: userId || null,
    reason,
  });

  res.status(201).json({
    success: true,
    data: report,
  });
});