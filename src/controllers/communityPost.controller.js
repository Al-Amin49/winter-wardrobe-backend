import { CommunityPost } from "../models/communityPost.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiResponse} from '../utils/ApiResponse.js';

/*-------------------
@desc     Add a new community
@route    POST /api/v1/communities
@access   private
*/
/* The `addCommunityPost` function is a controller function that handles the logic for adding a new
community post. Here is a breakdown of what it does: */
const addCommunityPost = asyncHandler(async (req, res) => {
  const { content } = req.body;
  const userId= req.user._id;
  console.log(userId)

  if (!content) {
    throw new ApiError(400, "content are required");
  }
  const newCommunity = await CommunityPost.create({
    author: userId,
    content,
  });
  res
    .status(201)
    .json(
      new ApiResponse(200, newCommunity, "add community post successfully")
    );
});

/*-------------------
@desc     get all community by id
@route    GET /api/v1/communities/:id
@access   Public
*/
const getSinglePost= asyncHandler(async(req, res)=>{
  const singlePost = await CommunityPost.findById(req.params.id)
  .populate("author", "username profile")
  if (!singlePost) {
    throw new ApiError(404, "Post not found");
  }
  res
    .status(200)
    .json(new ApiResponse(200, singlePost, "Single Post fetched Succesfully"));

})
/*-------------------
@desc     get all community
@route    GET /api/v1/communities
@access   Public
*/

const getAllCommunityPost = asyncHandler(async (req, res) => {
  const communitiesPost = await CommunityPost.find()
    .populate("author", "username profile")
    .sort({ createdAt: -1 })
    .exec();
  res
    .status(200)
    .json(
      new ApiResponse(200, communitiesPost, "All communities fetched successfully")
    );
});

export const communiPostController={
    addCommunityPost,
    getAllCommunityPost,
    getSinglePost
}
