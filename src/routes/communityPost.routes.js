import express from 'express';
import { communiPostController } from '../controllers/communityPost.controller.js';

const router=express.Router();

router.route('/').post(communiPostController.addCommunityPost);
router.route('/').get(communiPostController.getAllCommunityPost);

export default router;