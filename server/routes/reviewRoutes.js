import { Router } from "express";
import { isLoggedInt, restrictTo } from "../controllers/authController.js";
import { createReview, deleteReview, getAllReviews, getReview, setTourUserIds, updateReview } from "../controllers/reviewController.js";

const router = Router({ mergeParams: true });

router.use(isLoggedIn);

router
    .route('/')
    .get(getAllReviews)
    .post(
        restrictTo('user'), setTourUserIds,
        createReview)

router
    .route('/:id')
    .get(getReview)
    .patch(restrictTo('user','admin'),updateReview)
    .delete(restrictTo('user', 'admin'), deleteReview);

export default router;