import express from 'express'
import { protect } from '../middlewares/auth.middleware.js';
import { clothesControllers } from '../controllers/clothes.controller.js';

const router=express.Router();

//public routes
router.route('/').get( clothesControllers.getAllClothes)
router.route('/:id').get( clothesControllers.getSingleClothe)

//secured routes
router.route('/').post(protect, clothesControllers.createClothe)
router.route('/:id').put(protect, clothesControllers.updateClothe)
router.route('/:id').delete(protect, clothesControllers.deleteClothe)

export default router;