// import APIFeatures from "../utils/apiFeatures.js";
// import catchAsync from "../utils/catchAsync.js";
import Review from './../models/reviewModel.js';
import { createOne, deleteOne, getAll, getOne, updateOne } from "./handlerFactory.js";

export const setTourUserIds = (req, res, next) => {
    if(!req.body.tour) req.body.tour = req.params.tourId;
    if(!req.body.user) req.body.user = req.user.id;
    next();
}

export const getAllReviews = getAll(Review);

export const getReview = getOne(Review);

export const createReview = createOne(Review);

export function updateReview() {
    updateOne(Review)
}

export function deleteReview() {
    deleteOne(Review)
}