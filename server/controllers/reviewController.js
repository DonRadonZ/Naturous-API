import APIFeatures from "../utils/apiFeatures.js";
import catchAsync from "../utils/catchAsync.js";
import Review from './../models/reviewModel.js';

export const getAllReviews = catchAsync(async (req, res, next) => {

    console.log(req.query);

    // EXECUTE QUERY
    const features = new APIFeatures(Review.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
    const review = await features.query;

    

// SEND RESPONSE
res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
        review
    }
});  
});

export const createReview = catchAsync(async (req, res, next) => {
    const newReview = await Review.create(req.body);

    

    res.status(201).json({
        status: 'success',
        data: {
            review: newReview
        }
    });
});