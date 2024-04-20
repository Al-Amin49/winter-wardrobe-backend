import express from 'express';
import { communiPostController } from '../controllers/communityPost.controller.js';
import { protect } from '../middlewares/auth.middleware.js';
import { commentController } from '../controllers/comment.controller.js';

const router=express.Router();

router.route('/').post(protect, communiPostController.addCommunityPost);
router.route('/').get(communiPostController.getAllCommunityPost);

//comments routes

// Route for adding a comment to a community post
router.post('/:postId/comments', protect,  commentController.addComment);

// Route for getting all comments of a community post
router.get('/:postId/comments', commentController.getAllComments);

// Route for updating a comment
router.put('/:postId/comments/:commentId', protect,commentController.updateComment);

// Route for deleting a comment
router.delete('/:postId/comments/:commentId', protect, commentController.deleteComment);

export default router;