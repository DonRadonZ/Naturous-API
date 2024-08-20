import { Router } from 'express';
import { aliasTopTours, getAllTours, getTourStats, getMonthlyPlan, createTour, getTour, updateTour, deleteTour } from '../controllers/tourController.js';
import { protect, restrictTo } from '../controllers/authController.js';
import reviewRouter from './reviewRoutes.js';


const router = Router();

// router.param('id', tourController.checkID);

// Create a checkBody middleware

//Check if body contains the name and price property
//If not send back 400 (bad request)

// Add it to the post handler stack

router.use(':/tourId/reviews', reviewRouter);

router
    .route('/top-5-cheap')
    .get(aliasTopTours, getAllTours);

router
    .route('/tour-stats')
    .get(getTourStats);

router
    .route('/monthly-plan/:year')
    .get(protect, 
        restrictTo('admin', 'lead-guide', 'guide'),getMonthlyPlan);

router
    .route('/')
    .get(getAllTours)
    .post(protect,restrictTo('admin', 'lead guide'),createTour);

router
    .route('/:id')
    .get(getTour)
    .patch(protect, 
        restrictTo('admin', 'lead-guide'),updateTour)
    .delete(
        protect, 
        restrictTo('admin', 'lead-guide'),
        deleteTour
    );

// POST /tour/234fad4/reviews
// GET /tour/234fad4/reviews
// GET /tour/234fad4/reviews/94887fda

// router.
//     route('/:tourId/reviews')
//     .post(
//         protect,
//         restrictTo('users'), 
//         createReview
//     );

export default router;