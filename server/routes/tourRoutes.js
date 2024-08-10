import { Router } from 'express';
import { aliasTopTours, getAllTours, getTourStats, getMonthlyPlan, createTour, getTour, updateTour, deleteTour } from '../controllers/tourController.js';
import { protect, restrictTo } from '../controllers/authController.js';

const tourRouter = Router();

// router.param('id', tourController.checkID);

// Create a checkBody middleware

//Check if body contains the name and price property
//If not send back 400 (bad request)

// Add it to the post handler stack

tourRouter
    .route('/top-5-cheap')
    .get(aliasTopTours, getAllTours);

tourRouter
    .route('/tour-stats')
    .get(getTourStats);

tourRouter
    .route('/monthly-plan/:year')
    .get(getMonthlyPlan);

tourRouter
    .route('/')
    .get(protect, getAllTours)
    .post(createTour);

tourRouter
    .route('/:id')
    .get(getTour)
    .patch(updateTour)
    .delete(
        protect, 
        restrictTo('admin', 'lead-guide'),
        deleteTour
    );

export default tourRouter;