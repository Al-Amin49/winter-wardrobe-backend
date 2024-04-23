
import express from 'express'
import { volunteerControllers } from '../controllers/volunteer.controller.js';
// import { protect } from '../middlewares/auth.middleware.js';
const router=express.Router();


router.route('/')
.post( volunteerControllers.addVolunteer)
.get(volunteerControllers.getAllVolunteers)

export default router;
