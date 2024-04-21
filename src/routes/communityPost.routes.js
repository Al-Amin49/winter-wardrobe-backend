import express from 'express';
import { communiPostController } from '../controllers/communityPost.controller.js';
import { protect } from '../middlewares/auth.middleware.js';
import { commentController } from '../controllers/comment.controller.js';
import { likeController } from '../controllers/likes.controller.js';

const router=express.Router();

router.route('/').post(protect, communiPostController.addCommunityPost);
router.route('/').get(communiPostController.getAllCommunityPost);
router.route('/:id').get(communiPostController.getSinglePost);

//comments routes

//comment to a community post
router.post('/:postId/comments', protect,  commentController.addComment);
//  getting all comments of a community post
router.get('/:postId/comments', commentController.getAllComments);
//  updating a comment
router.put('/:postId/comments/:commentId', protect,commentController.updateComment);
//  deleting a comment
router.delete('/:postId/comments/:commentId', protect, commentController.deleteComment);

//likes routes
//toggle like
router.post('/:postId/like', protect, likeController.toggleLike)
//get all likes
router.get('/:postId/likes', likeController.getAllLikes)
export default router;