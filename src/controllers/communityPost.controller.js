import { CommunityPost } from "../models/communityPost.model";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

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

const getAllCommunityPost = asyncHandler(async (req, res) => {
  const communitiesPost = await CommunityPost.find()
    .populate("author", "username")
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
