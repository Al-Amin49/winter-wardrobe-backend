import { getAllTestimonials, postTestimonial } from "../controllers/testimonial.controller.js";
import express from 'express';

const router=express.Router();

router.route('/').post(postTestimonial);
router.route('/').get(getAllTestimonials);

export default router;