import { Router } from "express";
import { protect, restrictTo } from "../controllers/authController.js";
import { createReview, getAllReviews } from "../controllers/reviewController.js";

const router = Router()

router
    .route('/')
    .get(protect, getAllReviews)
    .post(protect, restrictTo('user'), createReview)

export default router;