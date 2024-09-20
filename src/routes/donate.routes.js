import express from "express";
import { protect } from "../middlewares/auth.middleware.js";
import { donateControllers } from "../controllers/donate.controllers.js";
const router = express.Router();

router.route("/").post(protect, donateControllers.addDonate);
router.route("/user/:email").get(protect, donateControllers.getUserDonationsByEmail);
router.route("/recent").get(donateControllers.getRecentDonations);
router.route("/").get(donateControllers.getAllDonations);
router.route("/category").get(donateControllers.getDonationsByCategory);
router.route("/leaderboard").get(donateControllers.getWhoMostDonate);



export default router;
