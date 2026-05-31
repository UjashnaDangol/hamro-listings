import visitRequest from "../models/visitModel.js";
import Listing from "../models/listingModel.js";

// CREATE VISIT REQUEST
export const createVisit = async (req, res) => {
  try {
    const { visitDate, message } = req.body;

    const listing = await Listing.findById(req.params.id);

    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    const visit = await VisitRequest.create({
      user: req.user._id,
      listing: req.params.id,
      owner: listing.owner,
      visitDate,
      message,
    });

    res.status(201).json({
      success: true,
      data: visit,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET VISITS (USER OR OWNER)
export const getVisits = async (req, res) => {
  try {
    let visits;

    if (req.user.role === "landlord") {
      visits = await VisitRequest.find({
        owner: req.user._id,
      })
        .populate("user", "name email")
        .populate("listing", "title city price");
    } else {
      visits = await VisitRequest.find({
        user: req.user._id,
      })
        .populate("listing", "title city price")
        .populate("owner", "name email");
    }

    res.json({
      success: true,
      data: visits,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE STATUS (LANDLORD ONLY)
export const updateVisitStatus = async (req, res) => {
  try {
    const visit = await VisitRequest.findById(req.params.id);

    if (!visit) {
      return res.status(404).json({ message: "Visit not found" });
    }

    if (visit.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Access denied" });
    }

    visit.status = req.body.status; // accepted / rejected

    await visit.save();

    res.json({
      success: true,
      data: visit,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};