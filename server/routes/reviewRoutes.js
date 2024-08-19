import { Router } from "express";
import { protect, restrictTo } from "../controllers/authController.js";
import { createReview, deleteReview, getAllReviews, getReview, setTourUserIds, updateReview } from "../controllers/reviewController.js";

const router = Router({ mergeParams: true });

router
    .route('/')
    .get(protect, getAllReviews)
    .post(
        protect, restrictTo('user'), setTourUserIds,
        createReview)

router
    .route('/:id')
    .get(getReview)
    .patch(updateReview)
    .delete(deleteReview);

export default router;