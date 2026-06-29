import User from "../models/userModel.js";
import Listing from "../models/listingModel.js";
import Report from "../models/reportModel.js";
import { updateAgentStats } from "../utils/updateAgents.js";
import { asyncHandler } from "../utils/asyncHandler.js";



export const updateListingStatus = asyncHandler( async (req,res) =>
{
    const {status} = req.body

    const listing = await Listing.findById(req.params.id)

    if(!listing){
        return res.status(404).json({
            message:"Listing not found",
        })
    }

    const previousStatus = listing.status; 

    listing.status = status ;
    await listing.save()

     if (previousStatus !== "sold" && status === "sold") {
    const agentId = listing.agent || listing.owner;

    if (agentId) {
      await updateAgentStats({
        agentId,
        saleValue: listing.price,
        commissionRate: 2,
      });
    }
  }

    res.json({
        success:true ,
        data : listing ,
    })

})
// Block / Unblock User
export const blockUser = asyncHandler(async (req, res) => {
  const { status } = req.body;

  if (!["blocked", "active"].includes(status)) {
    return res.status(400).json({
      message: "Invalid status",
    });
  }

  const user = await User.findById(req.params.id);

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  user.status = status;
  await user.save();

  res.json({
    success: true,
    message: `User ${status === "blocked" ? "blocked" : "unblocked"}`,
    data: user,
  });
});


export const resolveReport = asyncHandler(async (req, res) => {
  const report = await Report.findById(req.params.id);

  if (!report) {
    return res.status(404).json({
      message: "Report not found",
    });
  }

if (report.targetType === "listing" && report.listing) {
  await Listing.findByIdAndDelete(report.listing);
}
  if(report.targetType === "user") {
    await User.findByIdAndUpdate(report.user, {
      status: "blocked",
    });
  }

  report.status = "resolved";
  await report.save();

  res.json({
    success: true,
    message: "Report resolved and action taken",
    data: report,
  });
});

export const verifyAgent =
  asyncHandler(async (req, res) => {

    const agent =
      await User.findById(
        req.params.id
      );

    if (!agent) {
      return res.status(404).json({
        message: "Agent not found",
      });
    }

    if (agent.role !== "agent") {
      return res.status(400).json({
        message: "User is not an agent",
      });
    }

    agent.agentProfile.verificationStatus = "verified";

    await agent.save();

    res.json({
      success: true,
      message: "Agent verified",
    });
});
  

export const getReports = asyncHandler(async(req,res)=>{
  const reports = await Report.find()
    .populate("reporter","name email")
    .populate("listing","title")
    .populate("user","name email")
    .sort("-createdAt");

  res.json({
    success:true,
    data:reports,
  });
});



export const getUsers =
  asyncHandler(async(req,res)=>{

    const users =
      await User.find()
        .select("-password");

    res.json({
      success:true,
      data:users,
    });

});

export const getAllListings = asyncHandler(async (req, res) => {
  const listings = await Listing.find().populate(
    "owner",
    "name email"
  );

  res.json({
    success: true,
    data: listings,
  });
});