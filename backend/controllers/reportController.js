import Report from "../models/reportModel.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const createReport = asyncHandler(async (req, res) => {
  const { targetType, listingId, userId, reason } = req.body;


  const exists = await Report.findOne({
  reporter: req.user._id,
  listing: listingId,
});

if (exists) {
  return res.status(400).json({
    message: "Already reported",
  });
}

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