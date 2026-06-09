import Visit from "../models/visitModel.js";
import Listing from "../models/listingModel.js";
import { asyncHandler } from "../utils/asyncHandler.js";


export const createVisit = asyncHandler(async (req, res) => {
  const { visitDate, visitTime, message } = req.body;

  const listing = await Listing.findById(req.params.id);

  if (!listing) {
    return res.status(404).json({
      message: "Listing not found",
    });
  }

  const visit = await Visit.create({
    buyer: req.user._id,
    listing: listing._id,
    assignedTo: listing.contactPerson || listing.owner,
    visitDate,
    visitTime,
    message,
  });

  res.status(201).json({
    success: true,
    data: visit,
  });
});

export const getMyVisits = asyncHandler(async (req, res) => {
  const visits = await Visit.find({
    buyer: req.user._id,
  })
    .populate("listing", "title price media location")
    .populate("assignedTo", "name email")
    .sort("-createdAt");

  res.json({
    success: true,
    data: visits,
  });
});

export const getReceivedVisits = asyncHandler(async (req, res) => {
  const visits = await Visit.find({
    assignedTo: req.user._id,
  })
    .populate("listing", "title price media")
    .populate("buyer", "name email phone")
    .sort("-createdAt");

  res.json({
    success: true,
    data: visits,
  });
});

export const updateVisitStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;

  const visit = await Visit.findById(req.params.id);

  if (!visit) {
    return res.status(404).json({
      message: "Visit not found",
    });
  }

  if (
    visit.assignedTo.toString() !== req.user._id.toString()
  ) {
    return res.status(403).json({
      message: "Not authorized",
    });
  }

  visit.status = status;
  await visit.save();

  res.json({
    success: true,
    data: visit,
  });
});

export const rescheduleVisit = asyncHandler(async (req, res) => {
  const { visitDate, visitTime } = req.body;

  const visit = await Visit.findById(req.params.id);

  if (!visit) {
    return res.status(404).json({
      message: "Visit not found",
    });
  }

  if (visit.buyer.toString() !== req.user._id.toString()) {
    return res.status(403).json({
      message: "Not authorized",
    });
  }

  visit.visitDate = visitDate;
  visit.visitTime = visitTime;
  visit.status = "pending";

  await visit.save();

  res.json({
    success: true,
    data: visit,
  });
});

export const cancelVisit = asyncHandler(async (req, res) => {
  const visit = await Visit.findById(req.params.id);

  if (!visit) {
    return res.status(404).json({
      message: "Visit not found",
    });
  }

  if (
    visit.buyer.toString() !== req.user._id.toString() &&
    visit.assignedTo.toString() !== req.user._id.toString()
  ) {
    return res.status(403).json({
      message: "Not authorized",
    });
  }

  visit.status = "cancelled";
  await visit.save();

  res.json({
    success: true,
    message: "Visit cancelled",
  });
});