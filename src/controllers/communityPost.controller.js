import { CommunityPost } from "../models/communityPost.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiResponse} from '../utils/ApiResponse.js';

/*-------------------
@desc     Add a new community
@route    POST /api/v1/communities
@access   private
*/
const addCommunityPost = asyncHandler(async (req, res) => {
  const { author, content } = req.body;

  if (!author || !content) {
    throw new ApiError(400, "All fields are required");
  }
  const newCommunity = await CommunityPost.create({
    author,
    content,
  });
  res
    .status(201)
    .json(
      new ApiResponse(200, newCommunity, "add community post successfully")
    );
});
/*-------------------
@desc     get all community
@route    GET /api/v1/communities
@access   Public
*/

const getAllCommunityPost = asyncHandler(async (req, res) => {
  const communitiesPost = await CommunityPost.find()
    .populate("author", "username profile")
    .exec();
  res
    .status(200)
    .json(
      new ApiResponse(200, communitiesPost, "All communities fetched successfully")
    );
});

export const communiPostController={
    addCommunityPost,
    getAllCommunityPost
}
