import { Clothe } from "../models/clothes.model.js";
import { Donate } from "../models/donate.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

/*-------------------
@desc     Add a new donation
@route    POST /api/v1/donates
@access   private
*/
const addDonate = asyncHandler(async (req, res) => {
  // Get the donation data from the request body
  const { email, quantity, clotheId } = req.body;

  // Ensure userId is taken from authenticated user
  const userId = req.user._id;

  // Validate that the clothe exists
  const clothe = await Clothe.findById(clotheId);
  if (!clothe) {
    throw new ApiError("Clothe not found", 404);
  }

  // Create the new donation with correct userId and clotheId
  const newDonation = await Donate.create({
    email,
    userId, 
    clotheId, 
    quantity
  });

  res.status(201).json(new ApiResponse(200, newDonation, "Donation added successfully"));
});

/*-------------------
@desc     Get user donation history by email
@route    GET /api/v1/donate/user/:email
@access   Private
*/
const getUserDonationsByEmail = asyncHandler(async (req, res) => {
  const { email } = req.params;

  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError("User not found", 404);
  }

  const donations = await Donate.find({ userId: user._id })
    .populate("userId", "username profile")
    .populate("clotheId", "title category")
    .sort({ createdAt: -1 });

  if (donations.length === 0) {
    throw new ApiError("No donations found for this user", 404);
  }

  res.status(200).json(new ApiResponse(200, donations, "User donation history fetched successfully"));
});
/*-------------------
@desc     Get the user who donated the most
@route    GET /api/v1/donates/leaderboard
@access   Public
*/
const getWhoMostDonate = asyncHandler(async (req, res) => {
  const leaderboard = await Donate.aggregate([
    {
      $group: {
        _id: "$userId",
        totalDonations: { $sum: "$quantity" }, 
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "_id",
        foreignField: "_id",
        as: "user",
      },
    },
    {
      $unwind: "$user", // Deconstruct the user array
    },
    {
      $project: {
        rank: { $add: [{ $indexOfArray: ["$userId", "$_id"] }, 2] },
        username: "$user.username",
        profile: "$user.profile",
        totalDonations: 1, // Keep totalDonations field
      },
    },
    {
      $sort: { totalDonations: -1 }, // Sort by total donations in descending order
    },
  ]);

  // If there are users with donations, format the data for leaderboard
  if (leaderboard.length > 0) {
    res
      .status(200)
      .json(
        new ApiResponse(200, leaderboard, "Leaderboard fetched successfully")
      );
  } else {
    throw new ApiError("No donations found", 404);
  }
});


/*-------------------
@desc     Get donation statistics by category
@route    GET /api/v1/donates/stats/categories
@access   Public
*/
const getDonationsByCategory = asyncHandler(async (req, res) => {
  const stats = await Donate.aggregate([
    {
      $lookup: {
        from: "clothes",
        localField: "clotheId",
        foreignField: "_id",
        as: "clothe",
      },
    },
    {
      $unwind: "$clothe",
    },
    {
      $group: {
        _id: "$clothe.category",
        totalDonations: { $sum: "$quantity" },
      },
    },
    {
      $sort: { totalDonations: -1 },
    },
  ]);

  if (stats.length > 0) {
    res.status(200).json(new ApiResponse(200, stats, "Donation stats by category fetched successfully"));
  } else {
    throw new ApiError("No donations found", 404);
  }
});

/*-------------------
@desc     Get recent donations
@route    GET /api/v1/donate/recent
@access   Public
*/
const getRecentDonations = asyncHandler(async (req, res) => {
  const recentDonations = await Donate.find({})
    .populate("userId", "username profile")
    .populate("clotheId", "title category")
    .sort({ createdAt: -1 }) // Sort by most recent
    .limit(5); // Limit the number of results (e.g., 5 recent donations)

  if (recentDonations.length > 0) {
    res
      .status(200)
      .json(new ApiResponse(200, recentDonations, "Recent donations fetched successfully"));
  } else {
    throw new ApiError("No donations found", 404);
  }
});

/*-------------------
@desc     Get all donations
@route    GET /api/v1/donates
@access   Public
*/
const getAllDonations = asyncHandler(async (req, res) => {
  const donations = await Donate.find({})
    .populate("userId", "username profile")
    .populate("clotheId", "title category")
    .sort({ createdAt: -1 }); // Sort by most recent donations first

  if (donations.length > 0) {
    res
      .status(200)
      .json(new ApiResponse(200, donations,"All donations fetched successfully"));
  } else {
    throw new ApiError("No donations found", 404);
  }
});
export const donateControllers = {
  addDonate,
  getWhoMostDonate,
  getDonationsByCategory,
  getRecentDonations,
  getAllDonations,
  getUserDonationsByEmail

};
