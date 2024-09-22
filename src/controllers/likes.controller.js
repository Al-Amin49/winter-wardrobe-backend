import { CommunityPost } from "../models/communityPost.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

/*-------------------
@desc     Like or Unlike a community post
@route    POST /api/v1/communities/:postId/like
@access   Private
*/
/* This `toggleLike` function is responsible for toggling the like status of a community post. Here's a
breakdown of what it does: */
const toggleLike = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const postId = req.params.postId;

  const communityPost = await CommunityPost.findById(postId);

  if (!communityPost) {
    throw new ApiError(404, "Community post not found");
  }

  // Check if the user has already liked the post
  const hasLiked = communityPost.likedBy.includes(userId);
  
  if (!hasLiked) {
    // Like the post
    await CommunityPost.findByIdAndUpdate(
      postId,
      {
        $addToSet: { likedBy: userId },
        $inc: { likes: 1 }
      },
      { new: true }
    );
  } else {
    // Unlike the post
    await CommunityPost.findByIdAndUpdate(
      postId,
      {
        $pull: { likedBy: userId },
        $inc: { likes: -1 }
      },
      { new: true }
    );
  }

  const updatedPost = await CommunityPost.findById(postId);
  res.status(200).json(new ApiResponse(200, updatedPost, "Post like toggled successfully"));
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
  