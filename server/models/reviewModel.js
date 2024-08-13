import mongoose, { Schema } from "mongoose";
import User from "./userModel.js";
import Tour from "./tourModel.js";

const reviewSchema = new Schema({
    review: {
        type: String,
        required: [true, "A review must not be empty!"],
    },
    rating: {
        type: Number,
        required: [true, "A rating must not be empty"],
        min: 1,
        max: 5
    },
    user: [
        {
            type: Schema.ObjectId,
            ref: User,
            required: [true, 'Review must belong to a user.']
        }
    ],
    tour: [
        {
            type: Schema.ObjectId,
            ref: Tour,
            required: [true, 'Review must belong to a tour.']
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

const Review = mongoose.model('Review', reviewSchema);

export default Review;