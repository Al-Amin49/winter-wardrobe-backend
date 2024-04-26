import { Donate } from "../models/donate.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

/*-------------------
@desc     Add a new donation
@route    POST /api/v1/donates
@access   private
*/
const addDonate = asyncHandler(async (req, res) => {
  const { userId, clotheId, quantity } = req.body;

  // Validate request body
  // if (!userId || !clotheId || !quantity) {
  //   throw new ApiError("All fields are required", 400);
  // }

  const newDonation = await Donate.create({
    userId,
    clotheId,
    quantity,
  });

  res
    .status(201)
    .json(new ApiResponse(200, newDonation, "Donation added successfully"));
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

const getSingleDonate = asyncHandler(async (req, res) => {
  const singleGetDonate = await Donate.findById(req.params.id)
    .populate("userId", "username")
    .populate("clotheId", "title");

  if (!singleGetDonate) {
    throw new ApiError(404, "Donate not found");
  }

  res
    .status(200)
    .json(
      new ApiResponse(200, singleGetDonate, "Single donate get successufully")
    );
});

export const donateControllers = {
  addDonate,
  getWhoMostDonate,
  getSingleDonate,
};
