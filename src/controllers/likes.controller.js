import { CommunityPost } from "../models/communityPost.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

/*-------------------
@desc     Like or Unlike a community post
@route    POST /api/v1/communities/:postId/like
@access   Private
*/
const toggleLike = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const postId = req.params.postId;
  
    const communityPost = await CommunityPost.findById(postId);
  
    if (!communityPost) {
      throw new ApiError(404, "Community post not found");
    }
  
    // Check if the user has already liked the post
    const alreadyLikedIndex = communityPost.likedBy.indexOf(userId);
  
    if (alreadyLikedIndex === -1) {
      // If user hasn't liked the post, like it
      communityPost.likedBy.push(userId);
      communityPost.likes++;
    } else {
      // If user has already liked the post, unlike it
      communityPost.likedBy.splice(alreadyLikedIndex, 1);
      communityPost.likes--;
    }
  
    await communityPost.save();
  
    res.status(200).json(new ApiResponse(200, communityPost, "Post like toggled successfully"));
  });
  
  /*-------------------
@desc     Get all likes for a community post
@route    GET /api/v1/communities/:postId/likes
@access   Public
*/

  const getAllLikes = asyncHandler(async (req, res) => {
    const postId = req.params.postId;
  
    const communityPost = await CommunityPost.findById(postId).populate("likedBy", "username profile");
  
    if (!communityPost) {
      throw new ApiError(404, "Community post not found");
    }
  
    const likes = communityPost.likedBy;
    res.status(200).json(new ApiResponse(200, likes, "All likes for this post"));
  });
  export const likeController = {
    toggleLike,
    getAllLikes
  };
  