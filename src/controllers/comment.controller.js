
import { CommunityPost } from "../models/communityPost.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from '../utils/ApiResponse.js';

/*-------------------
@desc     Add comment to a community post
@route    POST /api/v1/communities/:postId/comments
@access   Private
*/
const addComment = asyncHandler(async (req, res) => {
    const { content } = req.body;
    const userId = req.user._id;
    const postId = req.params.postId;
  
    if (!content) {
      throw new ApiError(400, "Content is required for comment");
    }
  
    const communityPost = await CommunityPost.findById(postId);
  
    if (!communityPost) {
      throw new ApiError(404, "Community post not found");
    }
  
    const newComment = {
      author: userId,
      content,
    };
  
    communityPost.comments.push(newComment);
    await communityPost.save();
  
    res.status(201).json(new ApiResponse(200, communityPost, "Comment added successfully"));
  });
  
  /*-------------------
  @desc     Get all comments of a community post
  @route    GET /api/v1/communities/:postId/comments
  @access   Public
  */
  const getAllComments = asyncHandler(async (req, res) => {
    const postId = req.params.postId;
  
    const communityPost = await CommunityPost.findById(postId)
    .populate("comments.author", "username profile")
  
    if (!communityPost) {
      throw new ApiError(404, "Community post not found");
    }
  
    const comments = communityPost.comments;
    res.status(200).json(new ApiResponse(200, comments, "All comments fetched successfully"));
  });
  
  /*-------------------
  @desc     Update a comment
  @route    PUT /api/v1/communities/:postId/comments/:commentId
  @access   Private
  */
  const updateComment = asyncHandler(async (req, res) => {
    const { content } = req.body;
    const userId = req.user._id;
    const postId = req.params.postId;
    const commentId = req.params.commentId;
  
    if (!content) {
      throw new ApiError(400, "Content is required for comment");
    }
  
    const communityPost = await CommunityPost.findById(postId);
  
    if (!communityPost) {
      throw new ApiError(404, "Community post not found");
    }
  
    const comment = communityPost.comments.id(commentId);
  
    if (!comment) {
      throw new ApiError(404, "Comment not found");
    }
  
    if (comment.author.toString() !== userId.toString()) {
      throw new ApiError(403, "You are not authorized to update this comment");
    }
  
    comment.content = content;
    await communityPost.save();
  
    res.status(200).json(new ApiResponse(200, communityPost, "Comment updated successfully"));
  });
  
  /*-------------------
  @desc     Delete a comment
  @route    DELETE /api/v1/communities/:postId/comments/:commentId
  @access   Private
  */
  const deleteComment = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const postId = req.params.postId;
    const commentId = req.params.commentId;
  
    const communityPost = await CommunityPost.findById(postId);
  
    if (!communityPost) {
      throw new ApiError(404, "Community post not found");
    }
  
    const comment = communityPost.comments.id(commentId);
  
    if (!comment) {
      throw new ApiError(404, "Comment not found");
    }
  
    if (comment.author.toString() !== userId.toString()) {
      throw new ApiError(403, "You are not authorized to delete this comment");
    }
  
    comment.remove();
    await communityPost.save();
  
    res.status(200).json(new ApiResponse(200, communityPost, "Comment deleted successfully"));
  });

  export const commentController = {
    addComment,
    getAllComments,
    updateComment,
    deleteComment
  };
  